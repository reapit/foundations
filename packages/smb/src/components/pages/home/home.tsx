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
import HOME_QUERY from './home.graphql'

export interface HomeProps {}

export interface PagedResult {
  contacts: ContactModel[]
  pageNumber?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
}

interface HomeQueryVars {
  pageNumber: number
  pageSize: number
}

export interface HomeQueryResponse {
  contacts: PagedResult
}

export const AddressRow: React.FC = ({ row }: any) => {
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

AddressRow.displayName = 'AddressRow'

export const PostalCodeRow: React.FC = ({ row }: any) => {
  const postcode = row?.original?.addresses?.[0]?.postcode
  return (
    <div>
      <span>{postcode}</span>
    </div>
  )
}
PostalCodeRow.displayName = 'PostalCodeRow'

export const StatusRow: React.FC = ({ row }: any) => {
  return (
    <div>
      <span>{row.original.identityCheck}</span>
    </div>
  )
}
StatusRow.displayName = 'StatusRow'

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
    Cell: <AddressRow />,
  },
  {
    Header: 'Postcode',
    id: 'postcode',
    accessor: d => d,
    Cell: <PostalCodeRow />,
  },
  {
    Header: 'Status',
    id: 'identityCheck',
    accessor: d => d,
    Cell: <StatusRow />,
  },
]

export const Home: React.FunctionComponent<HomeProps> = () => {
  const [page, setPage] = React.useState(1)
  const { loading, error, data } = useQuery<HomeQueryResponse>(HOME_QUERY, {
    variables: { pageSize: 10, pageNumber: page },
  })

  const handleChangePage = pageNum => {
    setPage(pageNum)
  }

  const columns = React.useMemo(generateColumns(), [data?.contacts.contacts])

  return (
    <FlexContainerBasic hasPadding hasBackground>
      <FlexContainerResponsive flexColumn hasPadding hasBackground>
        <H3>Welcome To Reapit Elements</H3>
        {loading && <Loader />}
        {!loading && data && (
          <>
            <div>
              <Table scrollable data={data.contacts.contacts} columns={columns} loading={loading} />
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
        )}
        {!loading && error && <Alert message={error.message} type="danger" />}
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default Home
