import React from 'react'
import { useReapitGet } from '@reapit/use-reapit-data'
import { handleShouldFetch, FetchAuthenticators, handleResetPassword } from '../fetch-authenticators'
import { render } from '../../../tests/react-testing'
import { mockAuthenticatorModel } from '../../../tests/__stubs__/authenticator'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [null, false, undefined, jest.fn]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('FetchAuthenticators', () => {
  it('should render component with props and loading', () => {
    mockUseReapitGet.mockReturnValue([null, true, undefined, jest.fn()])
    expect(render(<FetchAuthenticators userId={'MOCK_ID'} />)).toMatchSnapshot()
  })

  it('should render component with data', () => {
    mockUseReapitGet.mockReturnValue([[mockAuthenticatorModel], false, undefined, jest.fn()])
    expect(render(<FetchAuthenticators userId={'MOCK_ID'} />)).toMatchSnapshot()
  })

  it('should render component with no data', () => {
    mockUseReapitGet.mockReturnValue([[], false, undefined, jest.fn()])
    expect(render(<FetchAuthenticators userId={'MOCK_ID'} />)).toMatchSnapshot()
  })
})

describe('handleShouldFetch', () => {
  it('handle fetching flag', () => {
    const setShouldFetch = jest.fn()
    const curried = handleShouldFetch(setShouldFetch, { authenticators: true })

    curried()

    expect(setShouldFetch).toHaveBeenCalledWith({ authenticators: true })
  })
})

describe('handleResetPassword', () => {
  it('handle resetting password', async () => {
    const deleteUserPassword = jest.fn(() => Promise.resolve(true))
    const setShouldFetch = jest.fn()
    const curried = handleResetPassword(deleteUserPassword, setShouldFetch)

    await curried()

    expect(deleteUserPassword).toHaveBeenCalledTimes(1)
    expect(setShouldFetch).toHaveBeenCalledWith({})
  })
})
