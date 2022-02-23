import * as React from 'react'
import { shallow } from 'enzyme'
import { MockedProvider } from '@apollo/client/testing'

import AppSelect from '../app-select'

describe('AppSelect', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <MockedProvider>
          <AppSelect />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()
  })
})
