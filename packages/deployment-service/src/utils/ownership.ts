import { ForbiddenException } from '@homeservenow/serverless-aws-handler'
import { connectSessionVerifyDecodeIdToken } from '@reapit/connect-session'

export const ownership = async (
  developerId: string | undefined,
  headers: { [s: string]: any },
): Promise<void | never> => {
  const customer = await connectSessionVerifyDecodeIdToken(
    headers['x-api-key'] as string,
    process.env.CONNECT_USER_POOL as string,
  )

  if (!developerId || developerId !== customer?.developerId) {
    throw new ForbiddenException()
  }
}
