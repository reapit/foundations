import { httpHandler, NotFoundException, HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import * as service from '@/services/deployment'
import { authorised, ownership } from '@/utils'
/**
 * Delete a deployment
 */
export const deleteDeployment = httpHandler({
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  serialise: {
    input: (event) => {
      authorised(event)
    },
  },
  handler: async ({ event }): Promise<void> => {
    const deployment = await service.getByKey(event.pathParameters?.id as string)

    if (!deployment) {
      throw new NotFoundException()
    }

    ownership(deployment, event.headers)

    await service.deleteDeploymentModel(deployment)
  },
})
