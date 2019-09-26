import { submitCheck, submitCheckListen, submitCheckSagas } from '../submit-checks'
import ActionTypes from '@/constants/action-types'
import { put, fork, all, takeLatest, delay } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { submitChecksSetFormState } from '@/actions/submit-checks'

describe('submit-check post data', () => {
  const gen = submitCheck()
  expect(gen.next().value).toEqual(put(submitChecksSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(delay(2000))
  expect(gen.next().value).toEqual(put(submitChecksSetFormState('SUCCESS')))
  expect(gen.next().done).toBe(true)
})

describe('submit-check thunks', () => {
  describe('submitCheckDataListen', () => {
    it('should submit data when called', () => {
      takeLatest<Action<void>>(ActionTypes.SUBMIT_CHECKS_SET_FORM_STATE, submitCheck)
    })
  })

  describe('submitCheckSagas', () => {
    it('should listen saga', () => {
      const gen = submitCheckSagas()

      expect(gen.next().value).toEqual(all([fork(submitCheckListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
