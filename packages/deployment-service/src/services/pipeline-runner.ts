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

export const savePipelineRunnerEntity = async (model: PipelineRunnerEntity): Promise<PipelineRunnerEntity> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineRunnerEntity)

  return repo.save(model)
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

  return paginate(
    repo,
    { limit: 10, page },
    {
      relations: ['pipeline'],
      where: {
        pipeline: {
          id: pipelineId,
        },
      },
      order: {
        created: 'DESC',
      },
    },
  )
}

export const findPipelineRunnerByCodeBuildId = async (
  codebuildId: string,
): Promise<PipelineRunnerEntity | undefined> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineRunnerEntity)

  return repo.findOne({
    codebuildId,
  })
}
