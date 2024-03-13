import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelineClientCode1628762086314 implements MigrationInterface {
  name = 'pipelineClientCode1628762086314'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` ADD `outDir` varchar(255) NOT NULL')
    await queryRunner.query('ALTER TABLE `pipelines` ADD `clientId` varchar(255) NOT NULL')
    await queryRunner.query('ALTER TABLE `pipeline_runners` DROP COLUMN `buildStatus`')
    await queryRunner.query("ALTER TABLE `pipeline_runners` ADD `buildStatus` varchar(255) NOT NULL DEFAULT 'pending'")
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipeline_runners` DROP COLUMN `buildStatus`')
    await queryRunner.query(
      "ALTER TABLE `pipeline_runners` ADD `buildStatus` enum ('failed', 'success', 'canceled', 'pending', 'running') NOT NULL DEFAULT 'pending'",
    )
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `clientId`')
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `outDir`')
  }
}
