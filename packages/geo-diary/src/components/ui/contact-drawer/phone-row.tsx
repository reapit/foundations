import * as React from 'react'
import IconButton from '../icon-button'
import Grid, { Col } from '../grid'
import * as styles from './__styles__'
import { Label } from '@reapit/elements/v3'

export interface PhoneRowProps {
  label: string
  phoneNumber?: string
  showMobileActions?: boolean
}

const PhoneRow: React.FC<PhoneRowProps> = ({ label, phoneNumber, showMobileActions }: PhoneRowProps) => {
  const phoneNumberForWhatsapp = (number: string): string | false => {
    const cleaned = number.replace(/\+/g, '').replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\s/g, '')

    // Whatsapp needs to have a country code to load the new message screen
    // Here we naively assume all phone numbers are UK based numbers and should
    // use the 44 country code. If a phone number already has a country code
    // then the whatsapp button will not show. A future optimisation would be to
    // compare the first few digits against all known country codes and see if
    // already has one at the start of the number. In which case the number can
    // be returned as is.
    if (cleaned.startsWith('0')) {
      return cleaned.replace('0', '44')
    } else if (cleaned.startsWith('44')) {
      return cleaned
    } else {
      return false
    }
  }

  const showAnyActions = !!phoneNumber
  const whatsappNumber = phoneNumber && phoneNumberForWhatsapp(phoneNumber)
  const showWhatsapp = !!whatsappNumber

  return (
    <div className={styles.contactOptionRow}>
      <Grid>
        <Col span={8}>
          <Label>{label}</Label>
          <div className={styles.contactOptionValue}>{phoneNumber || 'No phone number found'}</div>
        </Col>
        <Col span={8}>
          {showAnyActions && (
            <div className={styles.contactOptionIcons}>
              {showMobileActions && phoneNumber && (
                <>
                  {showWhatsapp && (
                    <a href={`https://wa.me/${whatsappNumber}`}>
                      <IconButton icon="whatsapp" />
                    </a>
                  )}
                  <a href={`sms:${phoneNumber}`}>
                    <IconButton icon="sms" />
                  </a>
                </>
              )}
              <a href={`tel:${phoneNumber}`}>
                <IconButton icon="call" />
              </a>
            </div>
          )}
        </Col>
      </Grid>
    </div>
  )
}

export default PhoneRow
