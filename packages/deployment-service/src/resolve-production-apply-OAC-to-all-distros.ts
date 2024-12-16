import {
  CloudFrontClient,
  GetDistributionCommand,
  ListDistributionsCommand,
  ListOriginAccessControlsCommand,
  UpdateDistributionCommand,
} from '@aws-sdk/client-cloudfront'
import { OnEventHandler } from 'aws-cdk-lib/custom-resources/lib/provider-framework/types'

export const resolveProductionApplyOACToAllDistros: OnEventHandler = async (event) => {
  if (event.RequestType === 'Delete')
    return {
      PhysicalResourceId: event.PhysicalResourceId,
      Data: {
        skipped: true,
      },
    }

  const client = new CloudFrontClient({})

  const fetchDistros = await client.send(new ListDistributionsCommand())

  const OACs = await client.send(new ListOriginAccessControlsCommand({}))

  const OAC = OACs.OriginAccessControlList?.Items ? OACs.OriginAccessControlList?.Items[0] : undefined

  if (!OAC) throw new Error('OAC not found')

  const distros = fetchDistros.DistributionList?.Items || []

  await Promise.all(
    distros?.map(async (distro) => {
      const distributionResult = await client.send(
        new GetDistributionCommand({
          Id: distro.Id,
        }),
      )

      const distribution = distributionResult.Distribution

      if (!distribution) {
        console.error(`Distribution not found [${distro.Id}]`)
        return Promise.resolve() // TODO reject
      }

      return client.send(
        new UpdateDistributionCommand({
          Id: distro.Id,
          DistributionConfig: {
            ...distribution.DistributionConfig,
            DefaultCacheBehavior: distribution.DistributionConfig?.DefaultCacheBehavior,
            Comment: distribution.DistributionConfig?.Comment,
            Enabled: distribution.DistributionConfig?.Enabled,
            CallerReference: distribution.DistributionConfig?.CallerReference,
            Origins: {
              Quantity: distribution?.DistributionConfig?.Origins?.Quantity,
              Items: distribution?.DistributionConfig?.Origins?.Items?.map((item) => ({
                ...item,
                OriginAccessControlId: OAC?.Id,
              })),
            },
          },
          IfMatch: distributionResult.ETag,
        }),
      )
    }),
  )

  return {
    PhysicalResourceId: event.PhysicalResourceId,
  }
}
