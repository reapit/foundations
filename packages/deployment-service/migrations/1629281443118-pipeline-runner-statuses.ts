import {MigrationInterface, QueryRunner} from "typeorm";

export class pipelineRunnerStatuses1629281443118 implements MigrationInterface {
    name = 'pipelineRunnerStatuses1629281443118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pipeline_runners` ADD `codebuildId` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `pipelines` ADD `status` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `tasks` ADD `startTime` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `tasks` ADD `endTime` timestamp NULL");
        await queryRunner.query("ALTER TABLE `tasks` ADD `elapsedTime` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `pipeline_runners` CHANGE `buildStatus` `buildStatus` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pipeline_runners` CHANGE `buildStatus` `buildStatus` varchar(255) NOT NULL DEFAULT 'pending'");
        await queryRunner.query("ALTER TABLE `tasks` DROP COLUMN `elapsedTime`");
        await queryRunner.query("ALTER TABLE `tasks` DROP COLUMN `endTime`");
        await queryRunner.query("ALTER TABLE `tasks` DROP COLUMN `startTime`");
        await queryRunner.query("ALTER TABLE `pipelines` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `pipeline_runners` DROP COLUMN `codebuildId`");
    }

}
