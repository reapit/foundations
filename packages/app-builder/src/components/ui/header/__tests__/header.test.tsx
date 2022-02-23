import * as React from 'react'
import { shallow } from 'enzyme'
import Header from '../index'
import { MockedProvider } from '@apollo/client/testing'

describe('Header', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <Header isSaving={false} />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot - saving', () => {
    const wrapper = shallow(
      <MockedProvider>
        <Header isSaving={true} />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
