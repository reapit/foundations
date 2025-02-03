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

  await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000))

  const distribution = distributionResult.Distribution

  console.log('distro', distribution)

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

const retryableUpdateDistro = async (
  client: CloudFrontClient,
  OAC: OriginAccessControlSummary,
  distroId: string,
): Promise<void> => {
  try {
    await updateDistro(client, OAC, distroId)
  } catch (error) {
    console.error(error)
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 2000))
    await retryableUpdateDistro(client, OAC, distroId)
  }
}

const updateDistros = async (client: CloudFrontClient, OAC: OriginAccessControlSummary) => {
  let marker: string | undefined = undefined
  let counter: number = 1

  do {
    const fetchDistros = await client.send(
      new ListDistributionsCommand({
        Marker: marker,
        MaxItems: 1,
      }),
    )

    if (!fetchDistros.DistributionList.Items) return

    fetchDistros.DistributionList?.Items.forEach(async (distro) => {
      await retryableUpdateDistro(client, OAC, distro.Id as string)
    })

    console.log('prev marker', counter, marker)

    marker = fetchDistros.DistributionList.NextMarker
    counter++

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000))
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

  console.log('OAC', OAC)

  if (!OAC) throw new Error('OAC not found')

  await updateDistros(client, OAC)

  return {
    PhysicalResourceId: event.PhysicalResourceId,
  }
}
