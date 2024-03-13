import { MigrationInterface, QueryRunner } from 'typeorm'
import { RepositoryEntity } from '../src/entities/repository.entity'
import { PipelineEntity } from '../src/entities/pipeline.entity'

export class githubRepositoryDeveloperId1698161392543 implements MigrationInterface {
  name = 'githubRepositoryDeveloperId1698161392543'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `repositories` ADD `developerId` varchar(255) NOT NULL')

    const pipelineRepository = queryRunner.manager.getRepository(PipelineEntity)
    const repository = queryRunner.manager.getRepository(RepositoryEntity)

    const pipelines = await pipelineRepository.find()

    console.log(
      'updating',
      pipelines
        .filter((pipeline) => pipeline.repository)
        .map((pipeline) => ({
          ...pipeline.repository,
          developerId: pipeline.developerId,
        })),
    )

    await repository.save(
      pipelines
        .filter((pipeline) => pipeline.repository)
        .map((pipeline) => ({
          ...pipeline.repository,
          developerId: pipeline.developerId,
        })),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `repositories` DROP COLUMN `developerId`')
  }
}
