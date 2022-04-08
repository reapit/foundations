import React from 'react'
import { ProfileForm } from '../profile-form'
import { render } from '../../../../../tests/react-testing'

jest.mock('../../state/use-settings-state')

describe('ProfileForm', () => {
  it('should match snapshot', () => {
    expect(render(<ProfileForm />)).toMatchSnapshot()
  })
})
