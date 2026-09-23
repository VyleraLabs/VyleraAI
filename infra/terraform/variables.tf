variable "project_id" {
  description = "GCP project that hosts the production Vylera website."
  type        = string
  default     = "vylerawebsite"
}

variable "project_number" {
  description = "Numeric GCP project number."
  type        = string
  default     = "1090620380043"
}

variable "region" {
  description = "Region for Cloud Run and Artifact Registry. Singapore is asia-southeast1."
  type        = string
  default     = "asia-southeast1"
}

variable "service_name" {
  description = "Existing Cloud Run service name."
  type        = string
  default     = "vyleralwebsite"
}

variable "artifact_repository_id" {
  description = "Existing Artifact Registry Docker repository name."
  type        = string
  default     = "cloud-run-source-deploy"
}

variable "image_name" {
  description = "Image path inside the Artifact Registry repository."
  type        = string
  default     = "vyleraai/vyleralwebsite"
}

variable "github_owner" {
  description = "GitHub organization or user that owns the repository."
  type        = string
  default     = "VyleraLabs"
}

variable "github_repo" {
  description = "GitHub repository name."
  type        = string
  default     = "VyleraAI"
}

variable "github_branch" {
  description = "Branch allowed to deploy via Workload Identity Federation."
  type        = string
  default     = "main"
}

variable "initial_image" {
  description = "Currently deployed container image. GitHub Actions updates the image after Terraform import."
  type        = string
  default     = "asia-southeast1-docker.pkg.dev/vylerawebsite/cloud-run-source-deploy/vyleraai/vyleralwebsite:772cf79588cb25f7bc0c24708e3b72e8a6561bc5"
}

variable "runtime_service_account_email" {
  description = "Service account used by the existing Cloud Run service."
  type        = string
  default     = "1090620380043-compute@developer.gserviceaccount.com"
}

variable "domain_name" {
  description = "Cloud Run domain mapping name."
  type        = string
  default     = "vyleralabs.com"
}

variable "public_env" {
  description = "Non-secret environment variables set on Cloud Run."
  type        = map(string)
  default     = {}
}

variable "secret_env" {
  description = "Cloud Run environment variables sourced from Secret Manager. Map env var name to an existing Secret Manager secret id."
  type        = map(string)
  default     = {}
}

variable "cloud_run_max_instances" {
  description = "Maximum Cloud Run instances. Matches the currently deployed Singapore service."
  type        = number
  default     = 100
}

variable "cloud_run_container_concurrency" {
  description = "Cloud Run container concurrency."
  type        = number
  default     = 80
}

variable "cloud_run_timeout_seconds" {
  description = "Cloud Run request timeout."
  type        = number
  default     = 300
}

variable "cloud_run_cpu" {
  description = "Cloud Run CPU limit."
  type        = string
  default     = "1000m"
}

variable "cloud_run_memory" {
  description = "Cloud Run memory limit."
  type        = string
  default     = "512Mi"
}

variable "container_port" {
  description = "Cloud Run container port. Cloud Run injects PORT with this value."
  type        = number
  default     = 8080
}

variable "disable_legacy_cloud_build_trigger" {
  description = "Set true after GitHub Actions deployment is working to prevent duplicate deploys from the existing Cloud Build trigger."
  type        = bool
  default     = true
}
