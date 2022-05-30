import React from 'react'
import AppContent from '../app-content'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { render } from '../../../tests/react-testing'

describe('ClientAppContent', () => {
  it('ClientAppContent - should match snapshot', () => {
    const wrapper = render(<AppContent appDetailData={appDetailDataStub.data} />)
    expect(wrapper).toMatchSnapshot()
  })
})
