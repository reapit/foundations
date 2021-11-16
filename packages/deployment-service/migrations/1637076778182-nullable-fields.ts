import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableFields1637076778182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pipelines` ALTER COLUMN `cloudFrontId` varchar(255) NULLABLE");
        await queryRunner.query("ALTER TABLE `pipelines` ALTER COLUMN `aRecordId` varchar(255) NULLABLE");
        await queryRunner.query("ALTER TABLE `pipelines` ALTER COLUMN `subDomain` varchar(255) NULLABLE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pipelines` ALTER COLUMN `cloudFrontId` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `pipelines` ALTER COLUMN `aRecordId` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `pipelines` ALTER COLUMN `subDomain` varchar(255) NOT NULL");
    }

}
