import { submitRevision as submitRevisionSaga, submitRevisionDataListen, submitRevisionSagas } from '../submit-revision'
import ActionTypes from '@/constants/action-types'
import { put, fork, all, call, takeLatest } from '@redux-saga/core/effects'
import { submitRevisionSetFormState } from '@/actions/submit-revision'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import fetcher from '@/utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { CreateAppRevisionModel } from '@/types/marketplace-api-schema'
import { revisionSubmitStub } from '../__stubs__/revision-submit'
import { REAPIT_API_BASE_URL } from '../../constants/api'

const params: Action<CreateAppRevisionModel & { id: string }> = {
  data: { ...revisionSubmitStub.data, id: '1' },
  type: 'DEVELOPER_SUBMIT_REVISION'
}

describe('submit-revision post data', () => {
  const gen = cloneableGenerator(submitRevisionSaga)(params)
  const { id, ...body } = params.data

  expect(gen.next().value).toEqual(put(submitRevisionSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}/${id}/revisions`,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      body,
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(true).value).toEqual(put(submitRevisionSetFormState('SUCCESS')))
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
