import React, { FC } from 'react'
import EmailRow from './email-row'
import PhoneRow from './phone-row'
import { DrawerHeader } from '../drawer'
import { useAppState } from '../../../core/app-state'
import { handleClose } from './index'

export const LandlordDrawer: FC = () => {
  const { appState, setAppState } = useAppState()
  const { appointment, landlords, contactId } = appState

  if (!landlords.length || !contactId) return null

  const landlordId = appointment?.property?.letting?.landlordId
  const landlord = landlords.find((item) => item.id === landlordId)
  const landlordContactList = landlord?.related ?? []
  const landlordContact = landlordContactList.find((item) => item.id === contactId)

  if (!landlordContact) return null

  const { name, mobilePhone, homePhone, workPhone, email } = landlordContact
  const noPhoneNumbers = !mobilePhone && !homePhone && !workPhone
  return (
    <>
      <DrawerHeader title={name ?? 'Unknown Contact'} handleClose={handleClose(setAppState)} />
      {noPhoneNumbers && <PhoneRow label="Phone" />}
      {mobilePhone && <PhoneRow label="Mobile" phoneNumber={mobilePhone} showMobileActions />}
      {homePhone && <PhoneRow label="Home" phoneNumber={homePhone} />}
      {workPhone && <PhoneRow label="Work" phoneNumber={workPhone} />}
      <EmailRow label="Email" email={email} />
    </>
  )
}
