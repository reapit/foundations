import clientSagas, { clientDataFetch, clientDataListen } from '../client'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { clientLoading, clientReceiveData, clientRequestDataFailure } from '@/actions/client'
import { appsDataStub } from '../__stubs__/apps'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import fetcher from '@/utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { Action } from '@/types/core'
import { REAPIT_API_BASE_URL } from '../../constants/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { selectClientId } from '@/selector/client'

jest.mock('../../utils/fetcher')
const params = { data: 1 }

describe('client fetch data', () => {
  const gen = cloneableGenerator(clientDataFetch)(params)

  expect(gen.next().value).toEqual(put(clientLoading(true)))
  expect(gen.next().value).toEqual(select(selectClientId))

  expect(gen.next('1').value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}?clientId=1&PageNumber=${params.data}&PageSize=${APPS_PER_PAGE}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appsDataStub.data).value).toEqual(put(clientReceiveData(appsDataStub)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(clientRequestDataFailure()))
    expect(clone.next().done).toBe(true)
  })

  test('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw('error').value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    )
  })
})

describe('client fetch data error', () => {
  const gen = cloneableGenerator(clientDataFetch)(params)

  expect(gen.next().value).toEqual(put(clientLoading(true)))
  expect(gen.next('').value).toEqual(select(selectClientId))

  // @ts-ignore
  expect(gen.throw('error').value).toEqual(
    put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  )
})

describe('client thunks', () => {
  describe('clientListen', () => {
    it('should request data when called', () => {
      const gen = clientDataListen()

      expect(gen.next().value).toEqual(takeLatest<Action<number>>(ActionTypes.CLIENT_REQUEST_DATA, clientDataFetch))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('clientSagas', () => {
    it('should listen data request', () => {
      const gen = clientSagas()

      expect(gen.next().value).toEqual(all([fork(clientDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
