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
import { ContactModel } from '@/types/platform'
import { useQuery } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import CONTACTS from './contacts.graphql'

export interface HomeProps {}

export interface PagedResult {
  _embedded: ContactModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
}

interface HomeQueryVars {
  pageNumber: number
  pageSize: number
}

export interface ContactQueryParams {
  pageSize: number
  pageNumber: number
}

export interface ContactQueryResponse {
  contacts: PagedResult
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

export const renderStatus = ({ row }: any) => {
  return (
    <div>
      <span>{row.original.identityCheck}</span>
    </div>
  )
}

export const generateColumns = () => () => [
  {
    Header: 'Name',
    id: 'name',
    accessor: d => `${d.forename} ${d.surname}`,
  },
  {
    Header: 'Address',
    id: 'address',
    accessor: d => d,
    Cell: renderAddress,
  },
  {
    Header: 'Postcode',
    id: 'postcode',
    accessor: d => d,
    Cell: renderPostalCode,
  },
  {
    Header: 'Status',
    id: 'identityCheck',
    accessor: d => d,
    Cell: renderStatus,
  },
]

export const Home: React.FunctionComponent<HomeProps> = () => {
  const [page, setPage] = React.useState(1)
  const { loading, error, data = { contacts: { _embedded: [] } } } = useQuery<ContactQueryResponse, ContactQueryParams>(
    CONTACTS,
    {
      variables: { pageSize: 10, pageNumber: page },
    },
  ) as QueryResult<ContactQueryResponse, ContactQueryParams>

  const handleChangePage = (pageNum: number) => {
    setPage(pageNum)
  }

  const columns = React.useMemo(generateColumns(), [data?.contacts._embedded])

  const renderContent = () => {
    return (
      <>
        <div>
          <Table scrollable data={data.contacts._embedded} columns={columns} loading={loading} />
        </div>
        <Section>
          <Pagination
            pageNumber={data.contacts.pageNumber}
            pageSize={data.contacts.pageSize}
            totalCount={data.contacts.totalCount}
            onChange={handleChangePage}
          />
        </Section>
      </>
    )
  }

  return (
    <FlexContainerBasic hasPadding hasBackground>
      <FlexContainerResponsive flexColumn hasPadding hasBackground>
        <H3>Welcome To Reapit Elements</H3>
        {loading && <Loader />}
        {!loading && error && <Alert message={error.message} type="danger" />}
        {!loading && data && renderContent()}
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default Home
