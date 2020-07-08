import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import dayjs from 'dayjs'
import qs from 'query-string'
import { Loader } from '@reapit/elements'
import { ExtendedAppointmentModel } from '@/types/global'
import GET_APPOINTMENTS from './get-appointments.graphql'
import { MobileLayout } from './mobile-layout'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '@/context'

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

export const Appointment: React.FC<AppointmentProps> = () => {
  const { loginSession } = React.useContext(AuthContext)
  const userCode = loginSession?.loginIdentity?.userCode || ''
  const location = useLocation()
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
  if (loading) {
    return <Loader />
  }
  return <MobileLayout appointments={data?.GetAppointments?._embedded || []} />
}

export default Appointment
