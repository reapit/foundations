import customersListSagas, { fetchCustomersListListen, fetchCustomersListHandler } from '../customers-list'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { customersList } from '../__stubs__/customers-list'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import { fetchCustomersList } from '@/services/customers'
import { CUSTOMERS_PER_PAGE } from '@/constants/paginator'
import { notification } from '@reapit/elements'
import { fetchCustomersListFailed, fetchCustomersListSuccess, FetchCustomersListQueryParams } from '@/actions/customers'

jest.mock('@/services/approvals')
jest.mock('@reapit/elements')
jest.mock('@reapit/utils', () => ({
  extractNetworkErrString: jest.fn(() => 'ERROR'),
}))
const params = { data: { queryString: '?name=test' } }

describe('fetchCustomersListHandler', () => {
  const gen = cloneableGenerator(fetchCustomersListHandler)(params)

  expect(gen.next().value).toEqual(
    call(fetchCustomersList, {
      pageSize: CUSTOMERS_PER_PAGE,
      pageNumber: 1,
      name: ['test'],
      agencyCloudId: [],
    }),
  )
  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(customersList).value).toEqual(put(fetchCustomersListSuccess(customersList)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(fetchCustomersListFailed('ERROR')))
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: 'ERROR',
        placement: 'bottomRight',
      }),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('fetchCustomersListListen', () => {
  it('should request data when called', () => {
    const gen = fetchCustomersListListen()

    expect(gen.next().value).toEqual(
      takeLatest<Action<FetchCustomersListQueryParams>>(ActionTypes.FETCH_CUSTOMERS_LIST, fetchCustomersListHandler),
    )
    expect(gen.next().done).toBe(true)
  })
})

describe('customersListSagas', () => {
  it('should listen data request', () => {
    const gen = customersListSagas()

    expect(gen.next().value).toEqual(all([fork(fetchCustomersListListen)]))
    expect(gen.next().done).toBe(true)
  })
})
