import React, { FC } from 'react'
import EmailRow from './email-row'
import PhoneRow from './phone-row'
import { DrawerHeader } from '../drawer'
import { useAppState } from '../../../core/app-state'
import { handleClose } from './index'
import EtaTextRow from './eta-text-row'

export const AttendeeDrawer: FC = () => {
  const { appState, setAppState } = useAppState()
  const { appointment, contactId } = appState
  const contacts = appointment?.attendee?.contacts ?? []
  const contact = contacts.find((item) => item.id === contactId)

  if (!contact) return null

  const { name, mobilePhone, homePhone, workPhone, email } = contact
  const noPhoneNumbers = !mobilePhone && !homePhone && !workPhone

  return (
    <>
      <DrawerHeader title={name ?? 'Unknown Contact'} handleClose={handleClose(setAppState)} />
      {noPhoneNumbers && <PhoneRow label="Phone" />}
      {mobilePhone && <PhoneRow label="Mobile" phoneNumber={mobilePhone} showMobileActions />}
      {mobilePhone && <EtaTextRow phoneNumber={mobilePhone} name={name} />}
      {homePhone && <PhoneRow label="Home" phoneNumber={homePhone} />}
      {workPhone && <PhoneRow label="Work" phoneNumber={workPhone} />}
      <EmailRow label="Email" email={email} />
    </>
  )
}
