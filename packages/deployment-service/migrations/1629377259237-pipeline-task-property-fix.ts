import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelineTaskPropertyFix1629377259237 implements MigrationInterface {
  name = 'pipelineTaskPropertyFix1629377259237'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `tasks` CHANGE `status` `buildStatus` varchar(255) NOT NULL DEFAULT 'pending'")
    await queryRunner.query(
      "ALTER TABLE `pipeline_runners` CHANGE `buildStatus` `buildStatus` varchar(255) NOT NULL DEFAULT 'QUEUED'",
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipeline_runners` CHANGE `buildStatus` `buildStatus` varchar(255) NOT NULL')
    await queryRunner.query("ALTER TABLE `tasks` CHANGE `buildStatus` `status` varchar(255) NOT NULL DEFAULT 'pending'")
  }
}
