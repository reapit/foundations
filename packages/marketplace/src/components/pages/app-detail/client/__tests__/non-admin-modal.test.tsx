import { NonAdminUninstallModal, NonAdminInstallModal } from '../non-admin-modal'
import { shallow } from 'enzyme'
import React from 'react'
describe('NonAdminModal', () => {
  it('INSTALL MODAL', () => {
    expect(shallow(<NonAdminInstallModal visible title="App Name" onClose={jest.fn()} />)).toMatchSnapshot()
  })
  it('UNINSTALL MODAL', () => {
    expect(shallow(<NonAdminUninstallModal visible title="App Name" onClose={jest.fn()} />)).toMatchSnapshot()
  })
})
