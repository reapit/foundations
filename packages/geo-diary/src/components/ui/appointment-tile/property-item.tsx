import React, { FC } from 'react'
import { Label } from '@reapit/elements/v3'
import { useAppState } from '../../../core/app-state'
import { ExtendedAppointmentModel } from '../../../types/global'
import { handleOpenContactDrawer } from './appointment-items'
import { getShortAddress } from '../../../utils/formatting-utils'
import { BsHouse } from 'react-icons/bs'
import { TileIconAnchorWrap, TileSectionContainer } from './__styles__/styles'

export type PropertyItemProps = {
  appointment: ExtendedAppointmentModel
}

export const PropertyItem: FC<PropertyItemProps> = ({ appointment }) => {
  const { setAppState } = useAppState()
  const property = appointment?.property

  if (!appointment || !property) return null

  const address = getShortAddress(property)

  return (
    <TileSectionContainer>
      <Label>Property</Label>
      <TileIconAnchorWrap>
        <BsHouse />
        <a onClick={handleOpenContactDrawer(setAppState, appointment, 'PROPERTY', property.id ?? null)}>{address}</a>
      </TileIconAnchorWrap>
    </TileSectionContainer>
  )
}
