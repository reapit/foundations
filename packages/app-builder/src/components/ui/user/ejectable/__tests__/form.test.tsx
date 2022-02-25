import * as React from 'react'
import { shallow } from 'enzyme'
import { MockedProvider } from '@apollo/client/testing'
import routeData from 'react-router'
import { Form } from '../form'

describe('Form', () => {
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
    const wrapper = shallow(
      <MockedProvider>
        <Form formType={''} width={0} />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
