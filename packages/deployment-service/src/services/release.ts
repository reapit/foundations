import { ReleaseEntity } from '../entities'
import { connect } from './../core'
import { Pagination, paginate, paginateRaw, createPaginationObject } from 'nestjs-typeorm-paginate'

export const paginateReleases = async (
  developerId: string,
  projectName,
  page: number = 1,
): Promise<Pagination<ReleaseEntity>> => {
  const connection = await connect()
  const repo = connection.getRepository(ReleaseEntity)

  return paginate(repo, { limit: 10, page }, { where: { developerId, projectName }, order: { version: 'DESC' } })
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

export const paginateProjects = async (developerId: string, page: number = 1): Promise<Pagination<string>> => {
  const connection = await connect()
  const repo = connection.getRepository(ReleaseEntity)

  const qb = repo.createQueryBuilder()
  qb.select('projectName').where('developerId = :developerId', { developerId }).groupBy('projectName')

  const result = await paginateRaw(qb, { limit: 10, page })

  const items = result.items.map((item) => item.projectName as string)

  return createPaginationObject({
    items,
    totalItems: result.meta.totalItems,
    currentPage: result.meta.currentPage,
    limit: 10,
  })
}
