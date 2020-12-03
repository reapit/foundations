import React from 'react'
import qs from 'query-string'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ExtendedAppointmentModel } from '@/types/global'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { fetchDestinationInformation } from './api'
import { cx } from 'linaria'
import { buttonPaddingSmall } from '../../pages/appointment/__styles__'

export type Duration = { text: string; value: number }

export type HandleUseEffectParams = {
  setDuration: React.Dispatch<React.SetStateAction<Duration | null>>
  queryParams: qs.ParsedQuery<string>
  appointment: ExtendedAppointmentModel
}

export const handleUseEffect = ({ setDuration, queryParams, appointment }: HandleUseEffectParams) => () => {
  fetchDestinationInformation({ queryParams, appointment }).then((response: any) => {
    setDuration(response?.rows?.[0]?.elements?.[0]?.duration)
  })
}

export type GetNegotiatorParams = {
  appointment: ExtendedAppointmentModel
  userCode: string
}

export const getNegotiator = ({ appointment, userCode }: GetNegotiatorParams) => () => {
  return appointment?.negotiators?.find((item: NegotiatorModel) => {
    return item.id === userCode
  })
}

export const getAttendeeHaveMobilePhone = (appointment: ExtendedAppointmentModel) => () => {
  const attendeesHaveMobilePhone = appointment.attendee?.contacts?.filter(attendee => {
    return !!attendee.mobilePhone
  })
  return attendeesHaveMobilePhone?.[0]
}

export type ETAButtonProps = {
  queryParams: qs.ParsedQuery<string>
  appointment: ExtendedAppointmentModel
}

export const ETAButton: React.FC<ETAButtonProps> = ({ appointment, queryParams }) => {
  const [duration, setDuration] = React.useState<Duration | null>(null)
  const session = useReapitConnect(reapitConnectBrowserSession)
  const userCode = session.connectSession?.loginIdentity.userCode || ''
  React.useEffect(handleUseEffect({ setDuration, queryParams, appointment }), [
    appointment,
    queryParams.currentLat,
    queryParams.currentLng,
    window.google,
  ])
  const negotiator = React.useMemo(getNegotiator({ appointment, userCode }), [appointment])
  const attendeeWithMobile = React.useMemo(getAttendeeHaveMobilePhone(appointment), [appointment])
  const href = `sms:${attendeeWithMobile?.mobilePhone}?&body=${`Hi ${name}, ${
    negotiator?.name ? `this is ${negotiator?.name}, ` : ''
  }I am on my way to you. I will be with you in approximately ${duration?.text}.`}`
  if (!attendeeWithMobile?.mobilePhone) {
    return null
  }
  return (
    <a href={href} className={cx(buttonPaddingSmall, 'button is-info is-centered mr-0 mb-2')} data-test="eta-button">
      ETA Text
    </a>
  )
}

export default React.memo(ETAButton)
