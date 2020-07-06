import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Loader } from '@reapit/elements'
import { AppointmentModel } from '@reapit/foundations-ts-definitions'
import GET_APPOINTMENTS from './get-appointments.graphql'
import { MobileLayout } from './mobile-layout'

export type AppointmentProps = {}

export type AppointmentListQueryData = {
  GetAppointments: {
    pageNumber: number
    pageSize: number
    pageCount: number
    totalCount: number
    _links: string
    _embedded: AppointmentModel[]
  }
}

export type AppointmentListQueryVariables = {
  negotiatorId: string[]
  start: string
  end: string
  includeCancelled: boolean
  includeConfirm: boolean
}

export const Appointment: React.FC<AppointmentProps> = () => {
  const { data, loading } = useQuery<AppointmentListQueryData, AppointmentListQueryVariables>(GET_APPOINTMENTS, {
    variables: {
      negotiatorId: [],
      start: '',
      end: '',
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
