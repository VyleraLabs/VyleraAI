param(
    [string]$ProjectId = "vylerawebsite",
    [string]$Region = "asia-southeast1",
    [string]$ServiceName = "vyleralwebsite"
)

$ErrorActionPreference = "Stop"

Write-Host "Cloud Run service:"
gcloud run services describe $ServiceName `
    --project=$ProjectId `
    --region=$Region `
    --platform=managed `
    --format=json

Write-Host ""
Write-Host "Artifact Registry repositories:"
gcloud artifacts repositories list `
    --project=$ProjectId `
    --location=$Region `
    --format=json

Write-Host ""
Write-Host "Cloud Build triggers:"
gcloud builds triggers list `
    --project=$ProjectId `
    --format=json

Write-Host ""
Write-Host "Cloud Run domain mappings via REST:"
$token = gcloud auth print-access-token
Invoke-RestMethod `
    -Headers @{ Authorization = "Bearer $token" } `
    -Uri "https://$Region-run.googleapis.com/apis/domains.cloudrun.com/v1/namespaces/$ProjectId/domainmappings" |
    ConvertTo-Json -Depth 20
