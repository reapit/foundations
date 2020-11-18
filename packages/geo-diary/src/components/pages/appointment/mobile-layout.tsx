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
import { Section } from '@reapit/elements'

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

  if (queryParams.tab === 'map') {
    return (
      <>
        <Section className="flex-shrink-0 pb-4" isFlex isFlexColumn hasPadding={false} hasMargin={false}>
          <ListAndMapTab queryParams={queryParams} history={history} />
        </Section>
        <AppointmentMap appointments={appointments} />
      </>
    )
  }

  return (
    <>
      <Section className="pb-4" isFlex isFlexColumn hasPadding={false} hasMargin={false}>
        <ListAndMapTab queryParams={queryParams} history={history} />
        <AppointmentTime queryParams={queryParams} history={history} />
        <TravelMode queryParams={queryParams} history={history} />
      </Section>
      <Section isFlex isFlexColumn hasBackground={false}>
        <AppointmentList appointments={appointments} />
      </Section>
    </>
  )
}
