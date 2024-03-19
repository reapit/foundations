import * as React from 'react'
import Routes from '../../../../constants/routes'
import UsersTab, { onPageChangeHandler } from '../users-tab'
import useSWR from 'swr'
import { useOrgId } from '../../../../utils/use-org-id'
import { mockUsersList } from '../../../../services/__stubs__/users'
import { render } from '../../../../tests/react-testing'

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
    process.env.groupIdsWhitelist = []
    mockSWR.mockReturnValue({
      data: mockUsersList,
      error: {},
      mutate: jest.fn(),
    })
    expect(render(<UsersTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where there is data but no users', () => {
    process.env.groupIdsWhitelist = []
    mockSWR.mockReturnValue({
      data: { _embedded: [] },
      error: {},
      mutate: jest.fn(),
    })
    expect(render(<UsersTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where there is no orgId', () => {
    process.env.groupIdsWhitelist = []
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
    const navigate = jest.fn()
    const onPageChangeHandlerFn = onPageChangeHandler(navigate)
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(navigate).toHaveBeenLastCalledWith(`${Routes.USERS}?pageNumber=2`)
  })
})
