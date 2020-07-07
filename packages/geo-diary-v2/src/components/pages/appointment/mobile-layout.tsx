import React from 'react'
import { useLocation, useHistory } from 'react-router'
import qs from 'query-string'
import { History } from 'history'
import { TabConfig, Tabs } from '@reapit/elements'
import { ROUTES } from '@/core/router'
import TravelMode from '@/components/ui/travel-mode'
import AppointmentTime from '@/components/ui/appointment-time'
import AppointmentMap from '@/components/ui/map'
import AppointmentList from '@/components/ui/appointment-list'
import { ExtendedAppointmentModel } from '@/types/global'
import { listAndMapTabContainer } from './__styles__'

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

export type GenerateTabConfigParams = {
  queryParams: qs.ParsedQuery<string>
  history: History
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

export type MobileLayoutProps = {
  appointments: ExtendedAppointmentModel[]
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ appointments }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = qs.parse(location.search)
  return (
    <>
      <Tabs className={listAndMapTabContainer} tabConfigs={generateTabConfig({ queryParams, history })} />
      {queryParams.tab !== 'map' && (
        <>
          <AppointmentTime queryParams={queryParams} history={history} />
          <TravelMode queryParams={queryParams} history={history} />
          <AppointmentList appointments={appointments} />
        </>
      )}
      {queryParams.tab === 'map' && <AppointmentMap appointments={appointments} />}
    </>
  )
}
