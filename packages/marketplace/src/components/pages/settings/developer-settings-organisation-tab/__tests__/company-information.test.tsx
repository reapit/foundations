import React from 'react'
import { CompanyInformation } from '../company-information'
import { shallow } from 'enzyme'

describe('ComapnyInformation', () => {
  it('should match a snapshot when no error', () => {
    expect(shallow(<CompanyInformation />)).toMatchSnapshot()
  })
})
