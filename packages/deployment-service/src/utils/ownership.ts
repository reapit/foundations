import { ForbiddenException } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '@/models'
import { decodeToken } from './decode.token'

export const ownership = (deployment: DeploymentModel, headers: { [s: string]: any }): void | never => {
  const customer = decodeToken(headers['reapit-connect-token'])
  const organisationId = customer['custom:reapit:orgId']
  const developerId = customer['custom:reapit:developerId']

  if (
    (deployment?.organisationId && deployment.organisationId !== organisationId) ||
    (deployment?.developerId && deployment.developerId !== developerId)
  ) {
    throw new ForbiddenException()
  }
}
