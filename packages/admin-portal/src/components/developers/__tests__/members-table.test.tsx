import React from 'react'
import { useReapitGet } from '@reapit/use-reapit-data'
import {
  handleUpdateMember,
  handleSetMemberEmail,
  handleSetUpdateMember,
  handleRefreshMembers,
  MembersTable,
  handleMemberDelete,
  handleDeleteMember,
} from '../members-table'
import { render } from '../../../tests/react-testing'
import { mockMemberModelPagedResult } from '../../../tests/__stubs__/members'
import { mockUserInfoModel } from '../../../tests/__stubs__/users'
import { Marketplace } from '@reapit/foundations-ts-definitions'

jest.mock('../../../core/use-permissions-state')
jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('MembersTable', () => {
  it('should render component with a dev id and loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<MembersTable devIdMembers="MOCK_ID" />)).toMatchSnapshot()
  })

  it('should render component with data', () => {
    mockUseReapitGet
      .mockReturnValueOnce([mockMemberModelPagedResult, false])
      .mockReturnValueOnce([mockUserInfoModel, false])
    expect(render(<MembersTable devIdMembers="MOCK_ID" />)).toMatchSnapshot()
  })
})

describe('handleUpdateMember', () => {
  it('handleUpdateMember should correctly update member', () => {
    const updateMember = jest.fn()
    const memberUpdate = mockMemberModelPagedResult.data as Marketplace.UpdateMemberModel[][0]
    const curried = handleUpdateMember(updateMember, memberUpdate)

    curried()

    expect(updateMember).toHaveBeenCalledWith(memberUpdate)
  })
})

describe('handleSetMemberEmail', () => {
  it('handleSetMemberEmail should correctly set member email', () => {
    const setMemberEmail = jest.fn()
    const memberEmail = 'mail@example.com'
    const curried = handleSetMemberEmail(setMemberEmail, memberEmail)

    curried()

    expect(setMemberEmail).toHaveBeenCalledWith(memberEmail)
  })
})

describe('handleSetUpdateMember', () => {
  it('handleSetUpdateMember should correctly set member', () => {
    const setMemberUpdate = jest.fn()
    const memberUpdate = mockMemberModelPagedResult.data as Marketplace.MemberModel[][0]
    const curried = handleSetUpdateMember(setMemberUpdate, memberUpdate)

    curried()

    expect(setMemberUpdate).toHaveBeenCalledWith(memberUpdate)
  })
})

describe('handleRefreshMembers', () => {
  it('handleRefreshMembers should correctly refresh members', () => {
    const refreshMembers = jest.fn()
    const updateMemberSuccess = true
    const curried = handleRefreshMembers(refreshMembers, updateMemberSuccess)

    curried()

    expect(refreshMembers).toHaveBeenCalledTimes(1)
  })
})

describe('handleMemberDelete', () => {
  it('handleMemberDelete should correctly set the delete member', () => {
    const setMemberDelete = jest.fn()
    const openModal = jest.fn()
    const memberDelete = mockMemberModelPagedResult.data as Marketplace.UpdateMemberModel[][0]
    const curried = handleMemberDelete(setMemberDelete, openModal, memberDelete)

    curried()

    expect(setMemberDelete).toHaveBeenCalledWith(memberDelete)
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleDeleteMember', () => {
  it('handleDeleteMember should correctly delete the member', async () => {
    const setMemberDelete = jest.fn()
    const closeModal = jest.fn()
    const deleteMember = jest.fn(() => Promise.resolve(true))
    const curried = handleDeleteMember(setMemberDelete, closeModal, deleteMember)

    await curried()

    expect(setMemberDelete).toHaveBeenCalledWith(null)
    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(deleteMember).toHaveBeenCalledTimes(1)
  })
})
