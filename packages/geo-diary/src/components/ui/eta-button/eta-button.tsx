import React, { Dispatch, FC, memo, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ExtendedAppointmentModel } from '@/types/global'
import { NegotiatorModel } from '@reapit/foundations-ts-definitions'
import { cx } from 'linaria'
import { buttonPaddingSmall } from '../../pages/appointment/__styles__'
import { fetchDestinationInformation } from '../../../utils/map-utils'
import { AppState, useAppState } from '../../../core/app-state'

export type EtaButtonProps = {
  appointment: ExtendedAppointmentModel
}

export type HandleGetDurationParams = {
  setDuration: Dispatch<SetStateAction<google.maps.Duration | null>>
  appState: AppState
  appointment: ExtendedAppointmentModel
}

export const handleGetDuration = ({ setDuration, appointment, appState }: HandleGetDurationParams) => () => {
  const getDestinationInfo = async () => {
    const destination: google.maps.DistanceMatrixResponse = await fetchDestinationInformation({ appState, appointment })
    const duration = destination?.rows?.[0]?.elements?.[0]?.duration
    if (duration) {
      setDuration(duration)
    }
  }

  getDestinationInfo()
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
  const attendeesHaveMobilePhone = appointment.attendee?.contacts?.filter((attendee) => {
    return !!attendee.mobilePhone
  })
  return attendeesHaveMobilePhone?.[0]
}

export const EtaButton: FC<EtaButtonProps> = ({ appointment }) => {
  const [duration, setDuration] = useState<google.maps.Duration | null>(null)
  const { appState } = useAppState()
  const session = useReapitConnect(reapitConnectBrowserSession)
  const { currentLat, currentLng } = appState
  const userCode = session.connectSession?.loginIdentity.userCode || ''

  useEffect(handleGetDuration({ setDuration, appState, appointment }), [
    appointment,
    currentLat,
    currentLng,
    window.google,
  ])

  const negotiator = useMemo(getNegotiator({ appointment, userCode }), [appointment])
  const attendeeWithMobile = useMemo(getAttendeeHaveMobilePhone(appointment), [appointment])
  const href = `sms:${attendeeWithMobile?.mobilePhone}?&body=${`Hi ${attendeeWithMobile?.name ?? ''}, ${
    negotiator?.name ? `this is ${negotiator?.name}, ` : ''
  }I am on my way to you. I will be with you in approximately ${duration?.text}.`}`

  if (!attendeeWithMobile?.mobilePhone) {
    return null
  }

  return (
    <a href={href} className={cx(buttonPaddingSmall, 'button is-primary is-centered mr-0 mb-2')} data-test="eta-button">
      ETA Text
    </a>
  )
}

export default memo(EtaButton)
