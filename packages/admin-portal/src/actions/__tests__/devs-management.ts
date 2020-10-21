import {
  fetchDeveloperList,
  fetchDeveloperListFailed,
  fetchDeveloperListSuccess,
  fetchDeveloperMemberList,
  fetchDeveloperMembersListSuccess,
  disableMember,
  setAsAdmin,
} from '../devs-management'
import ActionTypes from '../../constants/action-types'

describe('admin dev management actions', () => {
  it('should create a fetchDeveloperList action', () => {
    expect(fetchDeveloperList.type).toEqual(ActionTypes.FETCH_DEVELOPER_LIST)
  })

  it('should create a fetchDeveloperListFailed action', () => {
    expect(fetchDeveloperListFailed.type).toEqual(ActionTypes.FETCH_DEVELOPER_LIST_FAILED)
  })

  it('should create a fetchDeveloperListSuccess action', () => {
    expect(fetchDeveloperListSuccess.type).toEqual(ActionTypes.FETCH_DEVELOPER_LIST_SUCCESS)
  })

  it('should create a fetchDeveloperMemberList action', () => {
    expect(fetchDeveloperMemberList.type).toEqual(ActionTypes.FETCH_DEVELOPER_MEMBER_LIST)
  })

  it('should create a fetchDeveloperMembersListSuccess action', () => {
    expect(fetchDeveloperMembersListSuccess.type).toEqual(ActionTypes.FETCH_DEVELOPER_MEMBERS_LIST_SUCCESS)
  })

  it('should create a disableMember action', () => {
    expect(disableMember.type).toEqual(ActionTypes.DISABLE_MEMBER)
  })

  it('should create a setAsAdmin action', () => {
    expect(setAsAdmin.type).toEqual(ActionTypes.SET_AS_ADMIN)
  })
})
