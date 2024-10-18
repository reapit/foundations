import React, { ChangeEvent, FC } from 'react'
import { useAppState } from '../state/use-app-state'
import { Tabs } from '@reapit/elements'
import { NavigateFunction, useLocation, useNavigate } from 'react-router'
import Routes from '../../../constants/routes'

export type PipelineTabs = 'configure' | 'deployments' | 'environment' | 'DNS'

const resolveRoute = (tab: PipelineTabs): string => {
  switch (tab) {
    case 'configure':
      return Routes.APP_PIPELINE_CONFIGURE
    case 'deployments':
      return Routes.APP_PIPELINE
    case 'environment':
      return Routes.APP_PIPELINE_ENVIRONMENT
    case 'DNS':
      return Routes.APP_PIPELINE_DNS
  }
}

export const handleChangeTab =
  (navigate: NavigateFunction, appId: string | null) => (event: ChangeEvent<HTMLInputElement>) => {
    const tab = event.target.value as PipelineTabs

    const route = resolveRoute(tab)

    if (appId) {
      navigate(route.replace(':appId', appId))
    }
  }

export const PipelineTabs: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { appId } = useAppState()
  const { pathname } = location

  return (
    <Tabs
      isFullWidth
      name="pipeline-tabs"
      onChange={handleChangeTab(navigate, appId)}
      options={[
        {
          id: 'deployments',
          value: 'deployments',
          text: 'Deployments',
          isChecked: !pathname.includes('configure') && !pathname.includes('environment') && !pathname.includes('dns'),
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
        {
          id: 'DNS',
          value: 'DNS',
          text: 'Custom DNS',
          isChecked: pathname.includes('dns'),
        },
      ]}
    />
  )
}
