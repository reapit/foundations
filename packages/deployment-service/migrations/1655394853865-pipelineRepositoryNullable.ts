import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelineRepositoryNullable1655394853865 implements MigrationInterface {
  name = 'pipelineRepositoryNullable1655394853865'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` CHANGE `repository` `repository` varchar(255) NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` CHANGE `repository` `repository` varchar(255) NOT NULL')
  }
}
