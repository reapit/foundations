import React, { Dispatch, SetStateAction } from 'react'
import Drawer from '../drawer'

import { AppState, useAppState } from '../../../core/app-state'
import { AttendeeDrawer } from './attendee-drawer'
import { PropertyDrawer } from './property-drawer'
import { VendorDrawer } from './vendor-drawer'

export type ContactDrawerType = 'ATTENDEE' | 'PROPERTY' | 'VENDOR'

export const handleClose = (setAppState: Dispatch<SetStateAction<AppState>>) => () => {
  setAppState((currentState) => ({
    ...currentState,
    contactDrawerOpen: false,
  }))
}

export const getDrawerContent = (contactDrawerType: ContactDrawerType) => {
  switch (contactDrawerType) {
    case 'ATTENDEE':
      return <AttendeeDrawer />
    case 'PROPERTY':
      return <PropertyDrawer />
    case 'VENDOR':
      return <VendorDrawer />
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
