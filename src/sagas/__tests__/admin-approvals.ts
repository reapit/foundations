import adminApprovalsSagas, { adminApprovalsDataFetch, adminApprovalsDataListen } from '../admin-approvals'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import {
  adminApprovalsLoading,
  adminApprovalsReceiveData,
  adminApprovalsRequestDataFailure
} from '@/actions/admin-approvals'
import { appsDataStub } from '../__stubs__/apps'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import fetcher from '@/utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { Action } from '@/types/core'
import { REAPIT_API_BASE_URL } from '../../constants/api'

jest.mock('../../utils/fetcher')
const params = { data: 1 }

describe('adminApprovals fetch data', () => {
  const gen = cloneableGenerator(adminApprovalsDataFetch)(params)

  expect(gen.next().value).toEqual(put(adminApprovalsLoading(true)))
  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.approvals}?PageNumber=${params.data}&PageSize=${APPS_PER_PAGE}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
  )

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
})

describe('adminApprovals thunks', () => {
  describe('adminApprovalsListen', () => {
    it('should request data when called', () => {
      const gen = adminApprovalsDataListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.ADMIN_APPROVALS_REQUEST_DATA, adminApprovalsDataFetch)
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
