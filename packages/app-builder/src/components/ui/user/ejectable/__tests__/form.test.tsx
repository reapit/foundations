import * as React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { Form } from '../form'
import { render } from '../../../../../tests/react-testing'

describe('Form', () => {
  beforeEach(() => {
    window.location.pathname = '/123/456'
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <Form formType={''} width={0} />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
