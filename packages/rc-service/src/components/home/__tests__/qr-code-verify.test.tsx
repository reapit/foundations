import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleVerifyQrCode, QrCodeVerify } from '../qr-code-verify'

describe('QrCodeVerify', () => {
  it('should render component with props', () => {
    expect(
      render(
        <QrCodeVerify
          refreshAuthenticators={jest.fn()}
          setQrCode={jest.fn()}
          qrCode={{ secret: 'MOCK_SECRET', id: 'MOCK_ID' }}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleVerifyQrCode', () => {
  it('handles verifying', () => {
    const verifyQrCode = jest.fn()
    const formValues = {
      code: '123456',
    }
    const curried = handleVerifyQrCode(verifyQrCode)

    curried(formValues)
    expect(verifyQrCode).toHaveBeenCalledWith(formValues)
  })
})
