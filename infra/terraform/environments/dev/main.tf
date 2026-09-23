locals {
  project_id     = "vyleralabswebdev"
  project_number = "890448317447"
  region         = "asia-southeast1"
}

resource "google_service_account" "runtime" {
  project      = local.project_id
  account_id   = "vyleraweb-dev-runtime"
  display_name = "Vylera dev Cloud Run runtime"
}

module "website" {
  source = "../../modules/website-environment"

  project_id                    = local.project_id
  project_number                = local.project_number
  region                        = local.region
  service_name                  = "vyleralwebsite-dev"
  artifact_repository_id        = "cloud-run-source-deploy"
  image_name                    = "vyleraai/vyleralwebsite-dev"
  github_owner                  = "VyleraLabs"
  github_repo                   = "VyleraAI"
  github_branch                 = "develop"
  github_deployer_account_id    = "github-vyleraweb-dev"
  initial_image                 = "us-docker.pkg.dev/cloudrun/container/hello"
  runtime_service_account_email = google_service_account.runtime.email
  domain_name                   = "dev.vyleralabs.com"

  cloud_run_min_instances         = 0
  cloud_run_max_instances         = 5
  cloud_run_container_concurrency = 80
  cloud_run_timeout_seconds       = 300
  cloud_run_cpu                   = "1000m"
  cloud_run_memory                = "512Mi"
  container_port                  = 8080
}
