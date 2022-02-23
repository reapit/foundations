import * as React from 'react'
import { shallow } from 'enzyme'
import { PageSelector } from '../PageSelector'
import { MockedProvider } from '@apollo/client/testing'

describe('PageSelector', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <PageSelector pageId="" onChange={() => {}} />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
