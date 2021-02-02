import dayjs from 'dayjs'
import { cleanObject, errorMessages } from '@reapit/utils'
import { PaymentsFilterFormValues } from '../ui/payments-filter-form'
import { DATE_TIME_FORMAT, isEmptyObject, notification, setQueryParams } from '@reapit/elements'
import { History } from 'history'
import { Routes } from '../../constants/routes'
import { history } from '../../core/router'

export const buildFilterValues = (queryParams: URLSearchParams): PaymentsFilterFormValues => {
  const defaultCreatedFrom = dayjs(new Date())
    .subtract(1, 'month')
    .format(DATE_TIME_FORMAT.YYYY_MM_DD)
  const defaultCreatedTo = dayjs(new Date()).format(DATE_TIME_FORMAT.YYYY_MM_DD)

  const properties = queryParams.get('properties') || ''
  const description = queryParams.get('description') || ''
  const createdFrom = queryParams.get('createdFrom') || defaultCreatedFrom
  const createdTo = queryParams.get('createdTo') || defaultCreatedTo
  const status = queryParams.getAll('status') || []
  const type = queryParams.getAll('type') || []
  return { properties, description, createdFrom, createdTo, status, type } as PaymentsFilterFormValues
}

export const onPageChangeHandler = (history: History<any>, queryParams: PaymentsFilterFormValues) => (page: number) => {
  const query = setQueryParams(queryParams)
  let queryString = `?pageNumber=${page}`
  if (query && query !== '') {
    queryString = queryString.concat(`&${query}`)
  }
  return history.push(`${Routes.PAYMENTS}${queryString}`)
}

export const onSearchHandler = (history: History<any>) => (queryParams: PaymentsFilterFormValues) => {
  const cleanedValues = cleanObject(queryParams)
  const { developerId } = cleanedValues
  if (developerId?.length > 1) {
    return notification.error({
      message: errorMessages.SUBSCRIPTION_MULTIPLE_DEVELOPER,
      placement: 'bottomRight',
    })
  }

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

export const handleTakePayment = (id: string) => {
  return history.push(`${Routes.PAYMENTS}/${id}`)
}
