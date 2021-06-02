import React, { FC } from 'react'
import IconButton from '../icon-button'
import Grid, { Col } from '../grid'
import * as styles from './__styles__'
import { Label } from '@reapit/elements/v3'
import { handlePwaNavigate, usePwaNavigate } from '../../../utils/pwa-navigate'

interface AmlCheckContentProps {
  contactId: string
  name: string
}

export const AmlCheckRow: FC<AmlCheckContentProps> = ({ contactId, name }) => {
  const amlAppUrl = `${window.reapit.config.amlAppUrl}/${contactId}`
  const { setPwaNavState } = usePwaNavigate()
  const pwaNavHandler = handlePwaNavigate(setPwaNavState, amlAppUrl)
  return (
    <div className={styles.contactOptionRow}>
      <Grid>
        <Col span={8}>
          <Label>AML Check</Label>
          <div className={styles.contactOptionValue}>{name || ''}</div>
        </Col>
        <Col span={8}>
          <div className={styles.contactOptionIcons}>
            <a onClick={pwaNavHandler}>
              <IconButton icon="edit" />
            </a>
          </div>
        </Col>
      </Grid>
    </div>
  )
}
