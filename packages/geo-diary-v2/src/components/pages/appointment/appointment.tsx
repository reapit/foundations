import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { History } from 'history'
import dayjs from 'dayjs'
import qs from 'query-string'
import { Loader, isMobile } from '@reapit/elements'
import { ExtendedAppointmentModel } from '@/types/global'
import GET_APPOINTMENTS from './get-appointments.graphql'
import { MobileLayout } from './mobile-layout'
import { useHistory, useLocation } from 'react-router-dom'
import { DesktopLayout } from './desktop-layout'
import { ROUTES } from '@/core/router'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

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
  includeConfirm: boolean
}

export const startAndEndTime = {
  today: {
    start: dayjs()
      .startOf('day')
      .utc(),
    end: dayjs()
      .endOf('day')
      .utc(),
  },
  tomorrow: {
    start: dayjs()
      .add(1, 'day')
      .startOf('day')
      .utc(),
    end: dayjs()
      .add(1, 'day')
      .endOf('day')
      .utc(),
  },
  weekView: {
    start: dayjs().startOf('day'),
    end: dayjs()
      .add(1, 'week')
      .subtract(1, 'day')
      .endOf('day')
      .utc(),
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

export type HandleUseEffectParams = {
  queryParams: qs.ParsedQuery<string>
  history: History
}

export const handleUseEffect = ({ queryParams, history }: HandleUseEffectParams) => () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const queryString = qs.stringify({
        ...queryParams,
        currentLat: position.coords.latitude,
        currentLng: position.coords.longitude,
      })
      history.push(`${ROUTES.APPOINTMENT}?${queryString}`)
    })
  }
}

export const Appointment: React.FC<AppointmentProps> = () => {
  const isMobileView = isMobile()
  const session = useReapitConnect(reapitConnectBrowserSession)
  const userCode = session.connectSession?.loginIdentity.userCode || ''
  const location = useLocation()
  const history = useHistory()
  const queryParams = qs.parse(location.search)
  const time = queryParams.time || 'today'
  const { start, end } = startAndEndTime[time]
  const { data, loading } = useQuery<AppointmentListQueryData, AppointmentListQueryVariables>(GET_APPOINTMENTS, {
    variables: {
      negotiatorId: [userCode],
      start: start,
      end: end,
      includeCancelled: true,
      includeConfirm: true,
    },
  })
  React.useEffect(handleUseEffect({ queryParams, history }), [])
  const appointmentSorted = React.useMemo(sortAppoinmentsByStartTime(data?.GetAppointments?._embedded || []), [
    data?.GetAppointments?._embedded,
  ])
  if (loading) {
    return <Loader />
  }
  if (isMobileView) {
    return <MobileLayout appointments={appointmentSorted} />
  }
  return <DesktopLayout appointments={appointmentSorted} />
}

export default React.memo(Appointment)
