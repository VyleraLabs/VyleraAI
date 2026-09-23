locals {
  github_repository = "${var.github_owner}/${var.github_repo}"
  github_ref        = "refs/heads/${var.github_branch}"
  image_repository  = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_repository_id}/${var.image_name}"

  required_services = toset([
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "run.googleapis.com",
    "secretmanager.googleapis.com",
    "sts.googleapis.com"
  ])
}

resource "google_project_service" "required" {
  for_each = local.required_services

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "web" {
  project       = var.project_id
  location      = var.region
  repository_id = var.artifact_repository_id
  description   = "Cloud Run Source Deployments"
  format        = "DOCKER"

  depends_on = [google_project_service.required]
}

resource "google_service_account" "github_deployer" {
  project      = var.project_id
  account_id   = "github-${var.service_name}-deploy"
  display_name = "GitHub Actions deployer for ${local.github_repository}"
}

resource "google_project_iam_member" "github_artifact_writer" {
  project = var.project_id
  role    = "roles/artifactregistry.writer"
  member  = "serviceAccount:${google_service_account.github_deployer.email}"
}

resource "google_project_iam_member" "github_run_developer" {
  project = var.project_id
  role    = "roles/run.developer"
  member  = "serviceAccount:${google_service_account.github_deployer.email}"
}

resource "google_service_account_iam_member" "github_can_act_as_runtime" {
  service_account_id = "projects/${var.project_id}/serviceAccounts/${var.runtime_service_account_email}"
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.github_deployer.email}"
}

resource "google_iam_workload_identity_pool" "github" {
  project                   = var.project_id
  workload_identity_pool_id = "github-actions"
  display_name              = "GitHub Actions"
  description               = "Federates GitHub Actions into Google Cloud."

  depends_on = [google_project_service.required]
}

resource "google_iam_workload_identity_pool_provider" "github" {
  project                            = var.project_id
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github"
  display_name                       = "GitHub"

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.repository" = "assertion.repository"
    "attribute.ref"        = "assertion.ref"
  }

  attribute_condition = "assertion.repository == '${local.github_repository}' && assertion.ref == '${local.github_ref}'"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account_iam_member" "github_wif_user" {
  service_account_id = google_service_account.github_deployer.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/${local.github_repository}"
}

module "cloud_run" {
  source = "./modules/cloud-run-service"

  project_id                    = var.project_id
  region                        = var.region
  service_name                  = var.service_name
  image                         = var.initial_image
  runtime_service_account_email = var.runtime_service_account_email
  public_env                    = var.public_env
  secret_env                    = var.secret_env
  max_instances                 = var.cloud_run_max_instances
  container_concurrency         = var.cloud_run_container_concurrency
  timeout_seconds               = var.cloud_run_timeout_seconds
  cpu                           = var.cloud_run_cpu
  memory                        = var.cloud_run_memory
  container_port                = var.container_port
  domain_name                   = var.domain_name

  depends_on = [google_project_service.required]
}

resource "google_cloudbuild_trigger" "legacy_cloud_run_deploy" {
  project     = var.project_id
  name        = "rmgpgab-vyleralwebsite-asia-southeast1-VyleraLabs-VyleraAI--mak"
  description = "Build and deploy to Cloud Run service vyleralwebsite on push to \"^main$\""
  disabled    = var.disable_legacy_cloud_build_trigger

  service_account = "projects/${var.project_id}/serviceAccounts/${var.project_number}-compute@developer.gserviceaccount.com"

  github {
    owner = var.github_owner
    name  = var.github_repo

    push {
      branch = "^${var.github_branch}$"
    }
  }

  include_build_logs = "INCLUDE_BUILD_LOGS_WITH_STATUS"
  tags               = ["gcp-cloud-build-deploy-cloud-run", "gcp-cloud-build-deploy-cloud-run-managed", var.service_name]

  substitutions = {
    REPO_NAME      = "vyleraai"
    _AR_HOSTNAME   = "${var.region}-docker.pkg.dev"
    _AR_PROJECT_ID = var.project_id
    _AR_REPOSITORY = var.artifact_repository_id
    _DEPLOY_REGION = var.region
    _PLATFORM      = "managed"
    _SERVICE_NAME  = var.service_name
    _TRIGGER_ID    = "83bf597c-484f-403d-9e9b-2438a37bd215"
  }

  build {
    images = ["$_AR_HOSTNAME/$_AR_PROJECT_ID/$_AR_REPOSITORY/$REPO_NAME/$_SERVICE_NAME:$COMMIT_SHA"]
    tags   = ["gcp-cloud-build-deploy-cloud-run", "gcp-cloud-build-deploy-cloud-run-managed", var.service_name]

    substitutions = {
      REPO_NAME      = "vyleraai"
      _AR_HOSTNAME   = "${var.region}-docker.pkg.dev"
      _AR_PROJECT_ID = var.project_id
      _AR_REPOSITORY = var.artifact_repository_id
      _DEPLOY_REGION = var.region
      _PLATFORM      = "managed"
      _SERVICE_NAME  = var.service_name
      _TRIGGER_ID    = "83bf597c-484f-403d-9e9b-2438a37bd215"
    }

    options {
      logging             = "CLOUD_LOGGING_ONLY"
      substitution_option = "ALLOW_LOOSE"
    }

    step {
      id   = "Build"
      name = "gcr.io/cloud-builders/docker"
      args = [
        "build",
        "--no-cache",
        "-t",
        "$_AR_HOSTNAME/$_AR_PROJECT_ID/$_AR_REPOSITORY/$REPO_NAME/$_SERVICE_NAME:$COMMIT_SHA",
        ".",
        "-f",
        "Dockerfile"
      ]
    }

    step {
      id   = "Push"
      name = "gcr.io/cloud-builders/docker"
      args = [
        "push",
        "$_AR_HOSTNAME/$_AR_PROJECT_ID/$_AR_REPOSITORY/$REPO_NAME/$_SERVICE_NAME:$COMMIT_SHA"
      ]
    }

    step {
      id         = "Deploy"
      name       = "gcr.io/google.com/cloudsdktool/cloud-sdk:slim"
      entrypoint = "gcloud"
      args = [
        "run",
        "services",
        "update",
        "$_SERVICE_NAME",
        "--platform=managed",
        "--image=$_AR_HOSTNAME/$_AR_PROJECT_ID/$_AR_REPOSITORY/$REPO_NAME/$_SERVICE_NAME:$COMMIT_SHA",
        "--labels=managed-by=gcp-cloud-build-deploy-cloud-run,commit-sha=$COMMIT_SHA,gcb-build-id=$BUILD_ID,gcb-trigger-id=$_TRIGGER_ID",
        "--region=$_DEPLOY_REGION",
        "--quiet"
      ]
    }
  }
}
