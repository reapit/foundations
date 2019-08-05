import developerSagas, {
  developerDataFetch,
  developerRequestDataListen,
  developerCreate,
  developerCreateListen,
  selectDeveloperId
} from '../developer'
import ActionTypes from '@/constants/action-types'
import { call, put, takeLatest, all, fork, select } from '@redux-saga/core/effects'
import { developerLoading, developerReceiveData, developerRequestDataFailure } from '@/actions/developer'
import { MARKETPLACE_HEADERS, URLS } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import fetcher from '@/utils/fetcher'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { appsDataStub } from '../__stubs__/apps'
import { Action } from '@/types/core'
import { REAPIT_API_BASE_URL } from '../../constants/api'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'

jest.mock('../../utils/fetcher')

const params = { data: 1 }

describe('developer fetch data', () => {
  const gen = cloneableGenerator(developerDataFetch)(params)
  const developerId = '72ad4ed6-0df0-4a28-903c-55899cffee85'

  expect(gen.next().value).toEqual(put(developerLoading(true)))
  expect(gen.next().value).toEqual(select(selectDeveloperId))
  expect(gen.next(developerId).value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}?developerId=${developerId}&PageNumber=${params.data}&PageSize=${APPS_PER_PAGE}`,
      api: REAPIT_API_BASE_URL,
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

describe('Developer fetch data error', () => {
  const gen = cloneableGenerator(developerDataFetch)(params)

  expect(gen.next().value).toEqual(put(developerLoading(true)))
  expect(gen.next().value).toEqual(select(selectDeveloperId))

  // @ts-ignore
  expect(gen.throw(new Error('Developer id is not exists')).value).toEqual(
    put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  )
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
