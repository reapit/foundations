import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelines1625758770110 implements MigrationInterface {
  name = 'pipelines1625758770110'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `pipeline_runners` (`id` varchar(36) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `buildStatus` enum ('failed', 'success', 'canceled', 'pending', 'running') NOT NULL DEFAULT 'pending', `S3Location` varchar(255) NULL, `pipelineId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    )
    await queryRunner.query(
      "CREATE TABLE `pipelines` (`id` varchar(36) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `appType` varchar(255) NOT NULL DEFAULT 'react', `buildCommand` varchar(255) NOT NULL, `packageManager` varchar(255) NOT NULL DEFAULT 'npm', `repository` varchar(255) NOT NULL, `developerId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    )
    await queryRunner.query(
      "CREATE TABLE `tasks` (`id` varchar(36) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `functionName` varchar(255) NOT NULL, `status` varchar(255) NOT NULL DEFAULT 'pending', `nsleft` int NOT NULL DEFAULT 1, `nsright` int NOT NULL DEFAULT 2, `pipelineRunnerId` varchar(36) NULL, `parentId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    )
    await queryRunner.query(
      'ALTER TABLE `pipeline_runners` ADD CONSTRAINT `FK_1cebece12e6a382133a74cf0967` FOREIGN KEY (`pipelineId`) REFERENCES `pipelines`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE `tasks` ADD CONSTRAINT `FK_9b10ebed8ab326443a9809e8b94` FOREIGN KEY (`pipelineRunnerId`) REFERENCES `pipeline_runners`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
    await queryRunner.query(
      'ALTER TABLE `tasks` ADD CONSTRAINT `FK_1cbec65196d4cf86dd8ab464085` FOREIGN KEY (`parentId`) REFERENCES `tasks`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `tasks` DROP FOREIGN KEY `FK_1cbec65196d4cf86dd8ab464085`')
    await queryRunner.query('ALTER TABLE `tasks` DROP FOREIGN KEY `FK_9b10ebed8ab326443a9809e8b94`')
    await queryRunner.query('ALTER TABLE `pipeline_runners` DROP FOREIGN KEY `FK_1cebece12e6a382133a74cf0967`')
    await queryRunner.query('DROP TABLE `tasks`')
    await queryRunner.query('DROP TABLE `pipelines`')
    await queryRunner.query('DROP TABLE `pipeline_runners`')
  }
}
