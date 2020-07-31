import NonAdminModal, { getModalDetails } from '../non-admin-modal'
import { shallow } from 'enzyme'
import React from 'react'
describe('NonAdminModal', () => {
  it('INSTALL MODAL', () => {
    expect(shallow(<NonAdminModal type="INSTALL" appName="App Name" onClose={jest.fn()} />)).toMatchSnapshot()
  })
  it('UNINSTALL MODAL', () => {
    expect(shallow(<NonAdminModal type="UNINSTALL" appName="App Name" onClose={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('getModalDetails', () => {
  it('should return correctly INSTALL content', () => {
    const result = getModalDetails('INSTALL', 'APPNAME')
    const expected = {
      title: 'Installing APPNAME',
      content: 'Your organisation settings prevent you from installing this app, please contact an Administrator.',
    }
    expect(result).toEqual(expected)
  })
  it('should return correctly UNINSTALL content', () => {
    const result = getModalDetails('UNINSTALL', 'APPNAME')
    const expected = {
      title: 'Uninstalling APPNAME',
      content: 'Your organisation settings prevent you from uninstalling this app, please contact an Administrator.',
    }
    expect(result).toEqual(expected)
  })
})
