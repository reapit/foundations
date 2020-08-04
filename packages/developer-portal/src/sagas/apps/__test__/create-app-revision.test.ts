import createAppRevisionSagas, { createAppRevisionSaga, createAppRevisionSagaListen } from '../create-app-revision'
import { fork, all, call, takeLatest, put } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { revisionSubmitStub } from '@/sagas/__stubs__/revision-submit'
import { createAppRevisionAPI, CreateAppRevisionParams } from '@/services/apps'
import errorMessages from '@/constants/error-messages'
import { createAppRevisionFailed, createAppRevisionSuccess, createAppRevision } from '@/actions/apps'
import { notification } from '@reapit/elements'

jest.mock('@/services/apps')
jest.mock('@reapit/elements')

const params: Action<CreateAppRevisionParams> = {
  data: { ...revisionSubmitStub.data, id: '1', successCallback: jest.fn(), errorCallback: jest.fn() },
  type: 'CREATE_APP_REVISION',
}

const generateDumpPromise = () => new Promise(() => null)

describe('submit-revision post data', () => {
  const imageUploaderRequests = [
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise(),
  ]
  const imageUploaderResults = [
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
  ]
  const updatedData = {
    ...revisionSubmitStub.data,
    iconImageUrl: 'base64 string...',
    screen1ImageUrl: 'base64 string...',
    screen2ImageUrl: 'base64 string...',
    screen3ImageUrl: 'base64 string...',
    screen4ImageUrl: 'base64 string...',
    screen5ImageUrl: 'base64 string...',
  }

  const gen = cloneableGenerator(createAppRevisionSaga)(params)
  const { id } = params.data

  expect(gen.next().value).toEqual(all(imageUploaderRequests))
  expect(gen.next(imageUploaderResults).value).toEqual(
    call(createAppRevisionAPI, { id, ...updatedData, categoryId: undefined }),
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(createAppRevisionSuccess()))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(createAppRevisionFailed()))
      expect(clone.next().value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
          placement: 'bottomRight',
        }),
      )
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('submit-revision thunks', () => {
  describe('createAppRevisionSagaListen', () => {
    it('should submit data when called', () => {
      const gen = createAppRevisionSagaListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<CreateAppRevisionParams>>(createAppRevision.type, createAppRevisionSaga),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('createAppRevisionSagas', () => {
    it('should listen saga', () => {
      const gen = createAppRevisionSagas()

      expect(gen.next().value).toEqual(all([fork(createAppRevisionSagaListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
