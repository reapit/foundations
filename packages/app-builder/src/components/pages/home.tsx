import React, { FC, useEffect, useState } from 'react'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { configurationAppointmentsApiService } from '../../platform-api/configuration-api'
import { ListItemModel } from '@reapit/foundations-ts-definitions'
import { Title } from '@reapit/elements'

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
  return <Title>App Builder</Title>
}

export default Authenticated
