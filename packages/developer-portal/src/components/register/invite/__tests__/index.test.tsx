import React, { MouseEvent } from 'react'
import { render } from '../../../../tests/react-testing'
import Invite, { handleReject, handleAccept } from '../index'
import { useReapitUpdate } from '@reapit/use-reapit-data'
import { acceptInviteService, rejectInviteService } from '../../../../services/developer'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitUpdate: jest.fn(() => []),
}))

jest.mock('../../../../services/developer', () => ({
  acceptInviteService: jest.fn(),
  rejectInviteService: jest.fn(),
}))

const mockUseReapitUpdate = useReapitUpdate as jest.Mock
const mockRejectInviteService = rejectInviteService as jest.Mock
const mockAcceptInviteService = acceptInviteService as jest.Mock

describe('AcceptedModal', () => {
  it('should match snapshot', () => {
    expect(render(<Invite />)).toMatchSnapshot()
  })

  it('should match snapshot when an invite is accepted or rejected', () => {
    mockUseReapitUpdate.mockReturnValue([false, false, jest.fn(), true])
    expect(render(<Invite />)).toMatchSnapshot()
  })
})

describe('handleReject', () => {
  it('should correctly submit', async () => {
    mockRejectInviteService.mockReturnValueOnce(true)
    const error = jest.fn()
    const setInviteState = jest.fn()
    const developerId = 'MOCK_DEVELOPER_ID'
    const memberId = 'MOCK_MEMBER_ID'
    const curried = handleReject(error, setInviteState, developerId, memberId)

    await curried({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLButtonElement>)

    expect(setInviteState).toHaveBeenCalledWith('LOADING')
    expect(rejectInviteService).toHaveBeenCalledWith(developerId, memberId)
    expect(error).not.toHaveBeenCalled()
    expect(setInviteState).toHaveBeenCalledWith('REJECT_SUCCESS')
  })

  it('should correctly handle an error', async () => {
    mockRejectInviteService.mockReturnValueOnce('Error')
    const error = jest.fn()
    const setInviteState = jest.fn()
    const developerId = 'MOCK_DEVELOPER_ID'
    const memberId = 'MOCK_MEMBER_ID'
    const curried = handleReject(error, setInviteState, developerId, memberId)

    await curried({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLButtonElement>)

    expect(setInviteState).toHaveBeenCalledWith('LOADING')
    expect(rejectInviteService).toHaveBeenCalledWith(developerId, memberId)
    expect(error).toHaveBeenCalledWith('Error')
    expect(setInviteState).toHaveBeenCalledWith('DEFAULT')
  })
})

describe('handleAccept', () => {
  it('should correctly submit', async () => {
    mockAcceptInviteService.mockReturnValueOnce(true)
    const error = jest.fn()
    const setInviteState = jest.fn()
    const developerId = 'MOCK_DEVELOPER_ID'
    const memberId = 'MOCK_MEMBER_ID'
    const params = {
      name: 'name',
      jobTitle: 'CTO',
    }
    const curried = handleAccept(error, setInviteState, developerId, memberId)

    await curried(params)

    expect(setInviteState).toHaveBeenCalledWith('LOADING')
    expect(acceptInviteService).toHaveBeenCalledWith(params, developerId, memberId)
    expect(error).not.toHaveBeenCalled()
    expect(setInviteState).toHaveBeenCalledWith('ACCEPT_SUCCESS')
  })

  it('should correctly handle an error', async () => {
    mockAcceptInviteService.mockReturnValueOnce('Error')
    const error = jest.fn()
    const setInviteState = jest.fn()
    const developerId = 'MOCK_DEVELOPER_ID'
    const memberId = 'MOCK_MEMBER_ID'
    const params = {
      name: 'name',
      jobTitle: 'CTO',
    }
    const curried = handleAccept(error, setInviteState, developerId, memberId)

    await curried(params)

    expect(setInviteState).toHaveBeenCalledWith('LOADING')
    expect(acceptInviteService).toHaveBeenCalledWith(params, developerId, memberId)
    expect(error).toHaveBeenCalledWith('Error')
    expect(setInviteState).toHaveBeenCalledWith('DEFAULT')
  })
})
