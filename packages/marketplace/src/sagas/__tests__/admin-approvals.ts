import adminApprovalsSagas, { adminApprovalsDataFetch, adminApprovalsDataListen } from '../admin-approvals'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import {
  adminApprovalsLoading,
  adminApprovalsReceiveData,
  adminApprovalsRequestDataFailure,
} from '@/actions/admin-approvals'
import { appsDataStub } from '../__stubs__/apps'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { fetchApprovalsList } from '@/services/approvals'

jest.mock('@/services/approvals')
jest.mock('@reapit/elements')
const params = { data: 1 }

describe('adminApprovals fetch data', () => {
  const gen = cloneableGenerator(adminApprovalsDataFetch)(params)

  expect(gen.next().value).toEqual(put(adminApprovalsLoading(true)))
  expect(gen.next().value).toEqual(call(fetchApprovalsList, { pageNumber: params.data }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appsDataStub.data).value).toEqual(put(adminApprovalsReceiveData(appsDataStub)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(adminApprovalsRequestDataFailure()))
    expect(clone.next().done).toBe(true)
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

describe('adminApprovals thunks', () => {
  describe('adminApprovalsListen', () => {
    it('should request data when called', () => {
      const gen = adminApprovalsDataListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.ADMIN_APPROVALS_REQUEST_DATA, adminApprovalsDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('adminApprovalsSagas', () => {
    it('should listen data request', () => {
      const gen = adminApprovalsSagas()

      expect(gen.next().value).toEqual(all([fork(adminApprovalsDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
