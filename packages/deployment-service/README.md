# Deployment Service

> Deployment service for troy project

## Docker 

In order to run SQS queues and send messages to the queues you'll require an SQS server which can be emulated using docker. We've added a docker-compose configuration file to make this easier. Use the command below to start the emulator.

```bash
$ docker-compose up -d
```
> Make sure you have both docker and docker-compose installed on your machine. [Install here](https://docs.docker.com/get-docker/)

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
