import React, { useCallback } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { OfficeModelPagedResult, OfficeModel } from '@reapit/foundations-ts-definitions'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { cleanObject } from '@reapit/utils'
import {
  Pagination,
  Table,
  Loader,
  setQueryParams,
  isEmptyObject,
  Section,
  FadeIn,
  Helper,
  combineAddress,
  toLocalTime,
  DATE_TIME_FORMAT,
  H5,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import OfficesFilterForm, { OfficesFilterFormValues } from '@/components/ui/offices/offices-tab-filter'

export const buildFilterValues = (queryParams: URLSearchParams): OfficesFilterFormValues => {
  const name = queryParams.get('name') || []
  return { name } as OfficesFilterFormValues
}

export const onPageChangeHandler = (history: History<any>, queryParams: OfficesFilterFormValues) => (page: number) => {
  const query = setQueryParams(queryParams)
  let queryString = `?pageNumber=${page}`
  if (query && query !== '') {
    queryString = queryString.concat(`&${query}`)
  }
  return history.push(`${Routes.OFFICES}${queryString}`)
}

export const onSearchHandler = (history: History<any>) => (queryParams: OfficesFilterFormValues) => {
  const cleanedValues = cleanObject(queryParams)

  if (isEmptyObject(cleanedValues)) {
    history.push(`${Routes.OFFICES}`)
    return
  }

  const query = setQueryParams(cleanedValues)
  if (query && query !== '') {
    const queryString = `?page=1&${query}`
    history.push(`${Routes.OFFICES}${queryString}`)
  }
}

const OfficesTab: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const queryParams = new URLSearchParams(search)
  const filterValues = buildFilterValues(queryParams)
  const onSearch = useCallback(onSearchHandler(history), [history])
  const onPageChange = useCallback(onPageChangeHandler(history, filterValues), [history, filterValues])

  const { data } = useSWR<OfficeModelPagedResult | undefined>(
    `${URLS.OFFICES}${search ? search + '&pageSize=12' : '?pageSize=12'}`,
  )

  const AddressCell = ({ cell: { value } }) => <p>{combineAddress(value)}</p>
  const LastUpdatedCell = ({
    cell: {
      row: { original },
    },
  }) => <p>{toLocalTime(original.modified || original.created, DATE_TIME_FORMAT.DATE_TIME_FORMAT)}</p>

  const columns = [
    { Header: 'Office Name', accessor: 'name' },
    { Header: 'Address', accessor: 'address', Cell: AddressCell },
    { Header: 'Last Updated', Cell: LastUpdatedCell },
  ]

  return (
    <ErrorBoundary>
      <Section hasPadding={false}>
        <H5>Existing offices</H5>
        <p className="mb-4">
          The list below contains all ‘Offices’ within your organisation. To create or manage an Office Group, please
          visit the ‘Groups’ page.
        </p>
        <OfficesFilterForm filterValues={filterValues} onSearch={onSearch} />
      </Section>
      {!data ? <Loader /> : <OfficesContent data={data} columns={columns} onPageChange={onPageChange} />}
    </ErrorBoundary>
  )
}

export const OfficesContent: React.FC<{
  data: OfficeModelPagedResult
  columns: any[]
  onPageChange: (page: number) => void
}> = ({ data, columns, onPageChange }) => {
  const { _embedded: listOffice, totalCount, pageSize, pageNumber = 1 } = data
  return (
    <>
      {renderResult(columns, listOffice)}
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </>
  )
}

export const renderResult = (columns: any[], listOffice?: OfficeModel[]) => {
  if (listOffice?.length === 0) {
    return (
      <FadeIn>
        <Helper variant="info">No Results</Helper>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <Table expandable scrollable={true} data={listOffice || []} columns={columns} />
    </FadeIn>
  )
}

export default OfficesTab
