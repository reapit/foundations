import { MigrationInterface, QueryRunner } from 'typeorm'

export class cliRefactor1637591977282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `releases`')
    await queryRunner.query("ALTER TABLE `pipeline_runners` ADD COLUMN `type` varchar(36) NOT NULL DEFAULT 'BUILD'")
    await queryRunner.query('ALTER TABLE `pipeline_runners` ADD COLUMN `buildVersion` varchar(10)')
    await queryRunner.query(
      'ALTER TABLE `pipeline_runners` ADD COLUMN `currentlyDeployed` tinyint(1) NOT NULL DEFAULT 0',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `releases` (`id` varchar(36) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `zipLocation` varchar(255) NOT NULL, `version` varchar(255) NOT NULL, `currentlyDeployed` tinyint NOT NULL, `projectName` varchar(255) NOT NULL, `developerId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    )
    await queryRunner.query('ALTER TABLE `pipeline_runners` DROP COLUMN `currentlyDeployed`')
    await queryRunner.query('ALTER TABLE `pipeline_runners` DROP COLUMN `buildVersion`')
    await queryRunner.query('ALTER TABLE `pipeline_runners` DROP COLUMN `type`')
  }
}
