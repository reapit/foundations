import { submitRevision as submitRevisionSaga, submitRevisionDataListen, submitRevisionSagas } from '../submit-revision'
import ActionTypes from '@/constants/action-types'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { submitRevisionSetFormState } from '@/actions/submit-revision'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { CreateAppRevisionModel } from '@/types/marketplace-api-schema'
import { revisionSubmitStub } from '../__stubs__/revision-submit'
import { REAPIT_API_BASE_URL } from '../../constants/api'
import { appDetailRequestData } from '@/actions/app-detail'

jest.mock('@reapit/elements')

const params: Action<CreateAppRevisionModel & { id: string }> = {
  data: { ...revisionSubmitStub.data, id: '1' },
  type: 'DEVELOPER_SUBMIT_REVISION'
}

const generateDumpPromise = () => new Promise(() => null)

describe('submit-revision post data', () => {
  const imageUploaderRequests = [
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise(),
    generateDumpPromise()
  ]
  const imageUploaderResults = [
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' },
    { Url: 'base64 string...' }
  ]
  const updatedData = {
    ...revisionSubmitStub.data,
    iconImageUrl: 'base64 string...',
    screen1ImageUrl: 'base64 string...',
    screen2ImageUrl: 'base64 string...',
    screen3ImageUrl: 'base64 string...',
    screen4ImageUrl: 'base64 string...'
  }

  const gen = cloneableGenerator(submitRevisionSaga)(params)
  const { id, ...body } = params.data

  expect(gen.next().value).toEqual(put(submitRevisionSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(all(imageUploaderRequests))
  expect(gen.next(imageUploaderResults).value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}/${id}/revisions`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      body: updatedData,
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(put(appDetailRequestData({ id })))
    expect(clone.next().value).toEqual(put(submitRevisionSetFormState('SUCCESS')))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(submitRevisionSetFormState('ERROR')))
    expect(clone.next().done).toBe(true)
  })
})

describe('submit-revision thunks', () => {
  describe('submitRevisionDataListen', () => {
    it('should submit data when called', () => {
      const gen = submitRevisionDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<CreateAppRevisionModel & { id: string }>>(
          ActionTypes.DEVELOPER_SUBMIT_REVISION,
          submitRevisionSaga
        )
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
