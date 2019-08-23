import developerSagas, {
  developerDataFetch,
  developerRequestDataListen,
  developerCreate,
  developerCreateListen
} from '../developer'
import ActionTypes from '@/constants/action-types'
import { call, put, takeLatest, all, fork, select } from '@redux-saga/core/effects'
import { developerLoading, developerReceiveData, developerRequestDataFailure } from '@/actions/developer'
import { MARKETPLACE_HEADERS, URLS } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetcher } from '@reapit/elements'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { appsDataStub } from '../__stubs__/apps'
import { appPermissionStub } from '../__stubs__/app-permission'
import { Action } from '@/types/core'
import { REAPIT_API_BASE_URL } from '../../constants/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { selectDeveloperId } from '@/selector/developer'
import { DeveloperItem } from '@/reducers/developer'

jest.mock('@reapit/elements')

const params = { data: 1 }

describe('developer fetch data', () => {
  const gen = cloneableGenerator(developerDataFetch)(params)
  const developerId = '72ad4ed6-0df0-4a28-903c-55899cffee85'

  expect(gen.next().value).toEqual(put(developerLoading(true)))
  expect(gen.next().value).toEqual(select(selectDeveloperId))
  expect(gen.next(developerId).value).toEqual(
    all([
      call(fetcher, {
        url: `${URLS.apps}?developerId=${developerId}&PageNumber=${params.data}&PageSize=${APPS_PER_PAGE}`,
        method: 'GET',
        api: REAPIT_API_BASE_URL,
        headers: MARKETPLACE_HEADERS
      }),
      call(fetcher, {
        url: `${URLS.scopes}`,
        method: 'GET',
        api: REAPIT_API_BASE_URL,
        headers: MARKETPLACE_HEADERS
      })
    ])
  )

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next([appsDataStub.data, appPermissionStub]).value).toEqual(
      put(developerReceiveData({ ...appsDataStub, scopes: appPermissionStub }))
    )
    expect(clone.next().done).toBe(true)
  })

  it('api call fail when data undefined', () => {
    const clone = gen.clone()
    expect(clone.next([undefined, appPermissionStub]).value).toEqual(put(developerRequestDataFailure()))
    expect(clone.next().done).toBe(true)
  })

  it('api call fail when scopes undefined', () => {
    const clone = gen.clone()
    expect(clone.next([appsDataStub.data, undefined]).value).toEqual(put(developerRequestDataFailure()))
    expect(clone.next().done).toBe(true)
  })
  it('api call fail when all scopes undefined', () => {
    const clone = gen.clone()
    expect(clone.next([undefined, undefined]).value).toEqual(put(developerRequestDataFailure()))
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

describe('developer thunks', () => {
  describe('developerRequestDataListen', () => {
    it('should request data listen', () => {
      const gen = developerRequestDataListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.DEVELOPER_REQUEST_DATA, developerDataFetch)
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerCreateListen', () => {
    it('should trigger developerCreact action', () => {
      const gen = developerCreateListen()
      expect(gen.next().value).toEqual(takeLatest(ActionTypes.DEVELOPER_CREATE, developerCreate))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerSagas', () => {
    it('should listen developer request data & create app action', () => {
      const gen = developerSagas()

      expect(gen.next().value).toEqual(all([fork(developerRequestDataListen), fork(developerCreateListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
