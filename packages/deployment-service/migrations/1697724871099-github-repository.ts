import { MigrationInterface, QueryRunner, Repository } from 'typeorm'
import { PipelineEntity } from '../src/entities/pipeline.entity'
import { RepositoryEntity } from '../src/entities/repository.entity'

export class githubRepository1697724871099 implements MigrationInterface {
  name = 'githubRepository1697724871099'

  protected async resolveNewGithubEntity(
    repo: Partial<RepositoryEntity>,
    githubRepository: Repository<RepositoryEntity>,
  ): Promise<RepositoryEntity> {
    const existingRepository = await githubRepository.findOne({
      where: {
        repositoryUrl: repo.repositoryUrl,
      },
    })

    if (existingRepository) return existingRepository

    return githubRepository.save(
      githubRepository.create({
        ...repo,
      }),
    )
  }

  protected async resolveGithubEntityUpdate(
    pipeline: Partial<PipelineEntity & { repositoryId?: number; installationId?: number; repository?: string }>,
    githubRepository: Repository<RepositoryEntity>,
    pipelineRepository: Repository<PipelineEntity>,
  ): Promise<void> {
    const githubRepo = await this.resolveNewGithubEntity(
      {
        repositoryUrl: pipeline.repository,
        repositoryId: pipeline.repositoryId,
        installationId: pipeline.installationId,
      },
      githubRepository,
    )

    await pipelineRepository.save({
      id: pipeline.id,
      repository: githubRepo,
    })
  }

  protected async resolveToPipeline(githubEntities: RepositoryEntity[], queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      githubEntities.map(({ pipelines, repositoryUrl, repositoryId, installationId }) =>
        queryRunner.query(
          'UPDATE pipelines SET (repository, installationId, repositoryId) VALUES (?, ?, ?) WHERE id IN(?)',
          [
            repositoryUrl,
            installationId,
            repositoryId,
            pipelines?.map(({ id }) => id), // does this need to be concat to join(',') ???
          ],
        ),
      ),
    )
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `repositories` (`id` varchar(36) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `modified` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `repositoryUrl` varchar(255) NOT NULL, `installationId` varchar(20) NULL, `repositoryId` varchar(20) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    )

    // Fetch all pipeline repository data before dropping columns
    const pipelineRepository = queryRunner.manager.getRepository<PipelineEntity>(PipelineEntity)
    const githubRepository = queryRunner.manager.getRepository<RepositoryEntity>(RepositoryEntity)

    const pipelinesWithGithubRepositories = await queryRunner.query(
      "SELECT id, repository, installationId, repositoryId from pipelines WHERE repository <> ''",
    )

    console.log('Pipeline repository configurations', pipelinesWithGithubRepositories)

    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `repository`')
    await queryRunner.query('ALTER TABLE `pipelines` DROP COLUMN `repositoryId`')
    await queryRunner.query('ALTER TABLE `pipelines` ADD `repositoryId` varchar(36) NULL')
    await queryRunner.query(
      'ALTER TABLE `pipelines` ADD CONSTRAINT `FK_2ecf68ee544ba0e68d167a0ccbf` FOREIGN KEY (`repositoryId`) REFERENCES `repositories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    )

    // add pipeline repository data to newly created entity specifically for github repository data
    await Promise.all(
      pipelinesWithGithubRepositories.map((pipeline) =>
        this.resolveGithubEntityUpdate(pipeline, githubRepository, pipelineRepository),
      ),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const githubRepository = queryRunner.manager.getRepository<RepositoryEntity>(RepositoryEntity)

    const githubEntities = await githubRepository.find({
      relations: ['pipelines'],
    })
    await queryRunner.query('ALTER TABLE `pipelines` DROP FOREIGN KEY `FK_2ecf68ee544ba0e68d167a0ccbf`')

    await queryRunner.query('ALTER TABLE `pipelines` ADD `repositoryId` varchar(50) NULL')

    await queryRunner.query('ALTER TABLE `pipelines` ADD `installationId` varchar(50) NULL')
    await queryRunner.query('ALTER TABLE `pipelines` ADD `repository` varchar(255) NULL')
    await queryRunner.query('DROP TABLE `repositories`')

    await this.resolveToPipeline(githubEntities, queryRunner)
  }
}
