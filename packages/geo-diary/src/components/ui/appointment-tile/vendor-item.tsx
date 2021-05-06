import React, { FC } from 'react'
import { Label, Icon } from '@reapit/elements/v3'
import { useAppState } from '../../../core/app-state'
import { handleOpenContactDrawer } from './appointment-items'
import { VendorRelatedModel } from '../../pages/appointment/appointment'
import { ExtendedAppointmentModel } from '../../../types/global'
import { FadeIn } from '@reapit/elements'

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
      <Label>Vendors</Label>
      {vendorContactList.map((vendor: VendorRelatedModel) => {
        return (
          <div className="flex py-1" key={vendor.id}>
            <Icon className="mr-4 v-align-middle" icon="username" />
            <a className="v-align-middle" onClick={handleOpenContactDrawer(setAppState, appointment, 'VENDOR')}>
              {vendor.name}
            </a>
          </div>
        )
      })}
    </FadeIn>
  )
}
