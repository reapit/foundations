import React, { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef } from 'react'
import { getTime, H5, Section, SubTitleH6 } from '@reapit/elements'
import { ExtendedAppointmentModel } from '@/types/global'
// import { AppointmentFooter } from './appointment-footer'
import { AppointmentItems } from './appointment-items'
import { AppState, useAppState } from '../../../core/app-state'
import { highlightTile, appointmentTile } from './__styles__/styles'
import { cx } from 'linaria'
// import { VendorModel } from '../../pages/appointment/appointment'
// import { getShortAddress } from '../../../utils/formatting-utils'
// import ContactDrawer from '../contact-drawer'
// import {FaDirections} from 'react-icons/fa'

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
}

export const handleSetAppointmentId = (
  setAppState: Dispatch<SetStateAction<AppState>>,
  appointment: ExtendedAppointmentModel,
) => () => {
  const { id, property } = appointment
  const destinationLat = property?.address?.geolocation?.latitude ?? null
  const destinationLng = property?.address?.geolocation?.longitude ?? null
  if (id) {
    setAppState((currentState) => ({
      ...currentState,
      appointmentId: id,
      destinationLat,
      destinationLng,
    }))
  }
}

export const handleScrollIntoView = (
  tileRef: MutableRefObject<HTMLDivElement | null>,
  appointmentId: string | null,
  id?: string,
) => () => {
  if (tileRef.current && appointmentId && id && appointmentId === id) {
    tileRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

export const AppointmentTile: FC<AppointmentTileProps> = ({ appointment /*, nextAppointment*/ }) => {
  const { appState, setAppState } = useAppState()
  const { appointmentId } = appState
  const tileRef = useRef<HTMLDivElement>(null)
  const { id } = appointment

  const start = getTime(appointment?.start ?? '')
  const end = getTime(appointment?.end ?? '')
  const appointmentType = appointment.appointmentType?.value

  const headingText = `${start} - ${end}`
  useEffect(handleScrollIntoView(tileRef, appointmentId, id), [appointmentId, id])

  return (
    <>
      <div onClick={handleSetAppointmentId(setAppState, appointment)} ref={tileRef}>
        <Section className={cx(appointmentTile, appointmentId === id && highlightTile)}>
          <H5 className="text-ellipsis">{headingText}</H5>
          {appointmentType && <SubTitleH6>{appointmentType}</SubTitleH6>}
          <AppointmentItems appointment={appointment} />
        </Section>
      </div>
    </>
  )
}
{
  /* <AppointmentFooter appointment={appointment} nextAppointment={nextAppointment} headingText={headingText} /> */
}
