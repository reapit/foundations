import React, { FC } from 'react'
import TravelMode from '@/components/ui/travel-mode'
import AppointmentTime from '@/components/ui/appointment-time'
import AppointmentMap from '@/components/ui/map'
import AppointmentList from '@/components/ui/appointment-list'
import { ExtendedAppointmentModel } from '@/types/global'
import { mapContainer, appoinmentContainer } from './__styles__'
import { FadeIn, Section } from '@reapit/elements'
import { Loader } from '@reapit/elements/v3'

export type DesktopLayoutProps = {
  appointments: ExtendedAppointmentModel[]
  loading: boolean
}

export const DesktopLayout: FC<DesktopLayoutProps> = ({ appointments, loading }) => (
  <>
    <div className={appoinmentContainer}>
      <Section>
        <AppointmentTime />
        <TravelMode />
      </Section>
      {loading ? (
        <Loader label="Loading" />
      ) : (
        <FadeIn>
          <AppointmentList appointments={appointments} />
        </FadeIn>
      )}
    </div>
    <div className={mapContainer}>
      <AppointmentMap appointments={appointments} />
    </div>
  </>
)
