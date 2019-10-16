import { submitCheck, submitCheckListen, submitCheckSagas } from '../submit-checks'
import ActionTypes from '@/constants/action-types'
import { put, fork, all, takeLatest, delay } from '@redux-saga/core/effects'
import { Action, ActionType } from '@/types/core'
import { submitChecksSetFormState } from '@/actions/submit-checks'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { history } from '@/core/router'
import routes from '@/constants/routes'

describe('submit-check post data', () => {
  const id = 'MKC16000098"'
  const action: Action<string> = {
    type: ActionTypes.SUBMIT_CHECKS as ActionType,
    data: id
  }
  const gen = cloneableGenerator(submitCheck)(action)
  expect(gen.next().value).toEqual(put(submitChecksSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(delay(2000))
  expect(gen.next().value).toEqual(put(submitChecksSetFormState('SUCCESS')))
  expect(gen.next().value).toEqual(history.push(routes.CHECKLIST_DETAIL_ID_SUCCESS.replace(':id', id)))
  expect(gen.next().done).toBe(true)
})

describe('submit-check thunks', () => {
  describe('submitCheckDataListen', () => {
    it('should submit data when called', () => {
      takeLatest<Action<string>>(ActionTypes.SUBMIT_CHECKS_SET_FORM_STATE, submitCheck)
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
