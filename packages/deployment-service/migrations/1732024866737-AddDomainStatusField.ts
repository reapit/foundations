import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddDomainStatusField1732024866737 implements MigrationInterface {
  name = 'AddDomainStatusField1732024866737'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `pipelines` ADD `certificateStatus` varchar(255) NOT NULL DEFAULT "unverified"',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `certificateStatus`')
  }
}
