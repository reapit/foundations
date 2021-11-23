import { PipelineEntity } from '../entities'
import { connect } from './../core'
import { Pagination, paginate } from 'nestjs-typeorm-paginate'

export const createPipelineEntity = async (dto: Partial<PipelineEntity>): Promise<PipelineEntity> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineEntity)
  return repo.save(repo.create(dto))
}

export const updatePipelineEntity = async (
  model: PipelineEntity,
  dto: Partial<PipelineEntity>,
): Promise<PipelineEntity> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineEntity)

  return repo.save({
    ...model,
    ...dto,
  })
}

export const deletePipelineEntity = async (model: PipelineEntity): Promise<void> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineEntity)

  await repo.delete(model.id as string)
}

export const findPipelineById = async (id: string): Promise<PipelineEntity | undefined> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineEntity)

  return repo.findOne({ id })
}

export const paginatePipelines = async (
  developerId: string,
  appId?: string,
  page: number = 1,
): Promise<Pagination<PipelineEntity>> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineEntity)

  const qb = repo.createQueryBuilder()
  qb.where('developerId = :developerId', { developerId })
  qb.addOrderBy('created', 'DESC')

  if (appId) {
    qb.where('appId = :appId', { appId })
  }

  return paginate(qb, { limit: 10, page })
}
