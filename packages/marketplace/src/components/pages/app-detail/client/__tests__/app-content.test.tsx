import React from 'react'
import AppContent from '../app-content'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { shallow } from 'enzyme'

describe('ClientAppContent', () => {
  it('ClientAppContent - should match snapshot', () => {
    const wrapper = shallow(<AppContent appDetailData={appDetailDataStub.data} />)
    expect(wrapper).toMatchSnapshot()
  })
})
