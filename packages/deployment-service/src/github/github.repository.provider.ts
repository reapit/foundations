import { Repository, UpdateResult } from 'typeorm'
import { GithubRepositoryEntity } from './github.repository.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class GithubRepositoryProvider {
  constructor(
    @InjectRepository(GithubRepositoryEntity)
    private readonly repository: Repository<GithubRepositoryEntity>,
  ) {}

  async findRepositoriesByUrl(repositoryUrl: string): Promise<GithubRepositoryEntity[]> {
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
