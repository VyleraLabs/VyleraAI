resource "google_cloud_run_service" "this" {
  project  = var.project_id
  name     = var.service_name
  location = var.region

  metadata {
    annotations = {
      "run.googleapis.com/ingress"              = "all"
      "run.googleapis.com/invoker-iam-disabled" = "true"
    }
  }

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"     = tostring(var.max_instances)
        "run.googleapis.com/startup-cpu-boost" = "true"
      }
    }

    spec {
      container_concurrency = var.container_concurrency
      service_account_name  = var.runtime_service_account_email
      timeout_seconds       = var.timeout_seconds

      containers {
        image = var.image

        ports {
          name           = "http1"
          container_port = var.container_port
        }

        resources {
          limits = {
            cpu    = var.cpu
            memory = var.memory
          }
        }

        dynamic "env" {
          for_each = var.public_env
          content {
            name  = env.key
            value = env.value
          }
        }

        dynamic "env" {
          for_each = var.secret_env
          content {
            name = env.key
            value_from {
              secret_key_ref {
                name = env.value
                key  = "latest"
              }
            }
          }
        }
      }
    }
  }

  traffic {
    latest_revision = true
    percent         = 100
  }

  lifecycle {
    ignore_changes = [
      metadata[0].annotations["run.googleapis.com/client-name"],
      metadata[0].annotations["run.googleapis.com/client-version"],
      metadata[0].annotations["run.googleapis.com/operation-id"],
      metadata[0].annotations["run.googleapis.com/urls"],
      metadata[0].labels,
      template[0].metadata[0].annotations["run.googleapis.com/client-name"],
      template[0].metadata[0].annotations["run.googleapis.com/client-version"],
      template[0].metadata[0].annotations["run.googleapis.com/startupProbeType"],
      template[0].metadata[0].labels,
      template[0].spec[0].containers[0].image
    ]
  }
}

resource "google_cloud_run_domain_mapping" "this" {
  count = var.domain_name == null ? 0 : 1

  project  = var.project_id
  location = var.region
  name     = var.domain_name

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_service.this.name
  }

  lifecycle {
    ignore_changes = [
      metadata[0].annotations,
      metadata[0].labels,
      spec[0].certificate_mode,
      spec[0].force_override
    ]
  }
}
