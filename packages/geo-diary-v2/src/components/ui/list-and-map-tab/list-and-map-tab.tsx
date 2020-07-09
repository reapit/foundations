import React from 'react'
import qs from 'query-string'
import { History } from 'history'
import { Tabs, TabConfig } from '@reapit/elements'
import { listAndMapTabContainer } from './__styles__'
import { ROUTES } from '@/core/router'

export type HandleChangeTabParams = {
  tabName: string
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const handleChangeTab = ({ history, tabName, queryParams }: HandleChangeTabParams) => () => {
  const queryString = qs.stringify({
    ...queryParams,
    tab: tabName,
    destinationLat: undefined,
    destinationLng: undefined,
  })
  history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
}

export const generateTabConfig = ({ queryParams, history }): TabConfig[] => {
  return [
    {
      tabIdentifier: 'list',
      displayText: 'list',
      onTabClick: handleChangeTab({ history, tabName: 'list', queryParams }),
      active: queryParams.tab === 'list',
    },
    {
      tabIdentifier: 'map',
      displayText: 'map',
      onTabClick: handleChangeTab({ history, tabName: 'map', queryParams }),
      active: queryParams.tab === 'map',
    },
  ]
}

export type ListAndMapTabProps = {
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const ListAndMapTab: React.FC<ListAndMapTabProps> = ({ queryParams, history }) => {
  return <Tabs className={listAndMapTabContainer} tabConfigs={generateTabConfig({ queryParams, history })} />
}

export default React.memo(ListAndMapTab)
