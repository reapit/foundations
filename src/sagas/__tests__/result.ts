import resultSagas, { resultFetch, resultListen } from '../result'
import ActionTypes from '@/constants/action-types'
import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { resultReceiveData, resultRequestDataFailure, ContactsParams } from '@/actions/result'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { URLS, REAPIT_API_BASE_URL, CONTACTS_HEADERS } from '@/constants/api'
import { queryParams } from '@/utils/query-params'
import { CONTACTS_PER_PAGE } from '@/constants/paginator'
import { resultDataStub } from '../__stubs__/result'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'

jest.mock('../../core/store')

const params: Action<ContactsParams> = {
  data: {
    pageNumber: 1,
    name: '1'
  },
  type: 'RESULT_REQUEST_DATA'
}

describe('result fetch data', () => {
  const gen = cloneableGenerator(resultFetch)(params)

  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.contacts}/?${queryParams({ ...params.data, pageSize: CONTACTS_PER_PAGE })}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: CONTACTS_HEADERS
    })
  )

  it('api call sucessfully', () => {
    const clone = gen.clone()
    expect(clone.next(resultDataStub as any).value).toEqual(put(resultReceiveData(resultDataStub)))
    expect(clone.next().done).toEqual(true)
  })

  it('api fail sagas', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(put(resultRequestDataFailure()))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('appointmentDetailDataListen', () => {
  it('should trigger request data when called', () => {
    const gen = resultListen()
    expect(gen.next().value).toEqual(takeLatest<Action<ContactsParams>>(ActionTypes.RESULT_REQUEST_DATA, resultFetch))
    expect(gen.next().done).toBe(true)
  })
})

describe('appointmentDetailSagas', () => {
  it('should listen data request', () => {
    const gen = resultSagas()

    expect(gen.next().value).toEqual(all([fork(resultListen)]))
    expect(gen.next().done).toBe(true)
  })
})
