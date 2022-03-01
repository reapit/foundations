import * as React from 'react'
import { render } from '@testing-library/react'
import routeData from 'react-router'
import { QRCode } from '../qr-code'

describe('QRCode', () => {
  const mockParams = {
    appId: '123',
    pageId: '456',
  }
  const mockLocation = {
    pathname: '/123/456',
    hash: '',
    search: '',
    state: '',
  }
  beforeEach(() => {
    jest.spyOn(routeData, 'useParams').mockReturnValue(mockParams)
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation)
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(<QRCode width={0} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
