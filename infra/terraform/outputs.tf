output "artifact_registry_repository" {
  description = "Artifact Registry repository URL prefix for Docker images."
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.web.repository_id}"
}

output "image_repository" {
  description = "Full Docker image repository path without tag."
  value       = local.image_repository
}

output "cloud_run_service_name" {
  description = "Cloud Run service name."
  value       = module.cloud_run.service_name
}

output "cloud_run_service_url" {
  description = "Cloud Run service URL."
  value       = module.cloud_run.service_url
}

output "github_deployer_service_account" {
  description = "Service account impersonated by GitHub Actions."
  value       = google_service_account.github_deployer.email
}

output "workload_identity_provider" {
  description = "Workload Identity Provider resource name for GitHub Actions."
  value       = google_iam_workload_identity_pool_provider.github.name
}
