import React, { FC } from 'react'
import EmailRow from './email-row'
import PhoneRow from './phone-row'
import { DrawerHeader } from '../drawer'
import { useAppState } from '../../../core/app-state'
import { handleClose } from './index'

export const VendorDrawer: FC = () => {
  const { appState, setAppState } = useAppState()
  const { appointment, vendors, contactId } = appState

  if (!vendors.length || !contactId) return null

  const vendorId = appointment?.property?.selling?.vendorId
  const vendor = vendors.find((item) => item.id === vendorId)
  const vendorContactList = vendor?.related ?? []
  const vendorContact = vendorContactList.find((item) => item.id === contactId)

  if (!vendorContact) return null

  const { name, mobilePhone, homePhone, workPhone, email } = vendorContact
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
