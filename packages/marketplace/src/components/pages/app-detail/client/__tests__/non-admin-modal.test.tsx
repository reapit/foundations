import { NonAdminUninstallModal, NonAdminInstallModal } from '../non-admin-modal'
import { render } from '../../../../../tests/react-testing'
import React from 'react'
describe('NonAdminModal', () => {
  it('INSTALL MODAL', () => {
    expect(render(<NonAdminInstallModal visible title="App Name" onClose={jest.fn()} />)).toMatchSnapshot()
  })
  it('UNINSTALL MODAL', () => {
    expect(render(<NonAdminUninstallModal visible title="App Name" onClose={jest.fn()} />)).toMatchSnapshot()
  })
})
