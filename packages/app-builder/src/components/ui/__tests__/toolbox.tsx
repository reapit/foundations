import * as React from 'react'
import { shallow } from 'enzyme'
import { MockedProvider } from '@apollo/client/testing'

import { Toolbox } from '../toolbox'

describe('Toolbox', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <Toolbox
          enabled={false}
          create={() => {
            throw new Error('Function not implemented.')
          }}
        />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
