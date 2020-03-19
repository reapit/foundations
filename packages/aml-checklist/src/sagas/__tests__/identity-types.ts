import identityTypesSagas, { identityTypesDataFetch, identityTypesListen } from '../identity-types'
import ActionTypes from '@/constants/action-types'
import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { identityTypesReceiveData, identityTypesRequestFailure } from '@/actions/identity-types'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { URLS } from '@/constants/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { initAuthorizedRequestHeaders } from '@/utils/api'
import { identityTypes } from '../__stubs__/identity-types'

jest.mock('../../core/store.ts')

const mockHeaders = {
  Authorization: '123',
}

describe('identity fetch data', () => {
  const gen = cloneableGenerator(identityTypesDataFetch)()
  expect(gen.next().value).toEqual(call(initAuthorizedRequestHeaders))
  expect(gen.next(mockHeaders as any).value).toEqual(
    call(fetcher, {
      url: `${URLS.configuration}/identityDocumentTypes`,
      api: window.reapit.config.platformApiUrl,
      method: 'GET',
      headers: mockHeaders,
    }),
  )

  it('api call sucessfully', () => {
    const clone = gen.clone()
    expect(clone.next(identityTypes as any).value).toEqual(put(identityTypesReceiveData(identityTypes)))
    expect(clone.next().done).toEqual(true)
  })

  it('api fail sagas', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error(errorMessages.DEFAULT_SERVER_ERROR)).value).toEqual(put(identityTypesRequestFailure()))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
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
