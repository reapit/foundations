import React, { FC } from 'react'
import {
  CardListIcon,
  CardListItem,
  CardListItemTextPrimary,
  CardListItemTextSecondary,
  CardListItemTextWrap,
  elCardListItemExpanded,
  Icon,
} from '@reapit/elements'
import { useAppState } from '../../../core/app-state'
import { ExtendedAppointmentModel } from '../../../types/global'
import { handleOpenContactDrawer } from './appointment-items'
import { getShortAddress } from '../../../utils/formatting-utils'
import { ContactDrawerType } from '../contact-drawer'

export type PropertyItemProps = {
  appointment: ExtendedAppointmentModel
}

export const PropertyItem: FC<PropertyItemProps> = ({ appointment }) => {
  const { setAppState } = useAppState()
  const property = appointment?.property

  if (!appointment || !property) return null

  const address = getShortAddress(property)

  return (
    <CardListItem className={elCardListItemExpanded}>
      <CardListIcon>
        <Icon icon="property" intent="primary" />
      </CardListIcon>
      <CardListItemTextWrap
        onClick={handleOpenContactDrawer(setAppState, appointment, ContactDrawerType.PROPERTY, property.id ?? null)}
      >
        <CardListItemTextPrimary>Property</CardListItemTextPrimary>
        <CardListItemTextSecondary>{address}</CardListItemTextSecondary>
      </CardListItemTextWrap>
    </CardListItem>
  )
}
