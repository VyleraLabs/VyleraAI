locals {
  project_id     = "vylerawebsite"
  project_number = "1090620380043"
  region         = "asia-southeast1"
}

module "website" {
  source = "../../modules/website-environment"

  project_id                    = local.project_id
  project_number                = local.project_number
  region                        = local.region
  service_name                  = "vyleralwebsite"
  artifact_repository_id        = "cloud-run-source-deploy"
  image_name                    = "vyleraai/vyleralwebsite"
  github_owner                  = "VyleraLabs"
  github_repo                   = "VyleraAI"
  github_branch                 = "main"
  github_deployer_account_id    = "github-vyleralwebsite-deploy"
  initial_image                 = "asia-southeast1-docker.pkg.dev/vylerawebsite/cloud-run-source-deploy/vyleraai/vyleralwebsite:772cf79588cb25f7bc0c24708e3b72e8a6561bc5"
  runtime_service_account_email = "${local.project_number}-compute@developer.gserviceaccount.com"
  domain_name                   = "vyleralabs.com"

  cloud_run_max_instances         = 100
  cloud_run_container_concurrency = 80
  cloud_run_timeout_seconds       = 300
  cloud_run_cpu                   = "1000m"
  cloud_run_memory                = "512Mi"
  container_port                  = 8080

  legacy_cloud_build_trigger = {
    id          = "83bf597c-484f-403d-9e9b-2438a37bd215"
    name        = "rmgpgab-vyleralwebsite-asia-southeast1-VyleraLabs-VyleraAI--mak"
    description = "Build and deploy to Cloud Run service vyleralwebsite on push to \"^main$\""
    disabled    = true
    repo_name   = "vyleraai"
  }
}
