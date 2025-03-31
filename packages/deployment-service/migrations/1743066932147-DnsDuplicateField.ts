import { MigrationInterface, QueryRunner } from 'typeorm'

export class DnsDuplicateField1743066932147 implements MigrationInterface {
  name = 'DnsDuplicateField1743066932147'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` ADD `certificateError` varchar(255) NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `certificateError`')
  }
}
