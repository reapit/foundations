import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, MenuProps } from '../menu'
import toJson from 'enzyme-to-json'

const props: MenuProps = {
  loginType: 'CLIENT',
  logout: jest.fn(),
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    pathname: '/client'
  }
}

describe('Menu', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Menu {...props} />))).toMatchSnapshot()
  })

  it('simulates logout click flow', () => {
    const wrapper = shallow(<Menu {...props} />)
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
