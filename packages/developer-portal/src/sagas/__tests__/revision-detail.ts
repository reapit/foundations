import revisionDetailSagas, { declineRevision, declineRevisionListen } from '../revision-detail'
import { put, all, call } from '@redux-saga/core/effects'
import { RevisionDeclineRequestParams, declineRevisionSetFormState } from '@/actions/revision-detail'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { rejectAppRevisionById } from '@/services/apps'
import { fork } from 'redux-saga/effects'

jest.mock('@/services/apps')
jest.mock('@/services/scopes')
jest.mock('@/services/desktop-integration-types')
jest.mock('@reapit/elements')

describe('revision-detail thunks', () => {
  describe('revisionDetailSagas', () => {
    it('should listen data request', () => {
      const gen = cloneableGenerator(revisionDetailSagas)()
      expect(gen.next().value).toEqual(all([fork(declineRevisionListen)]))
      expect(gen.next().done).toBe(true)
    })
  })

  const declineSubmitParams: Action<RevisionDeclineRequestParams> = {
    data: {
      appId: '9b6fd5f7-2c15-483d-b925-01b650538e52',
      appRevisionId: '9b6fd5f7-2c15-483d-b925-01b650538e52',
      email: 'willmcvay@reapit.com',
      name: 'Will McVay',
      rejectionReason: 'Typo mistake',
    },
    type: 'REVISION_SUBMIT_DECLINE',
  }

  describe('revision decline submmit', () => {
    const gen = cloneableGenerator(declineRevision as any)(declineSubmitParams)
    const { appId, appRevisionId, ...body } = declineSubmitParams.data
    expect(gen.next('SUBMITTING').value).toEqual(put(declineRevisionSetFormState('SUBMITTING')))
    expect(gen.next().value).toEqual(call(rejectAppRevisionById, { id: appId, revisionId: appRevisionId, ...body }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next('SUCCESS').value).toEqual(put(declineRevisionSetFormState('SUCCESS')))
      expect(clone.next().done).toBe(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      expect(clone.next(undefined).value).toEqual(put(declineRevisionSetFormState('ERROR')))
      expect(clone.next().done).toBe(true)
    })
  })
})
