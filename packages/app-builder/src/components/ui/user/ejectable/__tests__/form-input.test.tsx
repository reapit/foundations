import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { FormInput } from '../form-input'

describe('FormInput', () => {
  it('should match a snapshot', () => {
    render(
      <MockedProvider>
        <FormInput formType={''} name={''} />
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })
})
