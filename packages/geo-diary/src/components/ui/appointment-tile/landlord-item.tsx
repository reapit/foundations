import React, { FC } from 'react'
import {
  Icon,
  CardListItem,
  CardListIcon,
  CardListItemTextPrimary,
  CardListItemTextSecondary,
  CardListItemTextWrap,
  elCardListItemExpanded,
  elFadeIn,
} from '@reapit/elements'
import { useAppState } from '../../../core/app-state'
import { handleOpenContactDrawer } from './appointment-items'
import { VendorLandlordRelatedModel } from '../../pages/appointment/appointment'
import { ExtendedAppointmentModel } from '../../../types/global'
import { ContactDrawerType } from '../contact-drawer'
import { cx } from '@linaria/core'

export type LandlordItemProps = {
  appointment: ExtendedAppointmentModel
}

export const LandlordItem: FC<LandlordItemProps> = ({ appointment }) => {
  const { setAppState, appState } = useAppState()

  const { landlords } = appState

  if (!landlords.length) return null

  const landlordId = appointment.property?.letting?.landlordId
  const landlord = landlords.find((item) => item.id === landlordId)
  const landlordContactList = landlord?.related ?? []

  if (!landlordContactList.length) return null

  return (
    <>
      {landlordContactList.map((landlord: VendorLandlordRelatedModel) => (
        <CardListItem key={landlord.id} className={cx(elFadeIn, elCardListItemExpanded)}>
          <CardListIcon>
            <Icon icon="landlordInfographic" />
          </CardListIcon>
          <CardListItemTextWrap
            onClick={handleOpenContactDrawer(setAppState, appointment, ContactDrawerType.LANDLORD, landlord.id)}
          >
            <CardListItemTextPrimary>Landlord</CardListItemTextPrimary>
            <CardListItemTextSecondary>{landlord.name}</CardListItemTextSecondary>
          </CardListItemTextWrap>
        </CardListItem>
      ))}
    </>
  )
}
