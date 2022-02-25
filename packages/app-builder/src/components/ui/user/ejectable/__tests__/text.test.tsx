import * as React from 'react'
import { shallow } from 'enzyme'
import { MockedProvider } from '@apollo/client/testing'
import { Text } from '../text'

describe('Text', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <Text text={''} />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
