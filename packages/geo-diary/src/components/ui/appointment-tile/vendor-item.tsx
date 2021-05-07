import React, { FC } from 'react'
import { Label, Icon } from '@reapit/elements/v3'
import { useAppState } from '../../../core/app-state'
import { handleOpenContactDrawer } from './appointment-items'
import { VendorRelatedModel } from '../../pages/appointment/appointment'
import { ExtendedAppointmentModel } from '../../../types/global'
import { FadeIn } from '@reapit/elements'
import { TileIconAnchorWrap, TileSectionContainer } from './__styles__/styles'

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
    <FadeIn>
      <TileSectionContainer>
        <Label>Vendors</Label>
        {vendorContactList.map((vendor: VendorRelatedModel) => {
          return (
            <TileIconAnchorWrap key={vendor.id}>
              <Icon icon="username" />
              <a onClick={handleOpenContactDrawer(setAppState, appointment, 'VENDOR', vendor.id)}>{vendor.name}</a>
            </TileIconAnchorWrap>
          )
        })}
      </TileSectionContainer>
    </FadeIn>
  )
}
