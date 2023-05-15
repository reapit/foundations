import { createBaseStack, getAccountId } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'
import config from './config.json'
import cdk from 'aws-cdk-lib'
import { CloudFrontClient, DistributionConfig, EventType, GetDistributionCommand, UpdateDistributionCommand } from '@aws-sdk/client-cloudfront'

const createStack = async () => {
  // TODO build script
  const accountId = await getAccountId()
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'security-header-lambda',
    component: 'site',
    accountId,
    region: 'us-east-1',
  })

  const edgeLambda = new cdk.aws_cloudfront.experimental.EdgeFunction(stack, 'securityHeaderLambda', {
    runtime: cdk.aws_lambda.Runtime.NODEJS_14_X,
    handler: 'index.securityHeaderLambda',
    code: cdk.aws_lambda.Code.fromAsset(join(__dirname, 'dist/index')),
  })

  const distroIds = [
    config.developerPortalCfDistId,
    config.marketplaceCfDistId,
    config.geoDiaryCfDistId,
    config.amlCheckListCfDistId,
    config.marketplaceManagementCfDistId,
    config.developerAdminCfDistId,
    config.insightsCfDistId,
    config.dataWarehouseCfDistId,
    config.paymentsCfDistId,
    config.paymentsPortalCfDistId,
    config.mfaConfigCfDistId,
    config.marketplaceAdminCfDistId,
    config.reapitConnectCfDistId,
  ]

  const distroClient = new CloudFrontClient({
    region: 'eu-west-2',
  })

  await Promise.all(distroIds.map(async (distributionId) => {
    const cloudFrontDistro = await distroClient.send(
      new GetDistributionCommand({
        Id: distributionId,
      }),
    )

    const config = cloudFrontDistro.Distribution?.DistributionConfig as DistributionConfig

    if (!config) {
      throw new Error(`Failed to fetch [${distributionId}] distributionId`)
    }

    // TODO potentially cannot do it this way, may have to be on individual projects?
    return distroClient.send(
      new UpdateDistributionCommand({
        Id: distributionId,
        DistributionConfig: {
          Enabled: false,
          DefaultRootObject: config.DefaultRootObject,
          Origins: config.Origins,
          Comment: config.Comment,
          DefaultCacheBehavior: {
            ...config.DefaultCacheBehavior,
            // TODO not sure this is correct, check with someone
            LambdaFunctionAssociations: {
              Quantity: 1,
              Items: [
                {
                  EventType: EventType.origin_response,
                  IncludeBody: false,
                  LambdaFunctionARN: edgeLambda.edgeArn,
                },
              ],
            },
            // edgeLambda: [
            //   {
            //     functionVersion: edgeLambda.currentVersion,
            //     eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST, // TODO should be diff
            //   },
            // ],
          },
          CallerReference: config.CallerReference,
          PriceClass: config.PriceClass,
          Aliases: config.Aliases,
          Logging: config.Logging,
          WebACLId: config.WebACLId,
          HttpVersion: config.HttpVersion,
          CacheBehaviors: config.CacheBehaviors,
          CustomErrorResponses: config.CustomErrorResponses,
          ViewerCertificate: config.ViewerCertificate,
          Restrictions: config.Restrictions,
        },
        IfMatch: cloudFrontDistro.ETag,
      }),
    )
  }))
}

const bootstrap = async () => {
  await createStack()
}

bootstrap().catch((err) => {
  console.error('Build error: ', err)
  process.exit(1)
})
