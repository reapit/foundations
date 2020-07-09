import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string'
import { History } from 'history'
import TravelMode from '@/components/ui/travel-mode'
import AppointmentTime from '@/components/ui/appointment-time'
import AppointmentMap from '@/components/ui/map'
import AppointmentList from '@/components/ui/appointment-list'
import { ExtendedAppointmentModel } from '@/types/global'
import ListAndMapTab from '@/components/ui/list-and-map-tab'

export type GenerateTabConfigParams = {
  queryParams: qs.ParsedQuery<string>
  history: History
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
      <ListAndMapTab queryParams={queryParams} history={history} />
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
