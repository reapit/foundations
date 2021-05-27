import React, { FC } from 'react'
import { Label, Icon } from '@reapit/elements/v3'
import { useAppState } from '../../../core/app-state'
import { ExtendedAppointmentModel } from '../../../types/global'
import { handleOpenContactDrawer } from './appointment-items'
import { TileIconAnchorWrap, TileSectionContainer } from './__styles__/styles'
import { ContactDrawerType } from '../contact-drawer'

export type AttendeeItemProps = {
  appointment: ExtendedAppointmentModel
}

export const AttendeeItem: FC<AttendeeItemProps> = ({ appointment }) => {
  const { setAppState } = useAppState()
  const contacts = appointment?.attendee?.contacts ?? []

  if (!appointment || !contacts.length) return null

  return (
    <TileSectionContainer>
      <Label>Attendees</Label>
      {contacts.map((contact) => {
        const { name, id } = contact

        return (
          <TileIconAnchorWrap key={id}>
            <Icon icon="username" />
            <a
              className="v-align-middle"
              onClick={handleOpenContactDrawer(setAppState, appointment, ContactDrawerType.ATTENDEE, id ?? null)}
            >
              {name}
            </a>
          </TileIconAnchorWrap>
        )
      })}
    </TileSectionContainer>
  )
}
