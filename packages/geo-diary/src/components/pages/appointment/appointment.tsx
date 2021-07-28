import React, { Dispatch, FC, memo, SetStateAction, useEffect, useMemo } from 'react'
import { useQuery } from '@apollo/client'
import dayjs from 'dayjs'
import { FadeIn, fetcher, DATE_TIME_FORMAT } from '@reapit/elements-legacy'
import { ExtendedAppointmentModel } from '@/types/global'
import GET_APPOINTMENTS from '../../../graphql/queries/get-appointments.graphql'
import GET_VENDORS from '../../../graphql/queries/get-vendors.graphql'
import GET_LANDLORDS from '../../../graphql/queries/get-landlords.graphql'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { AppState, useAppState } from '../../../core/app-state'
import { AppointmentTime } from '../../ui/appointment-time/appointment-time'
import { cx } from '@linaria/core'
import {
  AppoinmentContainer,
  ControlsContainer,
  ControlsTitleWrapper,
  LoadingContainer,
  MapContainer,
  mobileAppointmentsHidden,
  mobileAppointmentsShow,
} from './__styles__'
import AppointmentList from '../../ui/appointment-list'
import { elIsBoldText, Loader, Subtitle } from '@reapit/elements'
import GoogleMapComponent from '@/components/ui/map'
import ErrorBoundary from '../../../core/error-boundary'
import { MyLocation } from '../../ui/my-location/my-location'
import ContactDrawer from '../../ui/contact-drawer'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { TabMode } from '../../ui/tab-mode/tab-mode'

export type AppointmentProps = {}

export interface AppointmentContentProps {
  appointmentsSorted: ExtendedAppointmentModel[]
  loading: boolean
}

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

export type VendorLandlordRelatedModel = {
  id: string
  name?: string
  type?: string
  homePhone?: string
  workPhone?: string
  mobilePhone?: string
  email?: string
}

export type VendorLandlordModel = {
  id: string
  related: VendorLandlordRelatedModel[]
}

export type VendorsQueryData = {
  GetVendors: {
    _embedded: VendorLandlordModel[]
  }
}

export type LandlordsQueryData = {
  GetLandlords: {
    _embedded: VendorLandlordModel[]
  }
}

export type VendorLandlordQueryVariables = {
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

export const sortAppoinmentsByStartTime =
  (appointments: ExtendedAppointmentModel[]) => (): ExtendedAppointmentModel[] => {
    const sortedAppoinments = [...appointments].sort((a, b) => {
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

export const getLandlordIds = (appointments: ExtendedAppointmentModel[]) => (): string[] =>
  appointments
    .map((appointment) => appointment?.property?.letting?.landlordId)
    .filter((landlordId) => !!landlordId) as string[]

export const handleGetVendors =
  (vendors: VendorsQueryData | undefined, setAppState: Dispatch<SetStateAction<AppState>>) => (): void => {
    if (vendors?.GetVendors._embedded.length) {
      setAppState((currentState) => ({
        ...currentState,
        vendors: vendors.GetVendors._embedded,
      }))
    }
  }

export const handleGetLandlords =
  (landlords: LandlordsQueryData | undefined, setAppState: Dispatch<SetStateAction<AppState>>) => (): void => {
    if (landlords?.GetLandlords._embedded.length) {
      setAppState((currentState) => ({
        ...currentState,
        landlords: landlords.GetLandlords._embedded,
      }))
    }
  }

export const handleGetAmlInstallation =
  (setAppState: Dispatch<SetStateAction<AppState>>, accessToken?: string, clientId?: string | null) => (): void => {
    const getAmlInstallations = async (): Promise<void> => {
      const amlAppId = window.reapit.config.amlAppId
      const amlInstallations: InstallationModelPagedResult | never = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `/marketplace/installations?appId=${amlAppId}&clientId=${clientId}&isInstalled=true`,
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })

      if (amlInstallations?.totalCount) {
        setAppState((currentState) => ({
          ...currentState,
          hasAmlApp: true,
        }))
      }
    }

    if (accessToken && clientId) {
      getAmlInstallations()
    }
  }

export const AppointmentContent: FC<AppointmentContentProps> = ({ appointmentsSorted, loading }) => {
  const { appState } = useAppState()
  const { tab } = appState
  return (
    <>
      <ControlsContainer>
        <ControlsTitleWrapper>
          <Subtitle className={elIsBoldText}>Location</Subtitle>
          <TabMode />
        </ControlsTitleWrapper>
        <MyLocation />
      </ControlsContainer>
      <AppointmentTime />
      <AppoinmentContainer className={cx(tab === 'MAP' ? mobileAppointmentsHidden : mobileAppointmentsShow)}>
        {loading ? (
          <LoadingContainer>
            <Loader label="Loading" />
          </LoadingContainer>
        ) : (
          <FadeIn>
            <AppointmentList appointments={appointmentsSorted} />
          </FadeIn>
        )}
      </AppoinmentContainer>
      <ContactDrawer />
      <MapContainer>
        <GoogleMapComponent appointments={appointmentsSorted} />
      </MapContainer>
    </>
  )
}

export const Appointment: FC<AppointmentProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appState, setAppState } = useAppState()
  const { time } = appState
  const userCode = connectSession?.loginIdentity.userCode ?? ''
  const clientId = connectSession?.loginIdentity.clientId
  const accessToken = connectSession?.accessToken
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

  const vendorIds = useMemo(getVendorIds(data?.GetAppointments?._embedded || []), [data?.GetAppointments?._embedded])

  const { data: vendors } = useQuery<VendorsQueryData, VendorLandlordQueryVariables>(GET_VENDORS, {
    variables: {
      id: vendorIds,
    },
    skip: !vendorIds.length,
  })

  useEffect(handleGetVendors(vendors, setAppState), [vendors])

  const landlordIds = useMemo(getLandlordIds(data?.GetAppointments?._embedded || []), [
    data?.GetAppointments?._embedded,
  ])

  const { data: landlords } = useQuery<LandlordsQueryData, VendorLandlordQueryVariables>(GET_LANDLORDS, {
    variables: {
      id: landlordIds,
    },
    skip: !landlordIds.length,
  })

  useEffect(handleGetLandlords(landlords, setAppState), [landlords])

  useEffect(handleGetAmlInstallation(setAppState, accessToken, clientId), [accessToken, clientId])

  const appointmentsSorted = useMemo(sortAppoinmentsByStartTime(data?.GetAppointments?._embedded || []), [
    data?.GetAppointments?._embedded,
  ])

  return (
    <ErrorBoundary>
      <AppointmentContent loading={loading} appointmentsSorted={appointmentsSorted} />
    </ErrorBoundary>
  )
}

export default memo(Appointment)
