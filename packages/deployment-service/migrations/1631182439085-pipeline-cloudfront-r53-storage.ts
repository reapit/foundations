import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelineCloudfrontR53Storage1631182439085 implements MigrationInterface {
  name = 'pipelineCloudfrontR53Storage1631182439085'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` ADD `cloudFrontId` varchar(255) NOT NULL')
    await queryRunner.query('ALTER TABLE `pipelines` ADD `aRecordId` varchar(255) NOT NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `aRecordId`')
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `cloudFrontId`')
  }
}
