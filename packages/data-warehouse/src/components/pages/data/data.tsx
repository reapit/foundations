import React, { FC } from 'react'
import { PagedApiResponse } from '../../../types/core'
import { DataSetModel } from '../../../types/data-sets'
import { SharesModel } from '../../../types/shares'
import { DataSetsTable } from './data-sets-table'
import { SharesTable } from './shares-table'
import { BodyText, Loader, PageContainer, PersistentNotification, Subtitle, Title } from '@reapit/elements'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

export const Data: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const orgId = connectSession?.loginIdentity?.orgId

  const [dataSets, dataSetsLoading] = useReapitGet<PagedApiResponse<DataSetModel>>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDwDataSets],
    queryParams: { organisationId: orgId, pageSize: 999 },
    fetchWhenTrue: [orgId],
  })

  const [shares, sharesLoading, , refreshShares] = useReapitGet<PagedApiResponse<SharesModel>>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDwShares],
    queryParams: { organisationId: orgId, pageSize: 999 },
    fetchWhenTrue: [orgId],
  })

  return (
    <PageContainer>
      <Title>Data</Title>
      <BodyText hasGreyText>
        Our data warehouse solution can provide access to your data in a number of different formats. To get immediate
        access to your data in a particular format, click ‘Create Share’. The data will be published into your data
        warehouse and connectivity information will then be presented to you. Please see our{' '}
        <a
          href="https://www.youtube.com/watch?v=N-4TeWsM7EU&feature=youtu.be"
          target="_blank"
          rel="noopener noreferrer"
        >
          usage instructions
        </a>{' '}
        for further information on how to use these details to connect a number of popular BI applications.
      </BodyText>
      <BodyText hasGreyText>
        Please note that creating a data share is a long running process and can take 30 seconds or more to complete.
      </BodyText>
      <Subtitle>Available Data</Subtitle>
      {dataSetsLoading ? (
        <Loader />
      ) : dataSets?._embedded.length ? (
        <DataSetsTable dataSets={dataSets._embedded} refreshShares={refreshShares} />
      ) : (
        <PersistentNotification isInline isExpanded isFullWidth intent="secondary">
          No datasets available for your organisation
        </PersistentNotification>
      )}
      <Subtitle>Data Shares</Subtitle>
      {sharesLoading ? (
        <Loader />
      ) : shares?._embedded.length ? (
        <SharesTable shares={shares._embedded} refreshShares={refreshShares} />
      ) : (
        <PersistentNotification isInline isExpanded isFullWidth intent="secondary">
          No data shares available for your organisation
        </PersistentNotification>
      )}
    </PageContainer>
  )
}

export default Data
