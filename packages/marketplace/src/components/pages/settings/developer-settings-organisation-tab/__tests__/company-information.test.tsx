import React from 'react'
import { CompanyInformation, validate } from '../company-information'
import { shallow } from 'enzyme'

describe('ComapnyInformation', () => {
  test('validate function should validate correctly', () => {
    expect(validate({ officeEmail: 's' })).toEqual({
      officeEmail: 'Invalid email format',
    })
    expect(validate({ officeEmail: 'test@gmail.com' })).toEqual({})
  })
  it('should match a snapshot when no error', () => {
    expect(shallow(<CompanyInformation />)).toMatchSnapshot()
  })
})
