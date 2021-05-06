import * as React from 'react'
import { cx } from 'linaria'
import Drawer, { DrawerHeader } from '../drawer'
import EmailRow from './email-row'
import PhoneRow from './phone-row'
import Tag from '../tag'
import { VendorModel } from '@reapit/foundations-ts-definitions'
import * as styles from './__styles__'

export interface IContactDrawerProps {
  isOpen: boolean
  handleClose: () => void
  contacts?: VendorModel['related']
}

const ContactDrawer: React.FC<IContactDrawerProps> = ({ contacts = [], isOpen, handleClose }: IContactDrawerProps) => {
  console.log(contacts)
  return (
    <Drawer isOpen={isOpen} handleClose={handleClose}>
      {contacts.map((contact, index) => {
        const { name, mobilePhone, homePhone, workPhone, email } = contact
        const noPhoneNumbers = !mobilePhone && !homePhone && !workPhone

        return (
          <>
            {index === 0 ? (
              <DrawerHeader title={`Reach out to ${name}`} handleClose={handleClose} />
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
          </>
        )
      })}
    </Drawer>
  )
}

export default ContactDrawer
