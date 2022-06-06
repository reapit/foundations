import * as React from 'react'
import { render } from '@testing-library/react'
import { createBrowserHistory, History } from 'history'
import Routes from '@/constants/routes'
import UsersTab, { onPageChangeHandler } from '../users-tab'
import useSWR from 'swr'
import { useOrgId } from '../../../../utils/use-org-id'
import { mockUsersList } from '../../../../services/__stubs__/users'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({
    search: '/users',
  })),
}))

jest.mock('swr')
jest.mock('../../../../utils/use-org-id')

const mockSWR = useSWR as jest.Mock
const mockUseOrgId = useOrgId as jest.Mock

describe('UsersTab', () => {
  it('should match a snapshot where there is data', () => {
    window.reapit.config.groupIdsWhitelist = []
    mockSWR.mockReturnValue({
      data: mockUsersList,
      error: {},
      mutate: jest.fn(),
    })
    expect(render(<UsersTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where there is data but no users', () => {
    window.reapit.config.groupIdsWhitelist = []
    mockSWR.mockReturnValue({
      data: { _embedded: [] },
      error: {},
      mutate: jest.fn(),
    })
    expect(render(<UsersTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where there is no orgId', () => {
    window.reapit.config.groupIdsWhitelist = []
    mockSWR.mockReturnValue({
      data: mockUsersList,
      error: {},
      mutate: jest.fn(),
    })
    mockUseOrgId.mockReturnValueOnce({ orgIdState: { orgId: null } })
    expect(render(<UsersTab />)).toMatchSnapshot()
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const history: History<any> = createBrowserHistory()
    jest.spyOn(history, 'push')
    const onPageChangeHandlerFn = onPageChangeHandler(history)
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(history.push).toHaveBeenLastCalledWith(`${Routes.USERS}?pageNumber=2`)
  })
})
