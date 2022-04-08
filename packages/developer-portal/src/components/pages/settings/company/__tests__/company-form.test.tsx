import React from 'react'
import { CompanyForm } from '../company-form'
import { render } from '../../../../../tests/react-testing'
import { mockDeveloperModel } from '../../../../../tests/__stubs__/developers'

describe('CompanyForm', () => {
  it('should match snapshot', () => {
    expect(render(<CompanyForm refreshDeveloper={jest.fn()} developer={mockDeveloperModel} />)).toMatchSnapshot()
  })
})
