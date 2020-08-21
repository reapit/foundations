import { fetchCurrentMember, updateCurrentMember, fetchCurrentMemberSuccess } from '../current-member'
import ActionTypes from '@/constants/action-types'

describe('current member action', () => {
  it('should create a CURRENT_MEMBER_FETCH action', () => {
    expect(fetchCurrentMember.type).toEqual(ActionTypes.CURRENT_MEMBER_FETCH)
  })

  it('should create a CURRENT_MEMBER_FETCH_SUCCESS action', () => {
    expect(fetchCurrentMemberSuccess.type).toEqual(ActionTypes.CURRENT_MEMBER_FETCH_SUCCESS)
  })

  it('should create a CURRENT_MEMBER_UPDATE action', () => {
    expect(updateCurrentMember.type).toEqual(ActionTypes.CURRENT_MEMBER_UPDATE)
  })
})
