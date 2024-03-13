import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelineSignedUrl1630509406008 implements MigrationInterface {
  name = 'pipelineSignedUrl1630509406008'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipeline_runners` ADD `s3BuildLogsLocation` varchar(255) NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipeline_runners` DROP COLUMN `s3BuildLogsLocation`')
  }
}
