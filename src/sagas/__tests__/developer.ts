import developerSagas, {
  developerDataFetch,
  developerRequestDataListen,
  developerCreate,
  developerCreateListen
} from '../developer'
import ActionTypes from '@/constants/action-types'
import { call, put, takeLatest, all, fork } from '@redux-saga/core/effects'
import { developerLoading, developerReceiveData, developerRequestDataFailure } from '@/actions/developer'
import { MARKETPLACE_HEADERS, URLS } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import fetcher from '@/utils/fetcher'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { appsDataStub } from '../__stubs__/apps'
import { Action } from '@/types/core'

jest.mock('../../utils/fetcher')

const params = { data: 1 }

describe('developer fetch data', () => {
  const gen = cloneableGenerator(developerDataFetch)(params)

  expect(gen.next().value).toEqual(put(developerLoading(true)))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}?PageNumber=${params.data}&PageSize=${APPS_PER_PAGE}`,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
  )

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appsDataStub.data).value).toEqual(put(developerReceiveData(appsDataStub)))
    expect(clone.next().done).toBe(true)
  })

  it('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(developerRequestDataFailure()))
    expect(clone.next().done).toBe(true)
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
