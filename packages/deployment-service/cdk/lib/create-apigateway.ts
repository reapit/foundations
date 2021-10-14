import { RestApi } from '@aws-cdk/aws-apigateway'
import { CdkStack } from './cdk-stack'

export const createApigateway = (stack: CdkStack) => {
  return new RestApi(stack as any, 'cloud-deployment-service-apigateway', {
    // deployOptions: {
    //   stageName: "dev",
    // },
    defaultCorsPreflightOptions: {
      allowOrigins: ['*'],
      allowHeaders: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
    },
  })
}
