# Vylera Website Infrastructure

This Terraform configuration targets the currently live Google Cloud production website:

- Project: `vylerawebsite`
- Region: `asia-southeast1` (Singapore)
- Cloud Run service: `vyleralwebsite`
- Domain mapping: `vyleralabs.com`
- Artifact Registry repository: `cloud-run-source-deploy`
- Existing legacy Cloud Build trigger: `83bf597c-484f-403d-9e9b-2438a37bd215`

`vyleralabsweb` was checked, but it has no Cloud Run service for the website. The active custom domain mapping points to the `vylerawebsite` project.

## Import Existing Resources

From `infra/terraform`:

```powershell
Copy-Item terraform.tfvars.example terraform.tfvars
.\scripts\import-existing.ps1
terraform plan
```

The import script imports:

- Artifact Registry repository
- Cloud Run service
- Cloud Run domain mapping
- Existing Cloud Build trigger

Terraform also creates new Workload Identity Federation resources and a GitHub deployer service account for GitHub Actions.

The inspected production service currently has no explicit Cloud Run environment variables. If you want Terraform to manage values such as `NEXTAUTH_URL` or secret-backed runtime configuration, add them to `public_env` or `secret_env` in `terraform.tfvars`.

## GitHub Actions Setup

Run:

```powershell
terraform apply
```

The apply creates Workload Identity Federation and grants the GitHub deployer service account the permissions needed to push images and deploy Cloud Run.

If apply fails with IAM permission errors, the active Google account needs these permissions on `vylerawebsite`:

```text
resourcemanager.projects.setIamPolicy
iam.serviceAccounts.setIamPolicy
iam.workloadIdentityPools.create
iam.workloadIdentityPoolProviders.create
```

Practically, a project owner can either run `terraform apply`, or temporarily grant the operator roles that include those permissions, such as Project IAM Admin and Workload Identity Pool Admin.

After `terraform apply` succeeds, set these GitHub repository variables:

```text
GCP_WORKLOAD_IDENTITY_PROVIDER = output.workload_identity_provider
GCP_SERVICE_ACCOUNT            = output.github_deployer_service_account
```

Optional build-time Firebase public variables can also be set as repository variables:

```text
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

The workflow at `.github/workflows/deploy-cloud-run.yml` deploys every push to `main`.

## Legacy Cloud Build Trigger

There was already a Google-created Cloud Build trigger that deploys on pushes to `main`. Terraform keeps that imported trigger disabled so GitHub Actions is the single deployment path.

```hcl
disable_legacy_cloud_build_trigger = true
```

## Important Docker Note

`public/team` must be included in Docker builds so team photos are present in Cloud Run. The `.dockerignore` file has been updated accordingly.
