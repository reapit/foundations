import { MigrationInterface, QueryRunner } from 'typeorm'

export class startTimeFix1638286917874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `tasks` CHANGE `startTime` `startTime` timestamp NULL')
    await queryRunner.query('ALTER TABLE `tasks` CHANGE `endTime` `endTime` timestamp NULL')
    await queryRunner.query('ALTER TABLE `tasks` CHANGE `elapsedTime` `elapsedTime` varchar(255) NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `tasks` CHANGE `startTime` `startTime` timestamp NOT NULL')
    await queryRunner.query('ALTER TABLE `tasks` CHANGE `endTime` `endTime` timestamp NOT NULL')
    await queryRunner.query('ALTER TABLE `tasks` CHANGE `elapsedTime` `elapsedTime` varchar(255) NOT NULL')
  }
}
