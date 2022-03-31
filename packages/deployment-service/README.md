# Deployment Service

> Deployment service for troy (IaaS) project

## TypeORM

### Config

#### Cli

For the typeorm cli, you'll need to make sure you have the `ormconfig.json` file locally first.

> The cli is used for the migration scripts defined below

### Migrations

#### Run

This will run all the migrations and update the database schema.

```bash
$ yarn migration:run
```

#### Generate

The below command will create a new migration for changes made to the entities

```bash
$ yarn migration:generate -n MyNewMigration
```
> Don't forget to give a useful name for your migration!

## Workflows

### Build status workflow

Below is an example of build statuses and the general flow of one to another. 

![Build statuses flow](docs/images/build-statuses.jpg)

Build Status | Description
--- | ---
Pre Provisioned | A pipeline created without r53 or distro
Provision Request | A pipeline that has been queued for provisioning
Provisioning | Currently creating r53 and distro
Ready for Deployment | An undeployed pipeline, provisioned and ready for first deployment
Queued | A pipeline requested for deployment and is in a state of requested but not currently deploying
Deploying | The pipeline is currently in deploying 
Deployed | Successfully deployed to live
Failed to Deploy | Failed to deploy to live
Scheduled for Deletion | The pipeline has been requested for deletion but is not currently being deleted
Failed to Provision | Failed to create r53 or distro for pipeline
Deleting | Currently deleting the pipeline
Failed to Delete | Failed to delete the pipeline
Deleted | Pipeline has been deleted (only in events, pipeline is not soft deleted)

### Deployments

Below are diagrams of different deployment triggers and their processes.

#### Automated

With automated deployments, the codebase/source is obtained from the repository via the installed Repository App. Codebuild is utilised here to `Download Source`*, `Install`, `Build`, (`Test`), and `Archive` the built resources. After codebuild has successfully installed, built and archieved the resources. The process will deploy to a live S3 bucket and then refresh the distro.

![Automated flow](docs/images/automated-flow.jpg)

> Test is not yet available

> *`Download Source` is also utilised by codebuild where appropriate.

#### Releases

A Release deployment flow is much simpler to that of the automated flow. Rleases are trigger from the cli and requires a pre-built zip of the resources. Therefore download source and codebuild is mitigated here.

![Rlease flow](docs/images/release-flow.jpg)

## Event Handlers

### Codebuild Update Handler

Below is a diagram of the base conditions of the Codebuild Update Handler which is triggered from codebuild update triggers on SNS.

![Codebuild update handler](docs/images/codebuild-update-handler.jpg)



