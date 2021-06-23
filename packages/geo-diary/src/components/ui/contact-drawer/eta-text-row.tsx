import React from 'react'
import Grid, { Col } from '../grid'
import * as styles from './__styles__'
import { ExtendedAppointmentModel } from '../../../types/global'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { AppState, AppTravelMode, useAppState } from '../../../core/app-state'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Label } from '@reapit/elements'
import { handleGetRouteInfo } from '../../../utils/map-utils'
import { MdDriveEta } from 'react-icons/md'
import { FaWalking } from 'react-icons/fa'
import { FaIconWrap } from './__styles__/index'

export interface EtaTextRowProps {
  phoneNumber?: string
  name?: string
}

export type GetNegotiatorParams = {
  appointment: ExtendedAppointmentModel | null
  userCode?: string | null
}

export const getNegotiator = ({ appointment, userCode }: GetNegotiatorParams) => {
  if (!appointment || !userCode) return null
  return appointment?.negotiators?.find((item: NegotiatorModel) => {
    return item.id === userCode
  })
}

export const handleGenerateUserText = (
  appState: AppState,
  session: ReapitConnectSession | null,
  travelMode: AppTravelMode,
  name?: string,
  phoneNumber?: string,
) => async () => {
  const { appointment } = appState
  const routeInformation = await handleGetRouteInfo(appState, travelMode)
  const userCode = session?.loginIdentity.userCode
  const orgName = session?.loginIdentity.orgName
  const negotiator = getNegotiator({ appointment, userCode })
  const customerName = name ? ` ${name}` : ''
  const negotiatorName = negotiator?.name ?? ''
  const negotiatorCompany = orgName ? ` from ${orgName}` : ''
  const duration = routeInformation?.duration ? `in approximately ${routeInformation?.duration.text}.` : 'shortly.'

  window.location.href = `sms:${phoneNumber}?&body=Hi${customerName}, this is ${negotiatorName}${negotiatorCompany}, I will be with you ${duration}`
}

const EtaTextRow: React.FC<EtaTextRowProps> = ({ phoneNumber, name }: EtaTextRowProps) => {
  const { appState } = useAppState()

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  if (!phoneNumber || !connectSession) return null

  return (
    <div className={styles.contactOptionRow}>
      <Grid>
        <Col span={8}>
          <Label>Send ETA Text</Label>
          <div className={styles.contactOptionValue}>{phoneNumber || 'No phone number found'}</div>
        </Col>
        <Col span={8}>
          <div className={styles.contactOptionIcons}>
            <a onClick={handleGenerateUserText(appState, connectSession, 'DRIVING', name, phoneNumber)}>
              <FaIconWrap>
                <MdDriveEta />
              </FaIconWrap>
            </a>
            <a onClick={handleGenerateUserText(appState, connectSession, 'WALKING', name, phoneNumber)}>
              <FaIconWrap>
                <FaWalking />
              </FaIconWrap>
            </a>
          </div>
        </Col>
      </Grid>
    </div>
  )
}

export default EtaTextRow
