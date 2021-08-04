import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import { Title, Loader, FlexContainer, PersistantNotification, PageContainer, elHFull } from '@reapit/elements'
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

enum LoadingStatus {
  Incomplete = 'incomplete',
  Complete = 'complete',
  Failed = 'failed',
}

export const Home: FC<HomeProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [powerBiReport, setPowerBiReport] = useState<CredentialsModel | undefined>()
  const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(LoadingStatus.Incomplete)
  const reportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (connectSession && loadingStatus === LoadingStatus.Incomplete && !powerBiReport) {
      const interval = window.setInterval(() => {
        const fetchAppoinmentConfigs = async () => {
          const serviceResponse = await powerBiApiService(connectSession as ReapitConnectSession)

          if (serviceResponse?.status === LoadingStatus.Complete) {
            setLoadingStatus(LoadingStatus.Complete)
            setPowerBiReport(serviceResponse)
          }

          if (serviceResponse?.status === LoadingStatus.Failed) {
            setLoadingStatus(LoadingStatus.Failed)
          }
        }

        fetchAppoinmentConfigs()
      }, 5000)
      return () => window.clearInterval(interval)
    }
  }, [connectSession, powerBiReport])

  useEffect(() => {
    if (reportRef.current && powerBiReport) {
      embedPowerBi(powerBiReport, reportRef)
    }
  }, [reportRef, powerBiReport])

  return (
    <PageContainer>
      <Title>Reapit Insights</Title>
      {loadingStatus === LoadingStatus.Incomplete ? (
        <>
          <PersistantNotification isFullWidth isExpanded intent="secondary">
            Loading your Power BI account. On the first login, this could take up to a minute.
          </PersistantNotification>
          <Loader fullPage label="Loading" />
        </>
      ) : (powerBiReport && powerBiReport.status === 'failed') || loadingStatus === LoadingStatus.Failed ? (
        <PersistantNotification isFullWidth isExpanded intent="danger">
          It looks like we have encountered an issue setting up your account. Please contact our support team
          <a href="mailto:foundationssupport@reapit.com">foundationssupport@reapit.com</a> for further assistance.
        </PersistantNotification>
      ) : powerBiReport && powerBiReport.status === 'incomplete' ? (
        <PersistantNotification isFullWidth isExpanded intent="secondary">
          We are currently in the process of setting up your account. We will automatically send you an email once this
          has been completed.
        </PersistantNotification>
      ) : powerBiReport && !powerBiReport.report ? (
        <PersistantNotification isFullWidth isExpanded intent="danger">
          No credentials found to load the application
        </PersistantNotification>
      ) : (
        <FlexContainer className={elHFull} isFlexColumn>
          <MetabaseContainer id="reportContainer" ref={reportRef} />
        </FlexContainer>
      )}
    </PageContainer>
  )
}

export default Home
