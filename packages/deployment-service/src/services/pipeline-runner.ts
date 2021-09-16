import { PipelineEntity, PipelineRunnerEntity } from '../entities'
import { connect } from './../core'
import { Pagination, paginate } from 'nestjs-typeorm-paginate'
import { In } from 'typeorm'

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

export const findPipelineRunnerById = async (
  id: string,
  extras?: {
    relations: string[]
  },
): Promise<PipelineRunnerEntity | undefined> => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineRunnerEntity)

  return repo.findOne({
    where: {
      id,
    },
    ...extras,
  })
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
    where: {
      codebuildId,
    },
    relations: ['pipeline', 'tasks'],
  })
}

export const deletePipelineRunners = async (pipeline: PipelineEntity) => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineRunnerEntity)

  await repo.delete({
    pipeline,
  })
}

export const pipelineRunnerCountRunning = async (pipeline: PipelineEntity) => {
  const connection = await connect()
  const repo = connection.getRepository(PipelineEntity)

  return repo.count({
    where: {
      pipeline,
      buildStatus: In(['IN_PROGRESS', 'QUEUED']),
    },
  })
}
