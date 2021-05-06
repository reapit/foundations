import React, { FC } from 'react'
import EmailRow from './email-row'
import PhoneRow from './phone-row'
import Tag from '../tag'
import * as styles from './__styles__'
import { cx } from 'linaria'
import { DrawerHeader } from '../drawer'
import { useAppState } from '../../../core/app-state'
import { handleClose } from './index'

export const VendorDrawer: FC = () => {
  const { appState, setAppState } = useAppState()
  const { appointment, vendors } = appState

  if (!vendors.length) return null

  const vendorId = appointment?.property?.selling?.vendorId
  const vendor = vendors.find((item) => item.id === vendorId)
  const vendorContactList = vendor?.related ?? []

  if (!vendorContactList.length) return null

  return (
    <>
      {vendorContactList.map((contact, index) => {
        const { name, mobilePhone, homePhone, workPhone, email, id } = contact
        const noPhoneNumbers = !mobilePhone && !homePhone && !workPhone

        return (
          <div key={id}>
            {index === 0 ? (
              <DrawerHeader title={`Contact ${name}`} handleClose={handleClose(setAppState)} />
            ) : (
              <h2 className={cx(styles.contactName, styles.extraContactName)}>
                <span>{name}</span>
                <Tag label="Additional contact" />
              </h2>
            )}
            {noPhoneNumbers && <PhoneRow label="Phone" />}
            {mobilePhone && <PhoneRow label="Mobile" phoneNumber={mobilePhone} showMobileActions />}
            {homePhone && <PhoneRow label="Home" phoneNumber={homePhone} />}
            {workPhone && <PhoneRow label="Work" phoneNumber={workPhone} />}
            <EmailRow label="Email" email={email} />
          </div>
        )
      })}
    </>
  )
}
