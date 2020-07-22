import approvalsSagas, { approvalsDataFetch, approvalsDataListen } from '../approvals'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { approvalsLoading, approvalsReceiveData, approvalsRequestDataFailure } from '@/actions/approvals'
import { appsDataStub } from '@/sagas/apps/__stubs__/apps'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { fetchApprovalsList } from '@/services/approvals'

jest.mock('@/services/approvals')
jest.mock('@reapit/elements')
const params = { data: 1 }

describe('approvals fetch data', () => {
  const gen = cloneableGenerator(approvalsDataFetch)(params)

  expect(gen.next().value).toEqual(put(approvalsLoading(true)))
  expect(gen.next().value).toEqual(call(fetchApprovalsList, { pageNumber: params.data }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appsDataStub.data).value).toEqual(put(approvalsReceiveData(appsDataStub)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(approvalsRequestDataFailure()))
    expect(clone.next().done).toBe(true)
  })

  test('api call error', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
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

describe('approvals thunks', () => {
  describe('approvalsListen', () => {
    it('should request data when called', () => {
      const gen = approvalsDataListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.APPROVALS_REQUEST_DATA, approvalsDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('approvalsSagas', () => {
    it('should listen data request', () => {
      const gen = approvalsSagas()

      expect(gen.next().value).toEqual(all([fork(approvalsDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
