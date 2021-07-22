import React, { useEffect, FC, useState } from 'react'
import { Title, Subtitle, BodyText } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { configurationAppointmentsApiService } from '../../platform-api/configuration-api'
import { ListItemModel } from '@reapit/foundations-ts-definitions'

export type AuthenticatedProps = {}

export const Authenticated: FC<AuthenticatedProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [appointmentConfigTypes, setAppointmentConfigTypes] = useState<ListItemModel[]>([])

  useEffect(() => {
    const fetchAppoinmentConfigs = async () => {
      if (!connectSession) return
      const serviceResponse = await configurationAppointmentsApiService(connectSession)
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
      <Title>Welcome To Reapit Foundations</Title>
      <Subtitle>Next steps:</Subtitle>
      <BodyText>You are now authenticated against our sandbox data.</BodyText>
      <BodyText>
        Your Reapit connectSession object is available via the useReapitConnect hook and will be automatically refreshed
        unless you logout. This will provide you with an accessToken and login identity information to authenticate
        against our plaform APIs. For more on this{' '}
        <a
          href="https://developers.reapit.cloud/api-docs//api/web#connect-session"
          target="_blank"
          rel="noreferrer noopener"
        >
          visit here.
        </a>
      </BodyText>
      <BodyText>
        There is a sample fetch service that pulls Appointment Config Types from Foundations API to demonstrate fetching
        data using this scaffold, logging the data out to the JS console. Naturally you can replace this endpoint in the
        platform-api file with an API of your choosing from the API explorer in the developer portal. For our API
        explorer{' '}
        <a href="https://developers.reapit.cloud/swagger" target="_blank" rel="noreferrer noopener">
          visit here.
        </a>
      </BodyText>
      <BodyText>
        Included in the scaffold is the latest version of the Elements UI library. This is the simplest way for you to
        adhere to the basic style guidelines for Marketplace applications. For more on this{' '}
        <a href="https://developers.reapit.cloud/api-docs/elements" target="_blank" rel="noreferrer noopener">
          visit here.
        </a>
      </BodyText>
    </>
  )
}

export default Authenticated
