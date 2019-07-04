import * as React from 'react'
import { shallow } from 'enzyme'
import { Header, HeaderProps } from '../header'
import toJson from 'enzyme-to-json'

const props: HeaderProps = {
  loginType: 'CLIENT',
  logout: jest.fn(),
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    pathname: '/client'
  }
}

describe('Header', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Header {...props} />))).toMatchSnapshot()
  })

  it('simulates logout click flow', () => {
    const wrapper = shallow(<Header {...props} />)
    wrapper
      .find('[data-test="logout-cta"]')
      .first()
      .simulate('click', {
        preventDefault: jest.fn()
      })
    expect(props.logout).toBeCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
