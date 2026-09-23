variable "project_id" {
  description = "GCP project that hosts this website environment."
  type        = string
}

variable "project_number" {
  description = "Numeric GCP project number."
  type        = string
}

variable "region" {
  description = "Region for Cloud Run and Artifact Registry."
  type        = string
}

variable "service_name" {
  description = "Cloud Run service name."
  type        = string
}

variable "artifact_repository_id" {
  description = "Artifact Registry Docker repository name."
  type        = string
}

variable "image_name" {
  description = "Image path inside the Artifact Registry repository."
  type        = string
}

variable "github_owner" {
  description = "GitHub organization or user that owns the repository."
  type        = string
}

variable "github_repo" {
  description = "GitHub repository name."
  type        = string
}

variable "github_branch" {
  description = "Branch allowed to deploy via Workload Identity Federation."
  type        = string
}

variable "github_deployer_account_id" {
  description = "Service account ID for GitHub Actions deployments. Must be 30 characters or fewer."
  type        = string
}

variable "initial_image" {
  description = "Container image used when Terraform creates or imports the Cloud Run service."
  type        = string
}

variable "runtime_service_account_email" {
  description = "Service account used by the Cloud Run service at runtime."
  type        = string
}

variable "domain_name" {
  description = "Cloud Run domain mapping name. Use null to skip domain mapping."
  type        = string
  default     = null
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

variable "cloud_run_min_instances" {
  description = "Minimum Cloud Run instances. Set 0 for scale-to-zero environments."
  type        = number
  default     = null
}

variable "cloud_run_max_instances" {
  description = "Maximum Cloud Run instances."
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

variable "legacy_cloud_build_trigger" {
  description = "Optional existing Cloud Build trigger to keep managed, usually disabled after GitHub Actions takes over."
  type = object({
    id          = string
    name        = string
    description = string
    disabled    = bool
    repo_name   = string
  })
  default = null
}
