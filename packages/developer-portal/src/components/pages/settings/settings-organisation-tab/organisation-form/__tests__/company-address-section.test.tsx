import React from 'react'
import { shallow } from 'enzyme'
import CompanyAddressSection from '../company-address-section'

describe('CompanyAddressSection', () => {
  it('should match a snapshot when no error', () => {
    expect(shallow(<CompanyAddressSection />)).toMatchSnapshot()
  })
})
