import { ReleaseEntity } from '../entities'
import { connect } from './../core'
import { Pagination, paginate } from 'nestjs-typeorm-paginate'

export const paginateReleases = async (
  developerId: string,
  projectName,
  page: number = 1,
): Promise<Pagination<ReleaseEntity>> => {
  const connection = await connect()
  const repo = connection.getRepository(ReleaseEntity)

  return paginate(repo, { limit: 10, page }, { developerId, projectName })
}

export const createRelease = async (dto: Partial<ReleaseEntity>): Promise<ReleaseEntity> => {
  const connection = await connect()
  const repo = connection.getRepository(ReleaseEntity)

  return repo.save(repo.create(dto))
}

export const resetDeploymentStatus = async (projectName: string, developerId: string): Promise<void> => {
  const connection = await connect()
  const repo = connection.getRepository(ReleaseEntity)

  await repo.update(
    {
      projectName,
      developerId,
    },
    {
      currentlyDeployed: false,
    },
  )
}

export const findByProjectNameAndVersion = async (
  projectName: string,
  version: string,
  developerId: string,
): Promise<ReleaseEntity | undefined> => {
  const connection = await connect()
  const repo = connection.getRepository(ReleaseEntity)

  return repo.findOne({
    projectName,
    developerId,
    version,
  })
}

export const update = async (release: ReleaseEntity): Promise<ReleaseEntity> => {
  const connection = await connect()
  const repo = connection.getRepository(ReleaseEntity)

  return repo.save(release)
}
