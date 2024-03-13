import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelineBranch1645524699376 implements MigrationInterface {
  name = 'pipelineBranch1645524699376'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `pipelines` ADD `branch` varchar(255) NOT NULL DEFAULT 'master'")
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `branch`')
  }
}
