import React, { FC, memo, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import dayjs from 'dayjs'
import { isMobile } from '@reapit/elements'
import { ExtendedAppointmentModel } from '@/types/global'
import GET_APPOINTMENTS from '../../../graphql/queries/get-appointments.graphql'
import { MobileLayout } from './mobile-layout'
import { DesktopLayout } from './desktop-layout'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { useAppState } from '../../../core/app-state'
import { DATE_TIME_FORMAT } from '../../../../../elements/src/utils/datetime/datetime'

export type AppointmentProps = {}

export type AppointmentListQueryData = {
  GetAppointments: {
    pageNumber: number
    pageSize: number
    pageCount: number
    totalCount: number
    _links: string
    _embedded: ExtendedAppointmentModel[]
  }
}

export type AppointmentListQueryVariables = {
  negotiatorId: string[]
  start: string
  end: string
  includeCancelled: boolean
  includeUnconfirmed: boolean
  embed: string
}

export const startAndEndTime = {
  TODAY: {
    start: dayjs().startOf('day').format(DATE_TIME_FORMAT.RFC3339),
    end: dayjs().endOf('day').format(DATE_TIME_FORMAT.RFC3339),
  },
  TOMORROW: {
    start: dayjs().add(1, 'day').startOf('day').format(DATE_TIME_FORMAT.RFC3339),
    end: dayjs().add(1, 'day').endOf('day').format(DATE_TIME_FORMAT.RFC3339),
  },
  WEEK: {
    start: dayjs().startOf('day').format(DATE_TIME_FORMAT.RFC3339),
    end: dayjs().add(1, 'week').subtract(1, 'day').endOf('day').format(DATE_TIME_FORMAT.RFC3339),
  },
}

export const sortAppoinmentsByStartTime = (
  appointments: ExtendedAppointmentModel[],
) => (): ExtendedAppointmentModel[] => {
  const sortedAppoinments = appointments.sort((a, b) => {
    const aStart = dayjs(a.start)
    const bStart = dayjs(b.start)

    if (aStart.isBefore(bStart)) {
      return -1
    }

    if (aStart.isAfter(bStart)) {
      return 1
    }

    return 0
  })

  return sortedAppoinments
}

export const Appointment: FC<AppointmentProps> = () => {
  const isMobileView = isMobile()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appState } = useAppState()
  const { time } = appState
  const userCode = connectSession?.loginIdentity.userCode ?? ''
  const { start, end } = startAndEndTime[time]

  const { data, loading } = useQuery<AppointmentListQueryData, AppointmentListQueryVariables>(GET_APPOINTMENTS, {
    variables: {
      negotiatorId: [userCode],
      start,
      end,
      includeCancelled: true,
      includeUnconfirmed: true,
      embed: 'offices',
    },
    skip: !userCode,
  })

  const appointmentSorted = useMemo(sortAppoinmentsByStartTime(data?.GetAppointments?._embedded || []), [
    data?.GetAppointments?._embedded,
  ])

  if (isMobileView) {
    return <MobileLayout appointments={appointmentSorted} loading={loading} />
  }
  return <DesktopLayout appointments={appointmentSorted} loading={loading} />
}

export default memo(Appointment)
