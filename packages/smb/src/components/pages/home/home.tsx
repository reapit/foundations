import * as React from 'react'
import {
  H3,
  FlexContainerBasic,
  FlexContainerResponsive,
  Table,
  Pagination,
  Section,
  Loader,
  Alert,
} from '@reapit/elements'
import { withRouter, RouteComponentProps } from 'react-router'
import { ApolloError } from 'apollo-boost'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import { useQuery } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import { CONTACTS } from './contacts.graphql'
import { stringifyObjectIntoQueryString, getParamsFromPath } from '@/utils/client-url-params'

export type PagedResult = {
  _embedded?: ContactModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
}

export type ContactQueryParams = {
  pageSize: number
  pageNumber: number
}

export type ContactQueryResponse = {
  contacts?: PagedResult
}

export const renderAddress = ({ row }: any) => {
  const addresses = (({ buildingName, buildingNumber, line1, line2 }) => ({
    buildingName,
    buildingNumber,
    line1,
    line2,
  }))(row?.original?.addresses?.[0] || {})

  return (
    <div>
      <span>
        {Object.values(addresses)
          .filter(value => value)
          .join(', ')}
      </span>
    </div>
  )
}

export const renderPostalCode = ({ row }: any) => {
  const postcode = row?.original?.addresses?.[0]?.postcode
  return (
    <div>
      <span>{postcode}</span>
    </div>
  )
}

export const columns = [
  {
    Header: 'Forename',
    id: 'forename',
    accessor: 'forename',
  },
  {
    Header: 'Surname',
    id: 'surname',
    accessor: 'surname',
  },
  {
    Header: 'Address',
    id: 'address',
    Cell: renderAddress,
  },
  {
    Header: 'Postcode',
    id: 'postcode',
    Cell: renderPostalCode,
  },
  {
    Header: 'Status',
    id: 'identityCheck',
    accessor: 'identityCheck',
  },
]

export type RenderContentParams = ContactQueryResponse & {
  handleChangePage: (page: number) => void
  loading: boolean
  error?: ApolloError
}

export const renderContent = ({ loading, error, contacts, handleChangePage }: RenderContentParams) => {
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <Alert message={error.message} type="danger" />
  }
  return (
    <React.Fragment>
      <div>
        <Table scrollable data={contacts?._embedded} columns={columns} loading={loading} />
      </div>
      <Section>
        <Pagination
          pageNumber={contacts?.pageNumber}
          pageSize={contacts?.pageSize}
          totalCount={contacts?.totalCount}
          onChange={handleChangePage}
        />
      </Section>
    </React.Fragment>
  )
}

export const handleChangePage = ({ history }) => (pageNumber: number) => {
  const searchParams = stringifyObjectIntoQueryString({
    page: pageNumber,
  })
  history.push({
    search: searchParams,
  })
}

export const Home: React.FC<RouteComponentProps> = ({ location, history }: RouteComponentProps) => {
  const params = getParamsFromPath(location?.search)
  const page = Number(params?.page) || 1
  const { loading, error, data } = useQuery<ContactQueryResponse, ContactQueryParams>(CONTACTS, {
    variables: { pageSize: 10, pageNumber: page },
  }) as QueryResult<ContactQueryResponse, ContactQueryParams>

  return (
    <FlexContainerBasic hasPadding hasBackground>
      <FlexContainerResponsive flexColumn hasPadding hasBackground>
        <H3>Welcome To Reapit Foundations</H3>
        {renderContent({
          loading,
          error,
          contacts: data?.contacts,
          handleChangePage: handleChangePage({ history }),
        })}
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default withRouter(Home)
