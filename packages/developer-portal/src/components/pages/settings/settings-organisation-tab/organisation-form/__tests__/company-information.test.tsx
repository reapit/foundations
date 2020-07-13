import React from 'react'
import { shallow } from 'enzyme'
import { defaultInitialValues } from '../organisation-form'
import CompanyInformationSection, { CompanyInformationSectionProps } from '../company-information-section'

describe('CompanyInformationSection', () => {
  const mockProps: CompanyInformationSectionProps = {
    formValues: defaultInitialValues,
  }
  it('should match a snapshot when no error', () => {
    expect(shallow(<CompanyInformationSection {...mockProps} />)).toMatchSnapshot()
  })
})
