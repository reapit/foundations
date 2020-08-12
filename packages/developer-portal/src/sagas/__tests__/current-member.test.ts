import { put, fork, all, call, takeLatest, select } from '@redux-saga/core/effects'
import currentMemberSagas, {
  currentMemberFetch,
  currentMemberUpdate,
  currentMemberFetchListen,
  currentMemberUpdateListen,
} from '../current-member'
import ActionTypes from '@/constants/action-types'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { fetchOrganisationMembers, updateOrganisationMemberById } from '@/services/developers'
import { getDeveloperId, getLoggedUserEmail } from '@/utils/session'
import appState from '@/reducers/__stubs__/app-state'
import { fetchCurrentMemberSuccess } from '@/actions/current-member'
import { selectCurrentMemberData } from '@/selector/current-member'

jest.mock('@/services/developers')
jest.mock('@/services/cognito-identity', () => ({
  changePasswordService: jest.fn().mockResolvedValue('SUCCESS'),
}))
jest.mock('@reapit/elements', () => ({
  notification: {
    error: jest.fn(),
    success: jest.fn(),
  },
}))

describe('currentMemberFetch', () => {
  const gen = cloneableGenerator(currentMemberFetch as any)()
  expect(gen.next().value).toEqual(all([call(getDeveloperId), call(getLoggedUserEmail)]))
  it('should success', () => {
    const clone = gen.clone()
    expect(clone.next(['devid', 'mail@g.com']).value).toEqual(
      call(fetchOrganisationMembers, { id: 'devid', email: 'mail@g.com' }),
    )
    expect(clone.next({ data: [appState.currentMember.data] }).value).toEqual(
      put(fetchCurrentMemberSuccess(appState.currentMember.data as MemberModel)),
    )
    expect(clone.next().done).toEqual(true)
  })

  it('should fail', () => {
    const clone = gen.clone()
    expect(clone.next([null, null]).done).toEqual(true)
  })
})

describe('currentMemberUpdate', () => {
  const gen = cloneableGenerator(currentMemberUpdate)({ data: { name: 'john', jobTitle: 'se' } })
  expect(gen.next().value).toEqual(select(selectCurrentMemberData))
  it('should success', () => {
    const clone = gen.clone()
    const data = appState.currentMember.data as MemberModel
    const { id: memberId, developerId, ...oldData } = data
    expect(clone.next(data).value).toEqual(
      call(updateOrganisationMemberById, {
        memberId: memberId,
        id: developerId,
        ...oldData,
        name: 'john',
        jobTitle: 'se',
      } as any),
    )
    expect(clone.next({ data: [data] }).value).toEqual(call(currentMemberFetch))
    expect(clone.next().done).toEqual(true)
  })

  it('should fail', () => {
    const clone = gen.clone()
    expect(clone.next(null).done).toEqual(true)
  })
})

describe('currentMemberFetchListen', () => {
  const gen = cloneableGenerator(currentMemberFetchListen)()
  it('should success', () => {
    expect(gen.next().value).toEqual(takeLatest(ActionTypes.CURRENT_MEMBER_FETCH, currentMemberFetch))
  })
})

describe('currentMemberUpdateListen', () => {
  const gen = cloneableGenerator(currentMemberUpdateListen)()
  it('should success', () => {
    expect(gen.next().value).toEqual(takeLatest<any>(ActionTypes.CURRENT_MEMBER_UPDATE, currentMemberUpdate))
  })
})

describe('currentMemberSagas', () => {
  const gen = cloneableGenerator(currentMemberSagas)()
  it('should success', () => {
    expect(gen.next().value).toEqual(all([fork(currentMemberFetchListen), fork(currentMemberUpdateListen)]))
  })
})
