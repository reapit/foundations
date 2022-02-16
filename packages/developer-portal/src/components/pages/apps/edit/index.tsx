import React, { FC, useEffect, useState } from 'react'
import { Loader, PersistantNotification, Tabs, Title } from '@reapit/elements'
import { AppPipeline } from './app-pipeline'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { useParams } from 'react-router-dom'

const AppDetailsTabs = ({ tab }: { tab: string }) => {
  switch (tab) {
    case 'pipelines':
      return <AppPipeline />
    default:
    case 'details':
      return <div>Edititng</div>
  }
}

const AppEditPage: FC = () => {
  const [tab, setTab] = useState<string>('details')
  const { appId } = useParams<AppUriParams>()
  const { appsDataState, setAppId } = useAppState()

  useEffect(handleSetAppId(appId, setAppId), [appId])

  const { appDetail, appDetailLoading } = appsDataState

  return appDetailLoading ? (
    <Loader />
  ) : appDetail ? (
    <>
      <Title>Edit {appDetail?.name}</Title>

      <Tabs
        isFullWidth
        name="app_tabs"
        onChange={(event) =>
          // @ts-ignore
          setTab(event.target.value)
        }
        options={[
          {
            id: 'details',
            value: 'details',
            text: 'General Info',
            isChecked: tab === 'details',
          },
          {
            id: 'pipelines',
            value: 'pipelines',
            text: 'Pipeline',
            isChecked: tab === 'pipelines',
          },
        ]}
      />
      <AppDetailsTabs tab={tab} />
    </>
  ) : (
    <PersistantNotification intent="secondary" isExpanded isFullWidth isInline>
      No record of this app found
    </PersistantNotification>
  )
}

export default AppEditPage
