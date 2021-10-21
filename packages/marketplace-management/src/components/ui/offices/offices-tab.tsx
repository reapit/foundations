import React, { FC, useCallback, useEffect, useMemo } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { OfficeModelPagedResult, OfficeModel } from '@reapit/foundations-ts-definitions'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { cleanObject, DATE_TIME_FORMAT, setQueryParams, toLocalTime } from '@reapit/utils-common'
import { combineAddress } from '@reapit/utils-common'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import OfficesFilterForm, { OfficesFormSchema } from '@/components/ui/offices/offices-tab-filter'
import { elFadeIn, Loader, Pagination, RowProps, Title, Table, elMb11, PersistantNotification } from '@reapit/elements'
import { isEmptyObject } from '@reapit/utils-react'
import { cx } from '@linaria/core'
import { refetchEffectHandler, useOrgId } from '../../../utils/use-org-id'

export const buildFilterValues = (queryParams: URLSearchParams): OfficesFormSchema => {
  const name = queryParams.get('name') || []
  return { name } as OfficesFormSchema
}

export const onPageChangeHandler = (history: History<any>, queryParams: OfficesFormSchema) => (page: number) => {
  const query = setQueryParams(queryParams)
  let queryString = `?pageNumber=${page}`
  if (query && query !== '') {
    queryString = queryString.concat(`&${query}`)
  }
  return history.push(`${Routes.OFFICES}${queryString}`)
}

export const onSearchHandler = (history: History<any>) => (queryParams: OfficesFormSchema) => {
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

export const handleSortTableData = (offices: OfficeModel[]) => (): RowProps[] => {
  return offices.map((office: OfficeModel) => ({
    cells: [
      {
        label: 'Office Name',
        value: office.name ?? '',
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Address',
        value: combineAddress(office.address),
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Last Updated',
        value: toLocalTime(office.modified ?? office.created, DATE_TIME_FORMAT.DATE_TIME_FORMAT),
        narrowTable: {
          showLabel: true,
        },
      },
    ],
  }))
}

const OfficesTab: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const queryParams = new URLSearchParams(search)
  const filterValues = buildFilterValues(queryParams)
  const onSearch = useCallback(onSearchHandler(history), [history])
  const onPageChange = useCallback(onPageChangeHandler(history, filterValues), [history, filterValues])
  const {
    orgIdState: { orgName, orgClientId },
  } = useOrgId()
  const { data, mutate } = useSWR<OfficeModelPagedResult | undefined>(
    `${URLS.OFFICES}${search ? search + '&pageSize=12' : '?pageSize=12'}`,
  )
  const offices = data?._embedded ?? []
  const totalPageCount = data?.totalPageCount ?? 0
  const pageNumber = data?.pageNumber ?? 0

  useEffect(refetchEffectHandler(orgClientId, mutate), [orgClientId])

  const rows = useMemo(handleSortTableData(offices), [offices])

  return (
    <ErrorBoundary>
      <Title>{orgName} Existing Offices</Title>
      <OfficesFilterForm filterValues={filterValues} onSearch={onSearch} />
      {!data ? (
        <Loader />
      ) : offices.length ? (
        <>
          <Table className={cx(elFadeIn, elMb11)} rows={rows} />
          <Pagination callback={onPageChange} numberPages={totalPageCount} currentPage={pageNumber} />
        </>
      ) : (
        <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
          No results found for your office search
        </PersistantNotification>
      )}
    </ErrorBoundary>
  )
}

export default OfficesTab
