import React, { FC } from 'react'
import { Label } from '@reapit/elements/v3'
import { useAppState } from '../../../core/app-state'
import { ExtendedAppointmentModel } from '../../../types/global'
import { handleOpenContactDrawer } from './appointment-items'
import { getShortAddress } from '../../../utils/formatting-utils'
import { BsHouse } from 'react-icons/bs'

export type PropertyItemProps = {
  appointment: ExtendedAppointmentModel
}

export const PropertyItem: FC<PropertyItemProps> = ({ appointment }) => {
  const { setAppState } = useAppState()
  const property = appointment?.property

  if (!appointment || !property) return null

  const address = getShortAddress(property)

  return (
    <>
      <Label>Property</Label>
      <div className="flex py-1">
        <BsHouse className="mr-4 v-align-middle" />
        <a className="v-align-middle" onClick={handleOpenContactDrawer(setAppState, appointment, 'PROPERTY')}>
          {address}
        </a>
      </div>
    </>
  )
}
