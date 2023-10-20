import { MigrationInterface, QueryRunner } from 'typeorm'

export class nullableFields1637076778182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` CHANGE `cloudFrontId` `cloudFrontId` varchar(255) NULL')
    await queryRunner.query('ALTER TABLE `pipelines` CHANGE `aRecordId` `aRecordId` varchar(255) NULL')
    await queryRunner.query('ALTER TABLE `pipelines` CHANGE `subDomain` `subDomain` varchar(255) NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` CHANGE `cloudFrontId` `cloudFrontId` varchar(255) NOT NULL')
    await queryRunner.query('ALTER TABLE `pipelines` CHANGE `aRecordId` `aRecordId` varchar(255) NOT NULL')
    await queryRunner.query('ALTER TABLE `pipelines` CHANGE `subDomain` `subDomain` varchar(255) NOT NULL')
  }
}
