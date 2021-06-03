import React, { useMemo } from 'react'
import IconButton from '../icon-button'
import Grid, { Col } from '../grid'
import * as styles from './__styles__'
import { ExtendedAppointmentModel } from '../../../types/global'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { useAppState } from '../../../core/app-state'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Label } from '@reapit/elements/v3'

export interface EtaTextRowProps {
  phoneNumber?: string
  name?: string
}

export type GetNegotiatorParams = {
  appointment: ExtendedAppointmentModel | null
  userCode?: string | null
}

export const getNegotiator = ({ appointment, userCode }: GetNegotiatorParams) => () => {
  if (!appointment || !userCode) return null
  return appointment?.negotiators?.find((item: NegotiatorModel) => {
    return item.id === userCode
  })
}

const EtaTextRow: React.FC<EtaTextRowProps> = ({ phoneNumber, name }: EtaTextRowProps) => {
  const { appState } = useAppState()
  const session = useReapitConnect(reapitConnectBrowserSession)
  const userCode = session.connectSession?.loginIdentity.userCode
  const orgName = session.connectSession?.loginIdentity.orgName
  const { appointment, routeInformation } = appState
  const negotiator = useMemo(getNegotiator({ appointment, userCode }), [appointment, userCode])

  if (!phoneNumber) return null

  const customerName = name ? ` ${name}` : ''
  const negotiatorName = negotiator?.name ?? ''
  const negotiatorCompany = orgName ? ` from ${orgName} ` : ''
  const duration = routeInformation?.duration ? `in approximately ${routeInformation?.duration.text}.` : 'shortly.'

  const href = `sms:${phoneNumber}?&body=Hi${customerName}, this is ${negotiatorName}${negotiatorCompany}, I will be with you ${duration}`

  return (
    <div className={styles.contactOptionRow}>
      <Grid>
        <Col span={8}>
          <Label>Send ETA Text</Label>
          <div className={styles.contactOptionValue}>{phoneNumber || 'No phone number found'}</div>
        </Col>
        <Col span={8}>
          <div className={styles.contactOptionIcons}>
            <a href={href}>
              <IconButton icon="sms" />
            </a>
          </div>
        </Col>
      </Grid>
    </div>
  )
}

export default EtaTextRow
