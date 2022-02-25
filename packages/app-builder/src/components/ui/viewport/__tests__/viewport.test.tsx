import * as React from 'react'
import { shallow } from 'enzyme'
import routeData from 'react-router'
import { MockedProvider } from '@apollo/client/testing'
import { Viewport } from '../index'

describe('Viewport', () => {
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
        <Viewport isSaving={false} iframeRef={undefined} deserialize={() => {}} rendererDivRefHandler={() => {}}>
          <></>
        </Viewport>
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot - saving', () => {
    const wrapper = shallow(
      <MockedProvider>
        <Viewport isSaving iframeRef={undefined} deserialize={() => {}} rendererDivRefHandler={() => {}}>
          <></>
        </Viewport>
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
