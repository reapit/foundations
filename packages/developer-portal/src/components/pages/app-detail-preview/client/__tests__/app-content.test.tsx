import React from 'react'
import AppContent from '../app-content'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { shallow } from 'enzyme'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

describe('ClientAppContent', () => {
  it('ClientAppContent - should match snapshot', () => {
    const wrapper = shallow(<AppContent appDetailData={appDetailDataStub as AppDetailModel} />)
    expect(wrapper).toMatchSnapshot()
  })
})
