import { PipelineRunnerEntity } from '../entities'
import { connect } from './../core'
import { Pagination, paginate } from 'nestjs-typeorm-paginate'

export const createPipelineRunnerEntity = async (dto: Partial<PipelineRunnerEntity>): Promise<PipelineRunnerEntity> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineRunnerEntity)

  return repo.save(repo.create(dto))
}

export const updatePipelineRunnerEntity = async (
  model: PipelineRunnerEntity,
  dto: Partial<PipelineRunnerEntity>,
): Promise<PipelineRunnerEntity> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineRunnerEntity)

  return repo.save({
    ...model,
    ...dto,
  })
}

export const findPipelineRunnerById = async (id: string): Promise<PipelineRunnerEntity | undefined> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineRunnerEntity)

  return repo.findOne(id)
}

export const paginatePipelineRunners = async (
  pipelineId: string,
  page: number = 1,
): Promise<Pagination<PipelineRunnerEntity>> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineRunnerEntity)

  const qb = repo.createQueryBuilder('r')
  qb.innerJoin('r.pipeline', 'p')
  qb.where('p.id = :pipelineId', { pipelineId })
  qb.orderBy('r.created', 'DESC')

  return paginate(qb, { limit: 10, page })
}
