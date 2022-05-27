import * as React from 'react'
import { render } from '@testing-library/react'
import { createBrowserHistory, History } from 'history'
import Routes from '@/constants/routes'
import UserGroupsTab, { onPageChangeHandler } from '../user-groups-tab'
import useSWR from 'swr'
import { useOrgId } from '../../../../utils/use-org-id'
import { mockUserGroups } from '../../../../services/__stubs__/user-groups'

jest.mock('swr')

const mockSWR = useSWR as jest.Mock
const mockUseOrgId = useOrgId as jest.Mock

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({ pathname: '/users/groups' })),
}))
jest.mock('../../../../utils/use-org-id')

describe('UserGroupsTab', () => {
  it('should match a snapshot where there is data', () => {
    mockSWR.mockReturnValue({
      data: mockUserGroups,
      error: {},
      mutate: jest.fn(),
    })
    expect(render(<UserGroupsTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where there is data but no user groups', () => {
    mockSWR.mockReturnValue({
      data: { _embedded: [] },
      error: {},
      mutate: jest.fn(),
    })
    expect(render(<UserGroupsTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where there is no orgId', () => {
    mockSWR.mockReturnValue({
      data: { _embedded: [] },
      error: {},
      mutate: jest.fn(),
    })
    mockUseOrgId.mockReturnValueOnce({ orgIdState: { orgId: null } })
    expect(render(<UserGroupsTab />)).toMatchSnapshot()
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const history: History<any> = createBrowserHistory()
    jest.spyOn(history, 'push')
    const onPageChangeHandlerFn = onPageChangeHandler(history)
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(history.push).toHaveBeenLastCalledWith(`${Routes.USERS_GROUPS}?pageNumber=2`)
  })
})
