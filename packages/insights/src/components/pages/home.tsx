import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import { H3, Section, Helper, Loader } from '@reapit/elements'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { CredentialsModel, powerBiApiService } from '@/platform-api/power-bi-api'
import { service, factories, models, IEmbedConfiguration } from 'powerbi-client'
import { logger } from '@reapit/utils'
import { MetabaseContainer } from './__styles__/styles'

const powerbi = new service.Service(factories.hpmFactory, factories.wpmpFactory, factories.routerFactory)

export type HomeProps = {}

// Adapted from https://github.com/microsoft/PowerBI-Developer-Samples/blob/master/React-TS/Embed%20for%20your%20organization/UserOwnsData/src/App.tsx
export const embedPowerBi = (
  { token, report }: CredentialsModel,
  containerRef: MutableRefObject<HTMLDivElement | null>,
) => {
  if (!report || !containerRef.current) return null

  const { reportId, embeddedUrl } = report
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

export const Home: FC<HomeProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [powerBiReport, setPowerBiReport] = useState<CredentialsModel | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const reportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchAppoinmentConfigs = async () => {
      const serviceResponse = await powerBiApiService(connectSession as ReapitConnectSession)
      setLoading(false)
      if (serviceResponse) {
        setPowerBiReport(serviceResponse)
      }
    }
    if (connectSession) {
      setLoading(true)
      fetchAppoinmentConfigs()
    }
  }, [connectSession])

  useEffect(() => {
    if (reportRef.current && powerBiReport) {
      embedPowerBi(powerBiReport, reportRef)
    }
  }, [reportRef, powerBiReport])

  return (
    <>
      <H3>Reapit Insights</H3>
      <Section isFlex isFlexColumn hasPadding={false} hasMargin={false} isFullHeight>
        {loading ? (
          <Loader />
        ) : powerBiReport && powerBiReport.status === 'failed' ? (
          <Helper>
            It looks like we have encountered an issue setting up your account. Please contact our support team
            <a href="mailto:foundationssupport@reapit.com">foundationssupport@reapit.com</a> for further assistance.
          </Helper>
        ) : powerBiReport && powerBiReport.status === 'incomplete' ? (
          <Helper>
            We are currently in the process of setting up your account. We will automatically send you an email once
            this has been completed.
          </Helper>
        ) : powerBiReport && !powerBiReport.report ? (
          <Helper>No credentials found to load the application</Helper>
        ) : (
          <MetabaseContainer id="reportContainer" ref={reportRef} />
        )}
      </Section>
    </>
  )
}

export default Home
