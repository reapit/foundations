import { MigrationInterface, QueryRunner } from 'typeorm'

export class bitBucket1645444063726 implements MigrationInterface {
  name = 'bitBucket1645444063726'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `bitbucket_clients` (`id` varchar(36) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `clientKey` varchar(255) NOT NULL, `data` json NOT NULL, UNIQUE INDEX `IDX_8f3f8dd3800f41bda96d50bb41` (`clientKey`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_8f3f8dd3800f41bda96d50bb41` ON `bitbucket_clients`')
    await queryRunner.query('DROP TABLE `bitbucket_clients`')
  }
}
