import React, { FC, ReactNode } from 'react'
import { Label } from '@reapit/elements/v3'
import Grid, { Col } from '../grid'
import * as styles from './__styles__'

export interface TextRowProps {
  label: string
  content: ReactNode
}

const TextRow: FC<TextRowProps> = ({ content, label }: TextRowProps) => {
  return (
    <div className={styles.contactOptionRow}>
      <Grid>
        <Col span={16}>
          <Label>{label}</Label>
        </Col>
        <Col span={16}>{content}</Col>
      </Grid>
    </div>
  )
}

export default TextRow
