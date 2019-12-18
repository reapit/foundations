import * as React from 'react'
import { H1, Loader, Alert } from '@reapit/elements'
import { Link } from 'react-router-dom'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { ContactModel } from '@/types/platform'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const MOCK_QUERY = gql`
  query MockQuery {
    GetContacts @client {
      id
      title
    }
  }
`

export interface ContactQueryData {
  GetContacts: ContactModel
}

export type UseQueryPageProps = {}

export const UseQueryPage: React.FunctionComponent<UseQueryPageProps> = () => {
  const { wrapper, container, image } = loginStyles
  const { loading, error, data } = useQuery<ContactQueryData>(MOCK_QUERY)

  return (
    <div className={container}>
      <div className={`${wrapper}`}>
        <H1 isCentered>Use Query Demo</H1>
        {loading && <Loader />}
        {error && <Alert message="Error" type="danger" />}
        {data && <Alert message={data.GetContacts.title} type="success" />}
        <Link to="/mutation">Try useMutation example</Link>
      </div>

      <div className={image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default UseQueryPage
