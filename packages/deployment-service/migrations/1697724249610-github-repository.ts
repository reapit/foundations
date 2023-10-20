import { MigrationInterface, QueryRunner } from "typeorm";

export class githubRepository1697724249610 implements MigrationInterface {
    name = 'githubRepository1697724249610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` varchar(36) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`functionName\` varchar(255) NOT NULL, \`buildStatus\` varchar(255) NOT NULL, \`startTime\` timestamp NULL, \`endTime\` timestamp NULL, \`elapsedTime\` varchar(255) NULL, \`pipelineRunnerId\` varchar(36) NULL, \`parentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pipeline_runners\` (\`id\` varchar(36) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`buildStatus\` varchar(255) NOT NULL DEFAULT 'QUEUED', \`S3Location\` varchar(255) NULL, \`codebuildId\` varchar(255) NULL, \`s3BuildLogsLocation\` varchar(400) NULL, \`type\` varchar(255) NOT NULL DEFAULT 'BUILD', \`buildVersion\` varchar(255) NULL, \`currentlyDeployed\` tinyint NOT NULL DEFAULT 0, \`pipelineId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bitbucket_clients\` (\`id\` varchar(36) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`clientKey\` varchar(255) NOT NULL, \`data\` json NOT NULL, UNIQUE INDEX \`IDX_8f3f8dd3800f41bda96d50bb41\` (\`clientKey\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pipelines\` (\`id\` varchar(36) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`appType\` varchar(255) NOT NULL DEFAULT 'react', \`buildCommand\` varchar(255) NOT NULL, \`packageManager\` varchar(255) NOT NULL DEFAULT 'npm', \`bitbucketClientId\` varchar(255) NOT NULL, \`developerId\` varchar(255) NOT NULL, \`outDir\` varchar(255) NOT NULL, \`clientId\` varchar(255) NOT NULL, \`buildStatus\` varchar(255) NOT NULL, \`subDomain\` varchar(255) NULL, \`cloudFrontId\` varchar(255) NULL, \`aRecordId\` varchar(255) NULL, \`appId\` varchar(255) NOT NULL, \`branch\` varchar(255) NOT NULL DEFAULT 'master', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`github_repositories\` (\`id\` varchar(36) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`repositoryUrl\` varchar(255) NOT NULL, \`installationId\` varchar(20) NULL, \`repositoryId\` varchar(20) NULL, \`pipelinesId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_9b10ebed8ab326443a9809e8b94\` FOREIGN KEY (\`pipelineRunnerId\`) REFERENCES \`pipeline_runners\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_1cbec65196d4cf86dd8ab464085\` FOREIGN KEY (\`parentId\`) REFERENCES \`tasks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` ADD CONSTRAINT \`FK_1cebece12e6a382133a74cf0967\` FOREIGN KEY (\`pipelineId\`) REFERENCES \`pipelines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pipelines\` ADD CONSTRAINT \`FK_5ba6f68b5001d56cd305e5923b4\` FOREIGN KEY (\`bitbucketClientId\`) REFERENCES \`bitbucket_clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`github_repositories\` ADD CONSTRAINT \`FK_2ed12ea5a3be0e8f26cb1827073\` FOREIGN KEY (\`pipelinesId\`) REFERENCES \`pipelines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`github_repositories\` DROP FOREIGN KEY \`FK_2ed12ea5a3be0e8f26cb1827073\``);
        await queryRunner.query(`ALTER TABLE \`pipelines\` DROP FOREIGN KEY \`FK_5ba6f68b5001d56cd305e5923b4\``);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` DROP FOREIGN KEY \`FK_1cebece12e6a382133a74cf0967\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_1cbec65196d4cf86dd8ab464085\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_9b10ebed8ab326443a9809e8b94\``);
        await queryRunner.query(`DROP TABLE \`github_repositories\``);
        await queryRunner.query(`DROP TABLE \`pipelines\``);
        await queryRunner.query(`DROP INDEX \`IDX_8f3f8dd3800f41bda96d50bb41\` ON \`bitbucket_clients\``);
        await queryRunner.query(`DROP TABLE \`bitbucket_clients\``);
        await queryRunner.query(`DROP TABLE \`pipeline_runners\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
    }

}
