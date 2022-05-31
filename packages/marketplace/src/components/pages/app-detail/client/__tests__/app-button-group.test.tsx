import React from 'react'
import { AppDetailButtonGroup } from '../app-detail-button-group'
import { render } from '../../../../../tests/react-testing'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

describe('ClientAppDetailButtonGroup', () => {
  it('should match snapshot when both buttons are showing', () => {
    const wrapper = render(
      <AppDetailButtonGroup
        appDetailData={appDetailDataStub as any}
        onInstallConfirmationModal={jest.fn()}
        onUninstallConfirmationModal={jest.fn()}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
