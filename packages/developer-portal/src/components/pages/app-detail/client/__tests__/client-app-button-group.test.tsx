import React from 'react'
import { ClientAppDetailButtonGroup } from '../client-app-detail-button-group'
import { shallow } from 'enzyme'

describe('ClientAppDetailButtonGroup', () => {
  it('should match snapshot when both buttons are showing', () => {
    const wrapper = shallow(
      <ClientAppDetailButtonGroup
        installedOn="some-date"
        onInstallConfirmationModal={jest.fn()}
        onUninstallConfirmationModal={jest.fn()}
        isInstallBtnHidden={false}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when both buttons are hidden', () => {
    const wrapper = shallow(
      <ClientAppDetailButtonGroup
        installedOn=""
        onInstallConfirmationModal={jest.fn()}
        onUninstallConfirmationModal={jest.fn()}
        isInstallBtnHidden={true}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
