import { service, factories, models, IEmbedConfiguration } from 'powerbi-client'
import { logger } from '@reapit/utils'
import { MutableRefObject } from 'react'

const powerbi = new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory)
// Adapted from https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/React-TS/Embed%20for%20your%20organization/UserOwnsData/src/App.tsx

export interface PowerBIParams {
  reportId: string
  embeddedUrl: string
  token: string
}
export const embedPowerBi = (
  { token, reportId, embeddedUrl }: PowerBIParams,
  containerRef: MutableRefObject<HTMLDivElement | null>,
) => {
  if (!token || !embeddedUrl || !reportId || !containerRef.current) return null

  const embedConfiguration: IEmbedConfiguration = {
    type: 'report',
    tokenType: models.TokenType.Embed,
    accessToken: token,
    embedUrl: embeddedUrl,
    id: reportId,
    settings: {
      background: models.BackgroundType.Transparent,
    },
  }

  const powerBiReport = powerbi.embed(containerRef.current, embedConfiguration)

  powerBiReport.off('loaded')
  powerBiReport.on('loaded', () => {
    console.log('Report load successful')
  })

  powerBiReport.off('rendered')
  powerBiReport.on('rendered', () => {
    console.log('Report render successful')
  })

  powerBiReport.off('error')
  powerBiReport.on('error', (event) => {
    const errorMsg = JSON.stringify(event.detail)
    logger(new Error(errorMsg))
  })
}
