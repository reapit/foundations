import React from 'react'
import ClientAppContent from '../client-app-content'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { shallow } from 'enzyme'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'

describe('ClientAppContent', () => {
  it('ClientAppContent - should match snapshot', () => {
    const wrapper = shallow(<ClientAppContent appDetailData={appDetailDataStub as AppDetailDataNotNull} />)
    expect(wrapper).toMatchSnapshot()
  })
})
