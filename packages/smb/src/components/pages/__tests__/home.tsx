import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Home, HomeProps } from '../home'

const props: HomeProps = {
  approvalsState: {
    loading: false,
    homeData: {},
  },
  // @ts-ignore: just pick the needed props for the test
  match: {
    params: {
      page: '2',
    },
  },
}

describe('Home', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Home {...props} />))).toMatchSnapshot()
  })
})
