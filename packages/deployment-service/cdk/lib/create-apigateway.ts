import { Construct } from "@aws-cdk/core"
import { RestApi } from '@aws-cdk/aws-apigateway'

export const createApigateway = (app: Construct) => {
  return new RestApi(app as any, `cloud-deployment-service-apigateway`, {
  })
}
