import { MigrationInterface, QueryRunner } from "typeorm";

export class githubRepository1697724348051 implements MigrationInterface {
    name = 'githubRepository1697724348051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`github_repositories\` (\`id\` varchar(36) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modified\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`repositoryUrl\` varchar(255) NOT NULL, \`installationId\` varchar(20) NULL, \`repositoryId\` varchar(20) NULL, \`pipelinesId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`pipelines\` DROP COLUMN \`repository\``);
        await queryRunner.query(`ALTER TABLE \`pipelines\` DROP COLUMN \`installationId\``);
        await queryRunner.query(`ALTER TABLE \`pipelines\` DROP COLUMN \`repositoryId\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`nsleft\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP COLUMN \`nsright\``);
        await queryRunner.query(`ALTER TABLE \`pipelines\` DROP FOREIGN KEY \`FK_5ba6f68b5001d56cd305e5923b4\``);
        await queryRunner.query(`ALTER TABLE \`pipelines\` DROP COLUMN \`bitbucketClientId\``);
        await queryRunner.query(`ALTER TABLE \`pipelines\` ADD \`bitbucketClientId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pipelines\` DROP COLUMN \`appId\``);
        await queryRunner.query(`ALTER TABLE \`pipelines\` ADD \`appId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`buildStatus\` \`buildStatus\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` DROP COLUMN \`s3BuildLogsLocation\``);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` ADD \`s3BuildLogsLocation\` varchar(400) NULL`);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` ADD \`type\` varchar(255) NOT NULL DEFAULT 'BUILD'`);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` DROP COLUMN \`buildVersion\``);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` ADD \`buildVersion\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` CHANGE \`currentlyDeployed\` \`currentlyDeployed\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`github_repositories\` ADD CONSTRAINT \`FK_2ed12ea5a3be0e8f26cb1827073\` FOREIGN KEY (\`pipelinesId\`) REFERENCES \`pipelines\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pipelines\` ADD CONSTRAINT \`FK_5ba6f68b5001d56cd305e5923b4\` FOREIGN KEY (\`bitbucketClientId\`) REFERENCES \`bitbucket_clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pipelines\` DROP FOREIGN KEY \`FK_5ba6f68b5001d56cd305e5923b4\``);
        await queryRunner.query(`ALTER TABLE \`github_repositories\` DROP FOREIGN KEY \`FK_2ed12ea5a3be0e8f26cb1827073\``);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` CHANGE \`currentlyDeployed\` \`currentlyDeployed\` tinyint(1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` DROP COLUMN \`buildVersion\``);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` ADD \`buildVersion\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` ADD \`type\` varchar(36) NOT NULL DEFAULT 'BUILD'`);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` DROP COLUMN \`s3BuildLogsLocation\``);
        await queryRunner.query(`ALTER TABLE \`pipeline_runners\` ADD \`s3BuildLogsLocation\` varchar(2000) NULL`);
        await queryRunner.query(`ALTER TABLE \`tasks\` CHANGE \`buildStatus\` \`buildStatus\` varchar(255) NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE \`pipelines\` DROP COLUMN \`appId\``);
        await queryRunner.query(`ALTER TABLE \`pipelines\` ADD \`appId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`pipelines\` DROP COLUMN \`bitbucketClientId\``);
        await queryRunner.query(`ALTER TABLE \`pipelines\` ADD \`bitbucketClientId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`pipelines\` ADD CONSTRAINT \`FK_5ba6f68b5001d56cd305e5923b4\` FOREIGN KEY (\`bitbucketClientId\`) REFERENCES \`bitbucket_clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`nsright\` int NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD \`nsleft\` int NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`pipelines\` ADD \`repositoryId\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`pipelines\` ADD \`installationId\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`pipelines\` ADD \`repository\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`github_repositories\``);
    }

}
