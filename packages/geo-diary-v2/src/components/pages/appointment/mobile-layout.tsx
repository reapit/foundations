import React from 'react'
import { useLocation, useHistory } from 'react-router'
import qs from 'query-string'
import { TabConfig, Tabs } from '@reapit/elements'
import { TravelMode } from './travel-mode'
import { ROUTES } from '@/core/router'
import { AppointmentTime } from './appointment-time'
import AppointmentMap from './map'

export type HandleChangeTabParams = {
  tabName: string
  queryParams: qs.ParsedQuery<string>
  history: {
    push: (queryString: string) => void
  }
}

export const handleChangeTab = ({ history, tabName, queryParams }: HandleChangeTabParams) => () => {
  const queryString = qs.stringify({ ...queryParams, tab: tabName })
  history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
}

export type GenerateTabConfigParams = {
  queryParams: qs.ParsedQuery<string>
  history: {
    push: (queryString: string) => void
  }
}

export const generateTabConfig = ({ queryParams, history }): TabConfig[] => [
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

export const MobileLayout: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = qs.parse(location.search)
  return (
    <>
      <Tabs tabConfigs={generateTabConfig({ queryParams, history })} />
      {queryParams.tab === 'list' && (
        <>
          <AppointmentTime queryParams={queryParams} history={history} />
          <TravelMode queryParams={queryParams} history={history} />
        </>
      )}
      {queryParams.tab === 'map' && <AppointmentMap appointments={[]} />}
    </>
  )
}
