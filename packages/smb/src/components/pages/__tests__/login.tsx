import * as React from 'react'
import { shallow } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { Login, LoginProps } from '../login/login'

const props: LoginProps = {
  // @ts-ignore: just pick the needed props for the test
  history: {},
}

describe('Login', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <MockedProvider mocks={[]} addTypename={false}>
          <Login {...props} />
        </MockedProvider>,
      ),
    ).toMatchSnapshot()
  })
})
