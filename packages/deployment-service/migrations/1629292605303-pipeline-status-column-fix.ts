import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelineStatusColumnFix1629292605303 implements MigrationInterface {
  name = 'pipelineStatusColumnFix1629292605303'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` CHANGE `status` `buildStatus` varchar(255) NOT NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` CHANGE `buildStatus` `status` varchar(255) NOT NULL')
  }
}
