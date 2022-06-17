import React, { ChangeEvent, FC } from 'react'
import { useAppState } from '../state/use-app-state'
import { Tabs } from '@reapit/elements'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import Routes from '../../../constants/routes'

export type PipelineTabs = 'configure' | 'deployments' | 'environment'

const resolveRoute = (tab: PipelineTabs): string => {
  switch (tab) {
    case 'configure':
      return Routes.APP_PIPELINE_CONFIGURE
    case 'deployments':
      return Routes.APP_PIPELINE
    case 'environment':
      return Routes.APP_PIPELINE_ENVIRONMENT
  }
}

export const handleChangeTab = (history: History, appId: string | null) => (event: ChangeEvent<HTMLInputElement>) => {
  const tab = event.target.value as PipelineTabs

  const route = resolveRoute(tab)

  if (appId) {
    history.push(route.replace(':appId', appId))
  }
}

export const PipelineTabs: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { appId } = useAppState()
  const { pathname } = location

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
          isChecked: !pathname.includes('configure') && !pathname.includes('environment'),
        },
        {
          id: 'configure',
          value: 'configure',
          text: 'Configure',
          isChecked: pathname.includes('configure'),
        },
        {
          id: 'environment',
          value: 'environment',
          text: 'Environment Variables',
          isChecked: pathname.includes('environment'),
        },
      ]}
    />
  )
}
