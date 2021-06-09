import React, { FC, useEffect, useState } from 'react'
import { H3 } from '@reapit/elements'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { configurationAppointmentsApiService } from '@/platform-api/configuration-api'
import { ListItemModel } from '@reapit/foundations-ts-definitions'

export type AuthenticatedProps = {}

export const Authenticated: FC<AuthenticatedProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [appointmentConfigTypes, setAppointmentConfigTypes] = useState([] as ListItemModel[])

  useEffect(() => {
    const fetchAppoinmentConfigs = async () => {
      const serviceResponse = await configurationAppointmentsApiService(connectSession as ReapitConnectSession)
      if (serviceResponse) {
        setAppointmentConfigTypes(serviceResponse)
      }
    }
    if (connectSession) {
      fetchAppoinmentConfigs()
    }
  }, [connectSession])

  console.log('Appointment Config Types are: ', appointmentConfigTypes)
  return (
    <>
      <H3>Deployment Service UI</H3>
    </>
  )
}

export default Authenticated
