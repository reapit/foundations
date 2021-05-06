import React, { FC, memo, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/react-hooks'
import dayjs from 'dayjs'
import { FadeIn } from '@reapit/elements'
import { ExtendedAppointmentModel } from '@/types/global'
import GET_APPOINTMENTS from '../../../graphql/queries/get-appointments.graphql'
import GET_VENDORS from '../../../graphql/queries/get-vendors.graphql'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { useAppState } from '../../../core/app-state'
import { DATE_TIME_FORMAT } from '../../../../../elements/src/utils/datetime/datetime'
import { AppointmentTime } from '../../ui/appointment-time/appointment-time'
import { TravelMode } from '../../ui/travel-mode/travel-mode'
import { cx } from 'linaria'
import {
  AppoinmentContainer,
  ControlsContainer,
  MapContainer,
  mobileAppointmentsHidden,
  mobileAppointmentsShow,
} from './__styles__'
import AppointmentList from '../../ui/appointment-list'
import { Loader } from '@reapit/elements/v3'
import GoogleMapComponent from '@/components/ui/map'
import ErrorBoundary from '../../../core/error-boundary'
import { MyLocation } from '../../ui/my-location/my-location'

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

export type VendorRelatedModel = {
  id: string
  name?: string
  type?: string
  homePhone?: string
  workPhone?: string
  mobilePhone?: string
  email?: string
}

export type VendorModel = {
  id: string
  related: VendorRelatedModel[]
}

export type VendorsQueryData = {
  GetVendors: {
    _embedded: VendorModel[]
  }
}

export type VendorsQueryVariables = {
  id: string[]
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

export const getVendorIds = (appointments: ExtendedAppointmentModel[]) => (): string[] =>
  appointments
    .map((appointment) => appointment?.property?.selling?.vendorId)
    .filter((vendorId) => !!vendorId) as string[]

export const Appointment: FC<AppointmentProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appState, setAppState } = useAppState()
  const { time } = appState
  const userCode = connectSession?.loginIdentity.userCode ?? ''
  const { start, end } = startAndEndTime[time]
  const { tab } = appState

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

  const vendorIds = useMemo(getVendorIds(data?.GetAppointments?._embedded || []), [data?.GetAppointments?._embedded])

  const { data: vendors } = useQuery<VendorsQueryData, VendorsQueryVariables>(GET_VENDORS, {
    variables: {
      id: vendorIds,
    },
    skip: !vendorIds.length,
  })

  useEffect(() => {
    if (vendors?.GetVendors._embedded.length) {
      setAppState((currentState) => ({
        ...currentState,
        vendors: vendors.GetVendors._embedded,
      }))
    }
  }, [vendors])

  const appointmentSorted = useMemo(sortAppoinmentsByStartTime(data?.GetAppointments?._embedded || []), [
    data?.GetAppointments?._embedded,
  ])

  return (
    <ErrorBoundary>
      <ControlsContainer>
        <AppointmentTime />
        <TravelMode />
        <MyLocation />
      </ControlsContainer>
      <AppoinmentContainer className={cx(tab === 'MAP' ? mobileAppointmentsHidden : mobileAppointmentsShow)}>
        {loading ? (
          <Loader label="Loading" />
        ) : (
          <FadeIn>
            <AppointmentList appointments={appointmentSorted} />
          </FadeIn>
        )}
      </AppoinmentContainer>
      <MapContainer>
        <GoogleMapComponent appointments={appointmentSorted} />
      </MapContainer>
    </ErrorBoundary>
  )
}

export default memo(Appointment)
