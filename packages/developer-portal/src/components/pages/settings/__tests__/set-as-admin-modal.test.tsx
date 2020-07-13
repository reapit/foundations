import SetAsAdminModal from '../set-as-admin-modal'
import { shallow } from 'enzyme'
import * as React from 'react'

describe('SetAsAdminModal', () => {
  it('should match snapshot', () => {
    expect(shallow(<SetAsAdminModal visible username="Jill Hill" />)).toMatchSnapshot()
  })
})
