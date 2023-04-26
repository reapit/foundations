import React, { FC } from 'react'
import IconButton from '../icon-button'
import Grid, { Col } from '../grid'
import * as styles from './__styles__'
import { Label } from '@reapit/elements'
import { isDemo } from '@reapit/utils-react'

interface AmlCheckContentProps {
  contactId: string
  name: string
}

export const AmlCheckRow: FC<AmlCheckContentProps> = ({ contactId, name }) => {
  const demoQuery = isDemo() ? '/?demo=true' : ''
  const amlAppUrl = `${process.env.amlAppUrl}/${contactId}${demoQuery}`
  return (
    <div className={styles.contactOptionRow}>
      <Grid>
        <Col span={8}>
          <Label>AML Check</Label>
          <div className={styles.contactOptionValue}>{name || ''}</div>
        </Col>
        <Col span={8}>
          <div className={styles.contactOptionIcons}>
            <a href={amlAppUrl}>
              <IconButton icon="edit" />
            </a>
          </div>
        </Col>
      </Grid>
    </div>
  )
}
