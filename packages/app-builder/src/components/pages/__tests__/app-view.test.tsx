import * as React from 'react'
import { shallow } from 'enzyme'
import { MockedProvider } from '@apollo/client/testing'

import AppView from '../app-view'

describe('AppView', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <MockedProvider>
          <AppView />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()
  })
})
