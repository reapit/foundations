import * as React from 'react'
import { shallow } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { Home, HomeProps } from '../home/home'

const props: HomeProps = {}

describe('Home', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <MockedProvider mocks={[]} addTypename={false}>
          <Home {...props} />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()
  })
})
