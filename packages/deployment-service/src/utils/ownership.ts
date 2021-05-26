import { ForbiddenException } from '@homeservenow/serverless-aws-handler'
import { DeploymentModel } from '@/models'
import { connectSessionVerifyDecodeIdToken } from '@reapit/connect-session'

export const ownership = async (deployment: DeploymentModel, headers: { [s: string]: any }): Promise<void | never> => {
  const customer = await connectSessionVerifyDecodeIdToken(
    headers['reapit-connect-token'] as string,
    process.env.CONNECT_USER_POOL as string,
  )

  const developerId = customer?.developerId
  const organisationId = customer?.orgId

  if (
    (deployment?.organisationId && deployment.organisationId !== organisationId) ||
    (deployment?.developerId && deployment.developerId !== developerId)
  ) {
    throw new ForbiddenException()
  }
}
