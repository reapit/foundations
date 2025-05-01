import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDomainFields1729084248683 implements MigrationInterface {
  name = 'AddDomainFields1729084248683'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` ADD `customDomain` varchar(255) NULL')
    await queryRunner.query('ALTER TABLE `pipelines` ADD `certificateArn` varchar(255) NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `customDomain`')
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `certificateArn`')
  }
}
