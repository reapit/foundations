import React, { ChangeEvent, FC } from 'react'
import { useAppState } from '../state/use-app-state'
import { Tabs } from '@reapit/elements'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import Routes from '../../../constants/routes'

export type PipelineTabs = 'configure' | 'deployments'

export const handleChangeTab = (history: History, appId: string | null) => (event: ChangeEvent<HTMLInputElement>) => {
  const tab = event.target.value as PipelineTabs
  const route = tab === 'configure' ? Routes.APP_PIPELINE_CONFIGURE : Routes.APP_PIPELINE
  if (appId) {
    history.push(route.replace(':appId', appId))
  }
}

export const PipelineTabs: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { appId } = useAppState()
  const { pathname } = location
  const isConfigPage = pathname.includes('configure')

  return (
    <Tabs
      isFullWidth
      name="pipeline-tabs"
      onChange={handleChangeTab(history, appId)}
      options={[
        {
          id: 'deployments',
          value: 'deployments',
          text: 'Deployments',
          isChecked: !isConfigPage,
        },
        {
          id: 'configure',
          value: 'configure',
          text: 'Configure',
          isChecked: isConfigPage,
        },
      ]}
    />
  )
}
