import { submitRevision as submitRevisionSaga, submitRevisionDataListen, submitRevisionSagas } from '../submit-revision'
import ActionTypes from '@/constants/action-types'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { SubmitRevisionParams } from '@/actions/submit-revision'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { revisionSubmitStub } from '../__stubs__/revision-submit'
import { appDetailRequestData } from '@/actions/app-detail'
import { createAppRevision } from '@/services/apps'

jest.mock('@/services/apps')
jest.mock('@reapit/elements')

const params: Action<SubmitRevisionParams> = {
  data: { params: { ...revisionSubmitStub.data, id: '1' }, onSuccess: jest.fn(), onError: jest.fn() },
  type: 'DEVELOPER_SUBMIT_REVISION',
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

  const gen = cloneableGenerator(submitRevisionSaga)(params)
  const { id } = params.data.params

  expect(gen.next().value).toEqual(all(imageUploaderRequests))
  expect(gen.next(imageUploaderResults).value).toEqual(
    call(createAppRevision, { id, ...updatedData, categoryId: undefined }),
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(put(appDetailRequestData({ id })))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next().done).toBe(true)
  })
})

describe('submit-revision thunks', () => {
  describe('submitRevisionDataListen', () => {
    it('should submit data when called', () => {
      const gen = submitRevisionDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<SubmitRevisionParams>>(ActionTypes.DEVELOPER_SUBMIT_REVISION, submitRevisionSaga),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('submitRevisionSagas', () => {
    it('should listen saga', () => {
      const gen = submitRevisionSagas()

      expect(gen.next().value).toEqual(all([fork(submitRevisionDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
