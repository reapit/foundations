import {
  CloudFrontClient,
  GetDistributionCommand,
  ListDistributionsCommand,
  ListOriginAccessControlsCommand,
  OriginAccessControlSummary,
  UpdateDistributionCommand,
  UpdateDistributionCommandOutput,
} from '@aws-sdk/client-cloudfront'
import { OnEventHandler } from 'aws-cdk-lib/custom-resources/lib/provider-framework/types'

const updateDistro = async (
  client: CloudFrontClient,
  OAC: OriginAccessControlSummary,
  distroId: string,
): Promise<UpdateDistributionCommandOutput | void> => {
  const distributionResult = await client.send(
    new GetDistributionCommand({
      Id: distroId,
    }),
  )

  const distribution = distributionResult.Distribution

  if (!distribution) {
    console.error(`Distribution not found [${distroId}]`)
    return Promise.resolve()
  }

  if (distribution.DistributionConfig?.Origins?.Items?.find((origin) => origin.OriginAccessControlId)) {
    console.log('distro', distribution.Id, 'has been skipped. Origin access aready applied')
    return Promise.resolve()
  }

  return client.send(
    new UpdateDistributionCommand({
      Id: distroId,
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
}

const updateDistros = async (client: CloudFrontClient, OAC: OriginAccessControlSummary) => {
  let marker: string | undefined = undefined

  do {
    const fetchDistros = await client.send(
      new ListDistributionsCommand({
        Marker: marker,
        MaxItems: 5,
      }),
    )

    if (!fetchDistros.DistributionList.Items) return

    await Promise.all(
      fetchDistros.DistributionList?.Items.map(async (distro) => {
        try {
          await updateDistro(client, OAC, distro.Id)
        } catch (error) {
          console.error(error)
        }
      }),
    )

    marker = fetchDistros.DistributionList.Marker

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 10000))
  } while (typeof marker !== 'undefined')
}

export const resolveProductionApplyOACToAllDistros: OnEventHandler = async (event) => {
  if (event.RequestType === 'Delete')
    return {
      PhysicalResourceId: event.PhysicalResourceId,
      Data: {
        skipped: true,
      },
    }

  const client = new CloudFrontClient({})

  const OACs = await client.send(new ListOriginAccessControlsCommand({}))

  const OAC = OACs.OriginAccessControlList?.Items
    ? OACs.OriginAccessControlList?.Items.find((oac) => oac.Name === 'distro-to-s3')
    : undefined

  if (!OAC) throw new Error('OAC not found')

  await updateDistros(client, OAC)

  return {
    PhysicalResourceId: event.PhysicalResourceId,
  }
}
