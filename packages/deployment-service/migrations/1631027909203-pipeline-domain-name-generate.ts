import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelineDomainNameGenerate1631027909203 implements MigrationInterface {
  name = 'pipelineDomainNameGenerate1631027909203'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` ADD `subDomain` varchar(255) NOT NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `subDomain`')
  }
}
