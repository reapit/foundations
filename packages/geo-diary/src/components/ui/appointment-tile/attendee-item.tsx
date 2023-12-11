import React, { FC } from 'react'
import {
  Icon,
  CardListIcon,
  CardListItem,
  CardListItemTextPrimary,
  CardListItemTextSecondary,
  CardListItemTextWrap,
  elCardListItemExpanded,
} from '@reapit/elements'
import { useAppState } from '../../../core/app-state'
import { ExtendedAppointmentModel } from '../../../types/global'
import { handleOpenContactDrawer } from './appointment-items'
import { ContactDrawerType } from '../contact-drawer'

export type AttendeeItemProps = {
  appointment: ExtendedAppointmentModel
}

export const AttendeeItem: FC<AttendeeItemProps> = ({ appointment }) => {
  const { setAppState } = useAppState()
  const contacts = appointment?.attendee?.contacts ?? []

  if (!appointment || !contacts.length) return null

  return (
    <>
      {contacts.map((contact) => {
        const { name, id } = contact

        return (
          <CardListItem key={id} className={elCardListItemExpanded}>
            <CardListIcon>
              <Icon icon="contacts" intent="primary" />
            </CardListIcon>
            <CardListItemTextWrap
              onClick={handleOpenContactDrawer(setAppState, appointment, ContactDrawerType.ATTENDEE, id ?? null)}
            >
              <CardListItemTextPrimary>Attendee</CardListItemTextPrimary>
              <CardListItemTextSecondary>{name}</CardListItemTextSecondary>
            </CardListItemTextWrap>
          </CardListItem>
        )
      })}
    </>
  )
}
