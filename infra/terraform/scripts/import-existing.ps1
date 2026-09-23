param(
    [string]$ProjectId = "vylerawebsite",
    [string]$Region = "asia-southeast1",
    [string]$ServiceName = "vyleralwebsite",
    [string]$RepositoryId = "cloud-run-source-deploy",
    [string]$DomainName = "vyleralabs.com",
    [string]$CloudBuildTriggerId = "83bf597c-484f-403d-9e9b-2438a37bd215"
)

$ErrorActionPreference = "Stop"

$Terraform = (Get-Command terraform -ErrorAction SilentlyContinue).Source
if (-not $Terraform) {
    $Terraform = Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Recurse -Filter terraform.exe -ErrorAction SilentlyContinue |
        Select-Object -First 1 -ExpandProperty FullName
}
if (-not $Terraform) {
    throw "Terraform CLI was not found. Install Terraform or restart the shell so terraform.exe is on PATH."
}

if (-not $env:GOOGLE_OAUTH_ACCESS_TOKEN) {
    $env:GOOGLE_OAUTH_ACCESS_TOKEN = (gcloud auth print-access-token).Trim()
}

function Invoke-Terraform {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments)

    & $Terraform @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "terraform $($Arguments -join ' ') failed with exit code $LASTEXITCODE"
    }
}

Push-Location "$PSScriptRoot\.."
try {
    Invoke-Terraform init

    $services = @(
        "artifactregistry.googleapis.com",
        "cloudbuild.googleapis.com",
        "cloudresourcemanager.googleapis.com",
        "iam.googleapis.com",
        "iamcredentials.googleapis.com",
        "run.googleapis.com",
        "secretmanager.googleapis.com",
        "sts.googleapis.com"
    )

    foreach ($service in $services) {
        Invoke-Terraform import `
            "google_project_service.required[`"$service`"]" `
            "$ProjectId/$service"
    }

    Invoke-Terraform import `
        "google_artifact_registry_repository.web" `
        "projects/$ProjectId/locations/$Region/repositories/$RepositoryId"

    Invoke-Terraform import `
        "module.cloud_run.google_cloud_run_service.this" `
        "locations/$Region/namespaces/$ProjectId/services/$ServiceName"

    Invoke-Terraform import `
        "module.cloud_run.google_cloud_run_domain_mapping.this[0]" `
        "locations/$Region/namespaces/$ProjectId/domainmappings/$DomainName"

    Invoke-Terraform import `
        "google_cloudbuild_trigger.legacy_cloud_run_deploy" `
        "projects/$ProjectId/locations/global/triggers/$CloudBuildTriggerId"

    Write-Host ""
    Write-Host "Import complete. Run: terraform plan"
}
finally {
    Pop-Location
}
