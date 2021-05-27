import React, { FC } from 'react'
import { Label, Icon } from '@reapit/elements/v3'
import { useAppState } from '../../../core/app-state'
import { handleOpenContactDrawer } from './appointment-items'
import { VendorLandlordRelatedModel } from '../../pages/appointment/appointment'
import { ExtendedAppointmentModel } from '../../../types/global'
import { FadeIn } from '@reapit/elements'
import { TileIconAnchorWrap, TileSectionContainer } from './__styles__/styles'

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
    <FadeIn>
      <TileSectionContainer>
        <Label>Landlords</Label>
        {landlordContactList.map((landlord: VendorLandlordRelatedModel) => {
          return (
            <TileIconAnchorWrap key={landlord.id}>
              <Icon icon="username" />
              <a onClick={handleOpenContactDrawer(setAppState, appointment, 'LANDLORD', landlord.id)}>
                {landlord.name}
              </a>
            </TileIconAnchorWrap>
          )
        })}
      </TileSectionContainer>
    </FadeIn>
  )
}
