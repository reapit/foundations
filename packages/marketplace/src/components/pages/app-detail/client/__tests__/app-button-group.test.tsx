import React from 'react'
import { AppDetailButtonGroup } from '../app-detail-button-group'
import { shallow } from 'enzyme'

describe('ClientAppDetailButtonGroup', () => {
  it('should match snapshot when both buttons are showing', () => {
    const wrapper = shallow(
      <AppDetailButtonGroup
        installedOn="some-date"
        onInstallConfirmationModal={jest.fn()}
        onUninstallConfirmationModal={jest.fn()}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when both buttons are hidden', () => {
    const wrapper = shallow(
      <AppDetailButtonGroup
        installedOn=""
        onInstallConfirmationModal={jest.fn()}
        onUninstallConfirmationModal={jest.fn()}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
