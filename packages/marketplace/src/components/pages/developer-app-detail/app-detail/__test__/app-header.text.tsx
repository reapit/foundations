import React from 'react'
import AppHeader, { VerifiedByReapit } from '../app-header'

import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { shallow } from 'enzyme'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

describe('AppHeader', () => {
  test('VerifiedByReapit - should match snapshot', () => {
    const wrapper = shallow(<VerifiedByReapit appName="test" />)
    expect(wrapper).toMatchSnapshot()
  })
  test('AppHeader - should match snapshot', () => {
    const wrapper = shallow(<AppHeader appDetailData={appDetailDataStub as AppDetailModel} />)
    expect(wrapper).toMatchSnapshot()
  })
})
