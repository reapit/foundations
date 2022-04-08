import React from 'react'
import { ChangePasswordForm } from '../change-password-form'
import { render } from '../../../../../tests/react-testing'

describe('ChangePasswordForm', () => {
  it('should match snapshot', () => {
    expect(render(<ChangePasswordForm />)).toMatchSnapshot()
  })
})
