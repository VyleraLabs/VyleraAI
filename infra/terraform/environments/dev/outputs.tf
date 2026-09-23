output "artifact_registry_repository" {
  description = "Artifact Registry repository URL prefix for Docker images."
  value       = module.website.artifact_registry_repository
}

output "image_repository" {
  description = "Full Docker image repository path without tag."
  value       = module.website.image_repository
}

output "cloud_run_service_name" {
  description = "Cloud Run service name."
  value       = module.website.cloud_run_service_name
}

output "cloud_run_service_url" {
  description = "Cloud Run service URL."
  value       = module.website.cloud_run_service_url
}

output "github_deployer_service_account" {
  description = "Service account impersonated by GitHub Actions."
  value       = module.website.github_deployer_service_account
}

output "workload_identity_provider" {
  description = "Workload Identity Provider resource name for GitHub Actions."
  value       = module.website.workload_identity_provider
}
