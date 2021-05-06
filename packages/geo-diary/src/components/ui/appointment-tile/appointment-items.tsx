import React, { Dispatch, FC, SetStateAction } from 'react'
import { ExtendedAppointmentModel } from '../../../types/global'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { AppState } from '../../../core/app-state'
// import ContactDrawer from '../contact-drawer'
import { AttendeeItem } from './attendees-item'
import { PropertyItem } from './property-item'
import { ContactDrawerType } from '../contact-drawer'
import { VendorItem } from './vendor-item'

export type RenderIconItemsProps = {
  appointment: ExtendedAppointmentModel
}

export type AppointmentTileProps = {
  appointment: ExtendedAppointmentModel
  nextAppointment?: ExtendedAppointmentModel
}

export type RenderModalTitleParams = {
  appointmentType?: ListItemModel
  heading: string
}

export const handleContactDrawerClose = (setContactDrawerOpen: Dispatch<SetStateAction<boolean>>) => () => {
  setContactDrawerOpen(() => false)
}

export const handleOpenContactDrawer = (
  setAppState: Dispatch<SetStateAction<AppState>>,
  appointment: ExtendedAppointmentModel,
  contactDrawerType: ContactDrawerType,
) => () => {
  setAppState((currentState) => ({
    ...currentState,
    appointment,
    appointmentId: appointment.id ?? null,
    contactDrawerOpen: true,
    contactDrawerType,
  }))
}

export const AppointmentItems: FC<RenderIconItemsProps> = ({ appointment }) => {
  return (
    <>
      <PropertyItem appointment={appointment} />
      <AttendeeItem appointment={appointment} />
      <VendorItem appointment={appointment} />
    </>
  )
}
