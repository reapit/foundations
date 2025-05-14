import { MigrationInterface, QueryRunner } from 'typeorm'

export class DnsTriggerEmailField1747039574276 implements MigrationInterface {
  name = 'DnsTriggerEmailField1747039574276'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` ADD `dnsTrigger` varchar(255) NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `dnsTrigger`')
  }
}
