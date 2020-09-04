import * as React from 'react'
import { H3, H5, Section, Content } from '@reapit/elements'
import { useQuery } from '@apollo/react-hooks'
import GET_APPOINTMENTS from './gql/get-appointments.graphql'

export type AuthenticatedProps = {}

export type AppointmentListQueryData = {
  GetAppointments: {
    pageNumber: number
    pageSize: number
    pageCount: number
    totalCount: number
    _links: string
    _embedded: {
      id: string
      start: string
      end: string
    }[]
  }
}

export type AppointmentListQueryVariables = {
  pageSize: number
  start: string
  end: string
}

export const Authenticated: React.FC<AuthenticatedProps> = () => {
  const { data } = useQuery<AppointmentListQueryData, AppointmentListQueryVariables>(GET_APPOINTMENTS, {
    variables: {
      pageSize: 10,
      start: '',
      end: '',
    },
  })

  console.info('Example appointments data: ', data)

  return (
    <>
      <Content>
        <H3 isHeadingSection>Welcome To Reapit Foundations</H3>
        <Section>
          <H5>Next steps:</H5>
          <p>You are now authenticated against our sandbox data.</p>
          <p>
            Your Reapit connectSession object is available via the useReapitConnect hook and will be automatically
            refreshed unless you logout. This will provide you with an accessToken and login identity information to
            authenticate against our plaform APIs. For more on this{' '}
            <a
              href="https://developers.reapit.cloud/api-docs//api/web#connect-session"
              target="_blank"
              rel="noreferrer noopener"
            >
              visit here.
            </a>
          </p>
          <p>
            There is a sample fetch service that pulls Appointment Config Types from Foundations API to demonstrate
            fetching data using this scaffold, logging the data out to the JS console. Naturally you can replace this
            endpoint in the platform-api file with an API of your choosing from the API explorer in the developer
            portal. For our API explorer{' '}
            <a href="https://developers.reapit.cloud/swagger" target="_blank" rel="noreferrer noopener">
              visit here.
            </a>
          </p>
          <p>
            Included in the scaffold is the latest version of the Elements UI library. This is the simplest way for you
            to adhere to the basic style guidelines for Marketplace applications. For more on this{' '}
            <a href="https://developers.reapit.cloud/api-docs/elements" target="_blank" rel="noreferrer noopener">
              visit here.
            </a>
          </p>
        </Section>
      </Content>
    </>
  )
}

export default Authenticated
