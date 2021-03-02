import dayjs from 'dayjs'
import { cleanObject } from '@reapit/utils'
import { PaymentsFilterFormValues } from '../ui/payments-filter-form'
import { DATE_TIME_FORMAT, isEmptyObject, setQueryParams } from '@reapit/elements'
import { History } from 'history'
import { Routes } from '../../constants/routes'
import { history } from '../../core/router'

export const buildFilterValues = (queryParams: URLSearchParams): PaymentsFilterFormValues => {
  const defaultCreatedFrom = dayjs(new Date()).subtract(1, 'month').add(1, 'day').format(DATE_TIME_FORMAT.YYYY_MM_DD)
  const defaultCreatedTo = dayjs(new Date()).add(1, 'day').format(DATE_TIME_FORMAT.YYYY_MM_DD)

  const pageSize = '12'
  const properties = queryParams.get('properties') || ''
  const description = queryParams.get('description') || ''
  const createdFrom = queryParams.get('createdFrom') || defaultCreatedFrom
  const createdTo = queryParams.get('createdTo') || defaultCreatedTo
  const status = queryParams.getAll('status') || []
  const type = queryParams.getAll('type') || []
  return { pageSize, properties, description, createdFrom, createdTo, status, type } as PaymentsFilterFormValues
}

export const onPageChangeHandler = (history: History<any>, queryParams: PaymentsFilterFormValues) => (page: number) => {
  const query = setQueryParams(queryParams)
  const queryString = `?pageNumber=${page}${query ? `&${query}` : ''}`
  return history.push(`${Routes.PAYMENTS}${queryString}`)
}

export const onSearchHandler = (history: History<any>) => (queryParams: PaymentsFilterFormValues) => {
  const cleanedValues = cleanObject(queryParams)

  if (isEmptyObject(cleanedValues)) {
    history.push(`${Routes.PAYMENTS}`)
    return
  }

  const query = setQueryParams(cleanedValues)
  if (query && query !== '') {
    const queryString = `?pageNumber=1&${query}`
    history.push(`${Routes.PAYMENTS}${queryString}`)
  }
}

export const handleTakePayment = (paymentId: string) => {
  return history.push(`${Routes.PAYMENTS}/${paymentId}`)
}
