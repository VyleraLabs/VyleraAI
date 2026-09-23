variable "project_id" {
  type = string
}

variable "region" {
  type = string
}

variable "service_name" {
  type = string
}

variable "image" {
  type = string
}

variable "runtime_service_account_email" {
  type = string
}

variable "public_env" {
  type    = map(string)
  default = {}
}

variable "secret_env" {
  description = "Map of environment variable name to Secret Manager secret id."
  type        = map(string)
  default     = {}
}

variable "max_instances" {
  type    = number
  default = 100
}

variable "min_instances" {
  type    = number
  default = null
}

variable "container_concurrency" {
  type    = number
  default = 80
}

variable "timeout_seconds" {
  type    = number
  default = 300
}

variable "cpu" {
  type    = string
  default = "1000m"
}

variable "memory" {
  type    = string
  default = "512Mi"
}

variable "container_port" {
  type    = number
  default = 8080
}

variable "domain_name" {
  type    = string
  default = null
}
