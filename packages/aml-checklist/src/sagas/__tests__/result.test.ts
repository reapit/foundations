import resultSagas, { resultFetch, resultListen } from '../result'
import ActionTypes from '@/constants/action-types'
import { notification } from '@reapit/elements'
import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { resultReceiveData, resultRequestDataFailure, ContactsParams } from '@/actions/result'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import { contacts } from '../__stubs__/contacts'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { fetchContact } from '../api'
import { extractNetworkErrString } from '@reapit/utils'

const mockHeaders = {
  Authorization: '123',
}

const params: Action<ContactsParams> = {
  data: {
    pageNumber: 1,
    name: '1',
  },
  type: 'RESULT_REQUEST_DATA',
}

describe('result fetch data', () => {
  const gen = cloneableGenerator(resultFetch)(params)
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(
    call(fetchContact, {
      params,
      headers: mockHeaders,
    }),
  )

  it('api call sucessfully', () => {
    const clone = gen.clone()
    expect(clone.next(contacts as any).value).toEqual(put(resultReceiveData(contacts as any)))
    expect(clone.next().done).toEqual(true)
  })

  it('api fail sagas', () => {
    const clone = gen.clone()
    const err = { description: 'mockError' }
    expect(clone.throw && clone.throw(err).value).toEqual(put(resultRequestDataFailure()))
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: extractNetworkErrString(err),
      }),
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
