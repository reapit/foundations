import identityTypesSagas, { identityTypesDataFetch, identityTypesListen } from '../identity-types'
import ActionTypes from '@/constants/action-types'
import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { identityTypesReceiveData, identityTypesRequestFailure } from '@/actions/identity-types'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import { notification } from '@reapit/elements'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { identityTypes } from '../__stubs__/identity-types'
import { fetchIdentityDocumentTypes } from '../api'
import { extractNetworkErrString } from '@reapit/utils'

const mockHeaders = {
  Authorization: '123',
}

describe('identity fetch data', () => {
  const gen = cloneableGenerator(identityTypesDataFetch)()
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(call(fetchIdentityDocumentTypes, { headers: mockHeaders }))

  it('api call sucessfully', () => {
    const clone = gen.clone()
    expect(clone.next(identityTypes as any).value).toEqual(put(identityTypesReceiveData(identityTypes)))
    expect(clone.next().done).toEqual(true)
  })

  it('api fail sagas', () => {
    const clone = gen.clone()
    const err = { description: 'mockError' }
    expect(clone.throw && clone.throw(err).value).toEqual(put(identityTypesRequestFailure()))
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: extractNetworkErrString(err),
        placement: 'bottomRight',
      }),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('identityTypesListen', () => {
  it('should trigger request data when called', () => {
    const gen = identityTypesListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<void>>(ActionTypes.IDENTITY_TYPES_REQUEST_DATA, identityTypesDataFetch),
    )
    expect(gen.next().done).toBe(true)
  })
})

describe('identityTypesSagas', () => {
  it('should listen data request', () => {
    const gen = identityTypesSagas()

    expect(gen.next().value).toEqual(all([fork(identityTypesListen)]))
    expect(gen.next().done).toBe(true)
  })
})
