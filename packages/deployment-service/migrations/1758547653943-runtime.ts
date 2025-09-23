import { MigrationInterface, QueryRunner } from 'typeorm'

export class Runtime1758547653943 implements MigrationInterface {
  name = 'Runtime1758547653943'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `pipelines` ADD `runtime` varchar(255) NOT NULL DEFAULT 'NODE_16'")
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `runtime`')
  }
}
