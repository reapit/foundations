import { DeploymentDto } from "../dto"
import { DeploymentModel } from "../models"
import { db } from './../core'

export const createDeploymentModel = (dto: DeploymentDto): Promise<DeploymentModel> => {
  return db.put({
    ...dto,
    apiKey: '', // TODO solve api key
  })
}
