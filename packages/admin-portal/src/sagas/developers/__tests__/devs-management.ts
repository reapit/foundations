import devsManagementSagas, {
  fetchDeveloperListHandler,
  setDeveloperMemberAdminListen,
  fetchDeveloperListListen,
  fetchDeveloperMemberListListen,
  disableDeveloperMemberListen,
  setDeveloperMemberAdmin,
  organisationFetchMembers,
  developerDisableMember,
} from '../devs-management'
import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  fetchDeveloperListSuccess,
  fetchDeveloperListFailed,
  SetAsAdminParams,
  fetchDeveloperMemberList,
  fetchDeveloperMembersListSuccess,
  DisableMemberActionParams,
} from '@/actions/devs-management'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { DeveloperModelPagedResult, MemberModelPagedResult } from '@reapit/foundations-ts-definitions'
import {
  fetchDevelopersList,
  updateOrganisationMemberById,
  FetchDeveloperMembersParams,
  fetchOrganisationMembers,
  disableMemberApi,
} from '@/services/developers'
import { notification } from '@reapit/elements'
import { errorMessages } from '@reapit/utils'
import { Action, ActionType } from '../../../types/core'
import ActionTypes from '../../../constants/action-types'

jest.mock('@/services/developers')

const fakeResponse = {} as DeveloperModelPagedResult
const params = {
  data: {
    page: 1,
    queryString: '?name=name&company=company&registeredFrom=2020-03-04&registeredTo=2020-04-04"',
  },
}

describe('fetchDeveloperListHandler', () => {
  const gen = cloneableGenerator(fetchDeveloperListHandler)(params)

  expect(gen.next().value).toEqual(
    call(fetchDevelopersList, {
      pageSize: REVISIONS_PER_PAGE,
      pageNumber: 1,
      name: 'name',
      company: 'company',
      registeredFrom: '2020-03-04',
      registeredTo: '2020-04-04',
    }),
  )

  test('api call success', () => {
    const clone = gen.clone()

    expect(clone.next(fakeResponse).value).toEqual(put(fetchDeveloperListSuccess(fakeResponse)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
        call(notification.error, {
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next().value).toEqual(put(fetchDeveloperListFailed(errorMessages.DEFAULT_SERVER_ERROR)))
      expect(clone.next().done).toBe(true)
    }
  })
})

describe('setDeveloperMemberAdmin', () => {
  const params: Action<SetAsAdminParams> = {
    data: {
      name: 'name',
      jobTitle: 'jobTitle',
      agreedTerms: 'agreedTerms',
      role: 'admin',
      id: 'id',
      memberId: 'memberId',
    },
    type: 'SET_AS_ADMIN',
  }
  const gen = cloneableGenerator(setDeveloperMemberAdmin)(params)
  expect(gen.next().value).toEqual(call(updateOrganisationMemberById, params.data))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(put(fetchDeveloperMemberList({ id: params.data.id })))
    expect(clone.next().done).toBe(true)
  })

  it('api call error', () => {
    const clone = gen.clone()
    if (clone.throw) clone.throw()
    expect(clone.next().value).toEqual(
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  })
})

describe('setDeveloperMemberAdminListen', () => {
  it('should trigger saga function when called', () => {
    const gen = setDeveloperMemberAdminListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<SetAsAdminParams>>(ActionTypes.SET_AS_ADMIN, setDeveloperMemberAdmin),
    )
    expect(gen.next().done).toBe(true)
  })
})

describe('organisationFetchMembers', () => {
  const params: Action<FetchDeveloperMembersParams> = {
    data: { id: 'developerId' },
    type: 'FETCH_DEVELOPER_MEMBER_LIST',
  }
  const gen = cloneableGenerator(organisationFetchMembers)(params)
  expect(gen.next().value).toEqual(call(fetchOrganisationMembers, { id: params.data.id }))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next({}).value).toEqual(put(fetchDeveloperMembersListSuccess({} as MemberModelPagedResult)))
    expect(clone.next().done).toBe(true)
  })

  it('api call error', () => {
    const clone = gen.clone()
    if (clone.throw) clone.throw()
    expect(clone.next().value).toEqual(
      notification.error({
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
  })
})

describe('fetchDeveloperMemberListListen', () => {
  it('should trigger saga function when called', () => {
    const gen = fetchDeveloperMemberListListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<FetchDeveloperMembersParams>>(
        ActionTypes.FETCH_DEVELOPER_MEMBER_LIST,
        organisationFetchMembers,
      ),
    )

    expect(gen.next().done).toBe(true)
  })
})

describe('developerDisableMember', () => {
  const params: Action<DisableMemberActionParams> = {
    data: {
      developerId: '123',
      memberId: '456',
      callback: jest.fn(),
    },
    type: ActionTypes.DISABLE_MEMBER as ActionType,
  }
  const gen = cloneableGenerator(developerDisableMember)(params)
  expect(gen.next().value).toEqual(
    call(disableMemberApi, { developerId: params.data.developerId, memberId: params.data.memberId }),
  )

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(fetchDeveloperMemberList({ id: params.data.developerId })))
    expect(clone.next().done).toEqual(true)
  })

  it('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      clone.throw()
      expect(clone.next().value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      )
      expect(clone.next().done).toBe(true)
    }
  })
})
describe('developerDisableMemberListen', () => {
  it('should trigger developerDisableMember when called', () => {
    const gen = disableDeveloperMemberListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<DisableMemberActionParams>>(ActionTypes.DISABLE_MEMBER, developerDisableMember),
    )
    expect(gen.next().done).toBe(true)
  })
})

describe('devsManagementSagas', () => {
  it('should listen', () => {
    const gen = devsManagementSagas()
    expect(gen.next().value).toEqual(
      all([
        fork(fetchDeveloperListListen),
        fork(fetchDeveloperMemberListListen),
        fork(disableDeveloperMemberListen),
        fork(setDeveloperMemberAdminListen),
      ]),
    )
    expect(gen.next().done).toBe(true)
  })
})
