import { MigrationInterface, QueryRunner } from 'typeorm'

export class pipelineBitbucketRelation1654693666828 implements MigrationInterface {
  name = 'pipelineBitbucketRelation1654693666828'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` ADD `bitbucketClientId` varchar(36) NULL')
    await queryRunner.query(
      'ALTER TABLE `pipelines` ADD CONSTRAINT `FK_5ba6f68b5001d56cd305e5923b4` FOREIGN KEY (`bitbucketClientId`) REFERENCES `bitbucket_clients`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `pipelines` DROP FOREIGN KEY `FK_5ba6f68b5001d56cd305e5923b4`')
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `bitbucketClientId`')
  }
}
