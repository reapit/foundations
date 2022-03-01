import * as React from 'react'
import { render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { FormInput } from '../form-input'

describe('FormInput', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <FormInput formType={''} name={''} />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
