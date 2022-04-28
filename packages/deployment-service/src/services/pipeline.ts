import { PipelineEntity } from '../entities/pipeline.entity'
import { connect } from './../core'
import { Pagination, paginate } from 'nestjs-typeorm-paginate'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions/deployment-schema'
import { UpdateResult } from 'typeorm'

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

export const findPipelineByRepo = async (repository: string): Promise<PipelineEntity | undefined> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineEntity)

  return repo.findOne({ repository })
}

export const findPipelineByRepositoryId = async (
  repositoryId: string | number,
): Promise<PipelineEntity | undefined> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineEntity)

  return repo.findOne({
    repositoryId: typeof repositoryId === 'number' ? repositoryId : parseInt(repositoryId),
  })
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

export const findPipelinesByAppId = async (appId: string): Promise<PipelineModelInterface[]> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineEntity)

  return repo.find({
    appId,
  })
}

export const updatePipelinesWithRepo = async (
  repository: string,
  data: Partial<PipelineEntity>,
): Promise<UpdateResult> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineEntity)

  return repo
    .createQueryBuilder()
    .update()
    .set(data)
    .where('repository = :repository', {
      repository,
    })
    .execute()
}
