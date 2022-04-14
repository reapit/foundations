import React, { MouseEvent } from 'react'
import { render } from '../../../../tests/react-testing'
import Invite, { handleLogin, handleReject, handleSubmit } from '../index'
import { History } from 'history'
import { ReapitConnectHook } from '@reapit/connect-session'
import { useReapitUpdate } from '@reapit/utils-react'

jest.mock('@reapit/utils-react', () => ({
  useReapitUpdate: jest.fn(() => []),
}))

const mockUseReapitUpdate = useReapitUpdate as jest.Mock

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
  it('should correctly submit', () => {
    const rejectInvite = jest.fn()
    const curried = handleReject(rejectInvite)
    curried({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLButtonElement>)
    expect(rejectInvite).toHaveBeenCalledTimes(1)
  })
})

describe('handleSubmit', () => {
  it('should correctly submit', () => {
    const acceptInvite = jest.fn()
    const params = {
      name: 'name',
      jobTitle: 'CTO',
    }
    const curried = handleSubmit(acceptInvite)
    curried(params)
    expect(acceptInvite).toBeCalledWith(params)
  })
})

describe('handleLogin', () => {
  it('should correctly log the user in', () => {
    const session = {
      connectHasSession: false,
      connectLogoutRedirect: jest.fn(),
    } as unknown as ReapitConnectHook

    const history = {
      replace: jest.fn(),
    } as unknown as History

    const curried = handleLogin(history, session)

    curried()

    expect(session.connectLogoutRedirect).not.toHaveBeenCalled()
    expect(history.replace).toHaveBeenCalled()
  })

  it('should correctly log the user out', () => {
    const session = {
      connectHasSession: true,
      connectLogoutRedirect: jest.fn(),
    } as unknown as ReapitConnectHook

    const history = {
      replace: jest.fn(),
    } as unknown as History

    const curried = handleLogin(history, session)

    curried()

    expect(session.connectLogoutRedirect).toHaveBeenCalled()
    expect(history.replace).not.toHaveBeenCalled()
  })
})
