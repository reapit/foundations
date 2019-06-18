import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Home, HomeProps } from '../home'
import { homeDataStub } from '../../../sagas/__stubs__/home'

const props: HomeProps = {
  homeState: {
    loading: false,
    homeData: homeDataStub
  },
  homeClearData: jest.fn(),
  homeRequestData: jest.fn()
}

describe('Home', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Home {...props} />))).toMatchSnapshot()
  })

  it('should dispatch homeClearData onClick', () => {
    shallow(<Home {...props} />)
      .find('a')
      .first()
      .simulate('click')

    expect(props.homeClearData).toHaveBeenCalledTimes(1)
  })

  it('should dispatch homeRequestData onClick', () => {
    shallow(<Home {...props} />)
      .find('a')
      .at(1)
      .simulate('click')

    expect(props.homeRequestData).toHaveBeenCalledTimes(1)
  })
})
