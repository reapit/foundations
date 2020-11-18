import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string'
import { History } from 'history'
import TravelMode from '@/components/ui/travel-mode'
import AppointmentTime from '@/components/ui/appointment-time'
import AppointmentMap from '@/components/ui/map'
import AppointmentList from '@/components/ui/appointment-list'
import { ExtendedAppointmentModel } from '@/types/global'
import { mapContainer, appoinmentContainer } from './__styles__'
import { Section } from '@reapit/elements'

export type GenerateTabConfigParams = {
  queryParams: qs.ParsedQuery<string>
  history: History
}

export type DesktopLayoutProps = {
  appointments: ExtendedAppointmentModel[]
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({ appointments }) => {
  const location = useLocation()
  const history = useHistory()
  const queryParams = qs.parse(location.search)
  return (
    <>
      <div className={appoinmentContainer}>
        <Section>
          <AppointmentTime queryParams={queryParams} history={history} />
          <TravelMode queryParams={queryParams} history={history} />
        </Section>
        <AppointmentList appointments={appointments} />
      </div>
      <div className={mapContainer}>
        <AppointmentMap appointments={appointments} />
      </div>
    </>
  )
}
