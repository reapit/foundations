import * as React from 'react'
import { shallow } from 'enzyme'
import routeData from 'react-router'
import { Link } from '../link'

describe('Link', () => {
  const mockParams = {
    appId: '123',
    pageId: '456',
  }
  const mockLocation = {
    pathname: '/123/456',
    hash: '',
    search: '',
    state: '',
  }
  beforeEach(() => {
    jest.spyOn(routeData, 'useParams').mockReturnValue(mockParams)
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation)
  })
  it('should match a snapshot', () => {
    const wrapper = shallow(<Link width={0} />)
    expect(wrapper).toMatchSnapshot()
  })
})
