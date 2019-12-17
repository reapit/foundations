import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Login, LoginProps } from '../login'

const props: LoginProps = {
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    pathname: '/client',
  },
}

describe('Login', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Login {...props} />))).toMatchSnapshot()
  })
})
