import { Repository, UpdateResult } from 'typeorm'
import { RepositoryEntity } from '../entities/repository.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class RepositoryProvider {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repository: Repository<RepositoryEntity>,
  ) {}

  async findOrCreate(repository: Partial<RepositoryEntity>, developerId: string): Promise<RepositoryEntity> {
    const existing = await this.repository.findOne({
      where: {
        developerId,
        repositoryUrl: repository.repositoryUrl,
      },
    })

    if (existing !== null) return existing

    return this.repository.save(
      this.repository.create({
        ...repository,
        developerId,
      }),
    )
  }

  async findRepositoriesByUrl(repositoryUrl: string): Promise<RepositoryEntity[]> {
    return this.repository.find({
      where: { repositoryUrl },
      relations: ['pipeline'],
    })
  }

  async updateRepositories({
    repositoryUrl,
    installationId,
    repositoryId,
  }: {
    repositoryUrl: string
    installationId: number
    repositoryId: number
  }): Promise<UpdateResult> {
    return this.repository.update(
      {
        repositoryUrl,
      },
      {
        installationId,
        repositoryId,
      },
    )
  }
}
