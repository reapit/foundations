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

export type VendorItemProps = {
  appointment: ExtendedAppointmentModel
}

export const VendorItem: FC<VendorItemProps> = ({ appointment }) => {
  const { setAppState, appState } = useAppState()

  const { vendors } = appState

  if (!vendors.length) return null

  const vendorId = appointment.property?.selling?.vendorId
  const vendor = vendors.find((item) => item.id === vendorId)
  const vendorContactList = vendor?.related ?? []

  if (!vendorContactList.length) return null

  return (
    <>
      {vendorContactList.map((vendor: VendorLandlordRelatedModel) => {
        return (
          <CardListItem key={vendor.id} className={cx(elFadeIn, elCardListItemExpanded)}>
            <CardListIcon>
              <Icon icon="sale" intent="primary" />
            </CardListIcon>
            <CardListItemTextWrap
              onClick={handleOpenContactDrawer(setAppState, appointment, ContactDrawerType.VENDOR, vendor.id)}
            >
              <CardListItemTextPrimary>Vendor</CardListItemTextPrimary>
              <CardListItemTextSecondary>{vendor.name}</CardListItemTextSecondary>
            </CardListItemTextWrap>
          </CardListItem>
        )
      })}
    </>
  )
}
