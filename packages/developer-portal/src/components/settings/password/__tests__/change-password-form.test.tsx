import React from 'react'
import { ChangePasswordForm } from '../change-password-form'
import { render } from '../../../../tests/react-testing'

jest.mock('../../../../services/cognito-identity', () => ({
  changePasswordService: jest.fn(),
}))

describe('ChangePasswordForm', () => {
  beforeEach(() => {
    process.env.appEnv = 'local'
  })

  it('should match snapshot', () => {
    expect(render(<ChangePasswordForm />)).toMatchSnapshot()
  })
})
