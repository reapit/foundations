import React, { ChangeEvent } from 'react'
import { handleSearch, MarketplacePage, onPageChangeHandler } from '../marketplace'
import Routes from '../../../constants/routes'
import { useOrgId } from '../../../utils/use-org-id'
import { mockAppsList } from '../../../services/__stubs__/apps'
import { render } from '../../../tests/react-testing'

const mockUseOrgId = useOrgId as jest.Mock

jest.mock('../../../services/apps', () => ({
  getAppRestrictionsService: jest.fn(() => ({})),
}))

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: () => [mockAppsList, false],
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
    const navigate = jest.fn()
    const mockPage = 2

    const curried = onPageChangeHandler(navigate)

    curried(mockPage)

    expect(navigate).toHaveBeenCalledWith(`${Routes.MARKETPLACE}?pageSize=12&pageNumber=${mockPage}`)
  })
})

describe('handleSearch', () => {
  it('should update the history object', async () => {
    const navigate = jest.fn()
    const event = {
      target: { value: 'test' },
    } as unknown as ChangeEvent<HTMLInputElement>

    const curried = handleSearch(navigate)

    curried(event)

    expect(navigate).toHaveBeenCalledWith(
      `${Routes.MARKETPLACE}?pageSize=12&pageNumber=1&searchTerm=${event.target.value}`,
    )
  })
})
