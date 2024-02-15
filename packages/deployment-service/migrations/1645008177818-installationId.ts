import { MigrationInterface, QueryRunner } from 'typeorm'

export class installationId1645008177818 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` ADD `installationId` varchar(50) NULL')
    await queryRunner.query('ALTER TABLE `pipelines` ADD `repositoryId` varchar(50) NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `installationId`')
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `repositoryId`')
  }
}
