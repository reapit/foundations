import * as React from 'react'
import { shallow } from 'enzyme'
import { MockedProvider } from '@apollo/client/testing'
import { FormInput } from '../form-input'

describe('FormInput', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <FormInput formType={''} name={''} />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
