import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelineSignedUrlLength1630659208268 implements MigrationInterface {
  name = 'pipelineSignedUrlLength1630659208268'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipeline_runners` DROP COLUMN `s3BuildLogsLocation`')
    await queryRunner.query('ALTER TABLE `pipeline_runners` ADD `s3BuildLogsLocation` varchar(2000) NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipeline_runners` DROP COLUMN `s3BuildLogsLocation`')
    await queryRunner.query('ALTER TABLE `pipeline_runners` ADD `s3BuildLogsLocation` varchar(255) NULL')
  }
}
