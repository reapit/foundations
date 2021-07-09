import { MigrationInterface, QueryRunner } from 'typeorm'

export class releases1625822495048 implements MigrationInterface {
  name = 'releases1625822495048'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `releases` (`id` varchar(36) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `zipLocation` varchar(255) NOT NULL, `version` varchar(255) NOT NULL, `currentlyDeployed` tinyint NOT NULL, `projectName` varchar(255) NOT NULL, `developerId` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `releases`')
  }
}
