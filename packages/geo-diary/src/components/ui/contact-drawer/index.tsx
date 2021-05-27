import React, { Dispatch, SetStateAction } from 'react'
import Drawer from '../drawer'

import { AppState, useAppState } from '../../../core/app-state'
import { AttendeeDrawer } from './attendee-drawer'
import { PropertyDrawer } from './property-drawer'
import { VendorDrawer } from './vendor-drawer'
import { LandlordDrawer } from './landlord-drawer'

export enum ContactDrawerType {
  'ATTENDEE',
  'PROPERTY',
  'VENDOR',
  'LANDLORD',
}

export const handleClose = (setAppState: Dispatch<SetStateAction<AppState>>) => () => {
  setAppState((currentState) => ({
    ...currentState,
    contactDrawerOpen: false,
  }))
}

export const getDrawerContent = (contactDrawerType: ContactDrawerType) => {
  switch (contactDrawerType) {
    case ContactDrawerType.ATTENDEE:
      return <AttendeeDrawer />
    case ContactDrawerType.PROPERTY:
      return <PropertyDrawer />
    case ContactDrawerType.VENDOR:
      return <VendorDrawer />
    case ContactDrawerType.LANDLORD:
      return <LandlordDrawer />
    default:
      return null
  }
}

const ContactDrawer: React.FC = () => {
  const { appState, setAppState } = useAppState()
  const { contactDrawerOpen, contactDrawerType } = appState

  return (
    <Drawer isOpen={contactDrawerOpen} handleClose={handleClose(setAppState)}>
      {getDrawerContent(contactDrawerType)}
    </Drawer>
  )
}

export default ContactDrawer
