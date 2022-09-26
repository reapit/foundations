import React from 'react'
import { handleResendEmail, ResendConsentModal } from '../resend-consent-modal'
import { render } from '../../../tests/react-testing'

describe('ResendConsentModal', () => {
  it('should render a component without an email and recipient', () => {
    expect(render(<ResendConsentModal resendEmail={jest.fn()} closeModal={jest.fn()} />)).toMatchSnapshot()
  })

  it('should render a component with without an email and recipient', () => {
    expect(
      render(
        <ResendConsentModal
          email={'test@example.com'}
          recipient={'test@example.com'}
          resendEmail={jest.fn()}
          closeModal={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleResendEmail', () => {
  it('handleResendEmail should resent an emaol', () => {
    const resendEmail = jest.fn()
    const email = 'test@example.com'

    const curried = handleResendEmail(resendEmail, email)

    curried({ recipient: 'test1@example.com' })

    expect(resendEmail).toHaveBeenCalledWith({ actionedBy: email, recipient: 'test1@example.com' })
  })
})
