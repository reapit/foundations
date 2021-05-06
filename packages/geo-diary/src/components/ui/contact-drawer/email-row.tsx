import * as React from 'react'
import IconButton from '../icon-button'
import Grid, { Col } from '../grid'
import * as styles from './__styles__'

export interface EmailRowProps {
  label: string
  email?: string
}

const EmailRow: React.FC<EmailRowProps> = ({ label, email }: EmailRowProps) => {
  return (
    <div className={styles.contactOptionRow}>
      <Grid>
        <Col span={10}>
          <div className={styles.contactOptionLabel}>{label}</div>
          <div className={styles.contactOptionValue}>{email || 'No email found'}</div>
        </Col>
        <Col span={6}>
          {email && (
            <div className={styles.contactOptionIcons}>
              <a href={`mailto:${email}`}>
                <IconButton icon="email" />
              </a>
            </div>
          )}
        </Col>
      </Grid>
    </div>
  )
}

export default EmailRow
