import appDetailSagas, { fetchClientAppDetailSaga, clientAppDetailDataListen } from '../apps'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { FetchAppByIdParams, fetchAppById } from '@/services/apps'
import { fetchApiKeyInstallationById } from '@/services/installations'
import { clientFetchAppDetailSuccess } from '@/actions/apps'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

jest.mock('@reapit/elements')

const paramsClientId: Action<FetchAppByIdParams> = {
  data: { id: '9b6fd5f7-2c15-483d-b925-01b650538e52', clientId: 'DAC' },
  type: 'CLIENT_FETCH_APP_DETAIL',
}

const params: Action<FetchAppByIdParams> = {
  data: { id: '9b6fd5f7-2c15-483d-b925-01b650538e52' },
  type: 'CLIENT_FETCH_APP_DETAIL',
}

describe('fetch client app detail with clientId', () => {
  const gen = cloneableGenerator(fetchClientAppDetailSaga)(paramsClientId)
  expect(gen.next().value).toEqual(
    call(fetchAppById, { id: paramsClientId.data.id, clientId: paramsClientId.data.clientId }),
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appDetailDataStub.data).value).toEqual(put(clientFetchAppDetailSuccess(appDetailDataStub.data)))
  })

  test('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw('error').value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
  })
})

describe('fetch client app detail without clientId', () => {
  const gen = cloneableGenerator(fetchClientAppDetailSaga)(params)
  expect(gen.next().value).toEqual(call(fetchAppById, { id: paramsClientId.data.id, clientId: undefined }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appDetailDataStub.data).value).toEqual(put(clientFetchAppDetailSuccess(appDetailDataStub.data)))
  })

  test('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw('error').value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
  })
})

describe('client app detail fetch data and fetch apiKey', () => {
  const gen = cloneableGenerator(fetchClientAppDetailSaga)(params)
  expect(gen.next().value).toEqual(call(fetchAppById, { id: params.data.id, clientId: undefined }))

  test('api call success', () => {
    const clone = gen.clone()
    const installationId = '09682122-0811-4f36-9bfa-05e337de3065'
    const isWebComponent = true
    const apiKey = 'mockApiKey'
    expect(
      clone.next({
        ...appDetailDataStub.data,
        isWebComponent,
        installationId,
      }).value,
    ).toMatchObject(call(fetchApiKeyInstallationById, { installationId }))
    expect(clone.next({ apiKey }).value).toEqual(
      put(
        clientFetchAppDetailSuccess({
          ...appDetailDataStub.data,
          apiKey,
          isWebComponent,
          installationId,
        }),
      ),
    )
  })

  test('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw('error').value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
  })
})

describe('client app detail thunks', () => {
  describe('clientAppDetailDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = clientAppDetailDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchAppByIdParams>>(ActionTypes.CLIENT_FETCH_APP_DETAIL, fetchClientAppDetailSaga),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appDetailSagas', () => {
    it('should listen data request', () => {
      const gen = appDetailSagas()

      expect(gen.next().value).toEqual(all([fork(clientAppDetailDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
