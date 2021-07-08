import { PipelineRunnerEntity } from '../entities'
import { connect } from './../core'

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
