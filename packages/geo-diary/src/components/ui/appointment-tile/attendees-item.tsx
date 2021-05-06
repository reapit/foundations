import React, { FC } from 'react'
import { Label, Icon } from '@reapit/elements/v3'
import { useAppState } from '../../../core/app-state'
import { ExtendedAppointmentModel } from '../../../types/global'
import { handleOpenContactDrawer } from './appointment-items'

export type AttendeeItemProps = {
  appointment: ExtendedAppointmentModel
}

export const AttendeeItem: FC<AttendeeItemProps> = ({ appointment }) => {
  const { setAppState } = useAppState()
  const contacts = appointment?.attendee?.contacts ?? []

  if (!appointment || !contacts.length) return null

  return (
    <>
      <Label>Attendees</Label>
      {contacts.map((contact) => {
        const { name, id } = contact

        return (
          <div className="flex py-1" key={id}>
            <Icon className="mr-4 v-align-middle" icon="username" />
            <a className="v-align-middle" onClick={handleOpenContactDrawer(setAppState, appointment, 'ATTENDEE')}>
              {name}
            </a>
          </div>
        )
      })}
    </>
  )
}
