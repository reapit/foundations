import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { CreateAuthenticatorReturnType, handleGetQrCode, handleRefresh, HomePage } from '..'
import { render } from '../../../tests/react-testing'
import { mockAuthenticatorModel } from '../../../tests/__stubs__/authenticator'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [null, false, undefined, jest.fn]),
  UpdateReturnTypeEnum: {},
  objectToQuery: jest.fn(),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('HomePage', () => {
  it('should render component when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true, undefined, jest.fn()])
    expect(render(<HomePage />)).toMatchSnapshot()
  })

  it('should render component with data', () => {
    mockUseReapitGet.mockReturnValue([[mockAuthenticatorModel], false, undefined, jest.fn()])
    expect(render(<HomePage />)).toMatchSnapshot()
  })

  it('should render component with no data', () => {
    mockUseReapitGet.mockReturnValue([[], false, undefined, jest.fn()])
    expect(render(<HomePage />)).toMatchSnapshot()
  })
})

describe('handleRefresh', () => {
  it('handle refreshing authenticators', () => {
    const refreshAuthenticators = jest.fn()
    const qrCodeResponse = {} as CreateAuthenticatorReturnType
    const curried = handleRefresh(refreshAuthenticators, qrCodeResponse)

    curried()

    expect(refreshAuthenticators).toHaveBeenCalledTimes(1)
  })
})

describe('handleGetQrCode', () => {
  it('handle requesting qr code', () => {
    const requestQrCode = jest.fn()
    const curried = handleGetQrCode(requestQrCode)

    curried()

    expect(requestQrCode).toHaveBeenCalledWith({ type: 'softwareToken' })
  })
})
