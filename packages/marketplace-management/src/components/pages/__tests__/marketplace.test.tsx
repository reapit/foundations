import React, { ChangeEvent } from 'react'
import { render } from '@testing-library/react'
import { handleSearch, MarketplacePage, onPageChangeHandler } from '../marketplace'
import { History } from 'history'
import Routes from '../../../constants/routes'
import { useOrgId } from '../../../utils/use-org-id'
import { mockAppsList } from '../../../services/__stubs__/apps'

const mockUseOrgId = useOrgId as jest.Mock

jest.mock('../../../services/apps', () => ({
  getAppRestrictionsService: jest.fn(() => ({})),
}))

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: () => [mockAppsList, false],
  GetActionNames: {
    getApps: 'getApps',
  },
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {
        developerId: 'SOME_ID',
      },
    },
  }),
}))

jest.mock('../../../utils/use-org-id')

jest.mock('react-router', () => ({
  useLocation: jest.fn(() => ({
    pathname: '/marketplace',
  })),
  useHistory: jest.fn(() => ({
    history: () => {},
  })),
}))

describe('MarketplacePage', () => {
  it('should match a snapshot', () => {
    expect(render(<MarketplacePage />)).toMatchSnapshot()
  })

  it('should match a snapshot where no orgClientId exists', () => {
    mockUseOrgId.mockReturnValueOnce({ orgIdState: {} })
    expect(render(<MarketplacePage />)).toMatchSnapshot()
  })
})

describe('onPageChangeHandler', () => {
  it('should update the history object', async () => {
    const mockHistory = {
      push: jest.fn(),
      location: { search: 'pageNumber=1&pageSize=12' },
    } as unknown as History
    const mockPage = 2

    const curried = onPageChangeHandler(mockHistory)

    curried(mockPage)

    expect(mockHistory.push).toHaveBeenCalledWith(`${Routes.MARKETPLACE}?pageNumber=${mockPage}&pageSize=12`)
  })
})

describe('handleSearch', () => {
  it('should update the history object', async () => {
    const mockHistory = { push: jest.fn() } as unknown as History
    const event = {
      target: { value: 'test' },
    } as unknown as ChangeEvent<HTMLInputElement>

    const curried = handleSearch(mockHistory)

    curried(event)

    expect(mockHistory.push).toHaveBeenCalledWith(
      `${Routes.MARKETPLACE}?pageSize=12&pageNumber=1&searchTerm=${event.target.value}`,
    )
  })
})
