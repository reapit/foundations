import SuccessModal from '../success-modal'
import { shallow } from 'enzyme'
import * as React from 'react'

describe('SetAsAdminModal', () => {
  it('should match snapshot', () => {
    const user = {
      name: 'Jill Hill',
    }
    expect(shallow(<SuccessModal name={user.name} />)).toMatchSnapshot()
  })
})
