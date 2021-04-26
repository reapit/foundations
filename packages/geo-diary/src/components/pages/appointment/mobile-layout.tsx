import React from 'react'
import TravelMode from '@/components/ui/travel-mode'
import AppointmentTime from '@/components/ui/appointment-time'
import AppointmentMap from '@/components/ui/map'
import AppointmentList from '@/components/ui/appointment-list'
import { ExtendedAppointmentModel } from '@/types/global'
import ListAndMapTab from '@/components/ui/list-and-map-tab'
import { Section } from '@reapit/elements'
import { Loader } from '@reapit/elements/v3'
import { useAppState } from '../../../core/app-state'

export type MobileLayoutProps = {
  appointments: ExtendedAppointmentModel[]
  loading: boolean
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ appointments, loading }) => {
  const { appState } = useAppState()
  const { tab } = appState

  if (tab === 'MAP') {
    return (
      <>
        <Section className="flex-shrink-0 pb-4" isFlex isFlexColumn hasPadding={false} hasMargin={false}>
          <ListAndMapTab />
        </Section>
        <AppointmentMap appointments={appointments} />
      </>
    )
  }

  return (
    <>
      <Section className="pb-4" isFlex isFlexColumn hasPadding={false} hasMargin={false}>
        <ListAndMapTab />
        <AppointmentTime />
        <TravelMode />
      </Section>
      <Section isFlex isFlexColumn hasBackground={false}>
        {loading ? <Loader label="Loading" /> : <AppointmentList appointments={appointments} />}
      </Section>
    </>
  )
}
