import React from 'react'
import { shallow } from 'enzyme'
import PhoneRow from '../phone-row'

describe('PhoneRow', () => {
  it('should match snapshot', () => {
    expect(shallow(<PhoneRow label="Label" phoneNumber="07777777" showMobileActions />)).toMatchSnapshot()
  })
})
