import React from 'react'
import { render } from '../../../../tests/react-testing'
import PhoneRow from '../phone-row'

describe('PhoneRow', () => {
  it('should match snapshot', () => {
    expect(render(<PhoneRow label="Label" phoneNumber="07777777" showMobileActions />)).toMatchSnapshot()
  })
})
