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

  it('a tag with href /client should have active class', () => {
    const wrapper = shallow(<Header {...props} />)
    expect(wrapper.find('.nav-item.active [to="/client"]')).toHaveLength(1)
  })

  it('simulates logout click flow', () => {
    const wrapper = shallow(<Header {...props} />)
    expect(wrapper.find('.dropdown-menu.dropdown-menu-right.show')).toHaveLength(0)
    wrapper
      .find('.avatar')
      .first()
      .simulate('click', {
        preventDefault: jest.fn()
      })
    expect(wrapper.find('.dropdown-menu.dropdown-menu-right.show')).toHaveLength(1)
    wrapper
      .find('.logout-link')
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
