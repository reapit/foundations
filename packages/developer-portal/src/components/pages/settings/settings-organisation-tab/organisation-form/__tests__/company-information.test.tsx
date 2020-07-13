import React from 'react'
import { shallow } from 'enzyme'
import OrganisationForm, { initialValues } from '../organisation-form'
import CompanyAddressSection from '../company-address-section'
import CompanyInformationSection, { CompanyInformationSectionProps } from '../company-information-section'

describe('OrganisationForm', () => {
  it('should match a snapshot when no error', () => {
    expect(shallow(<OrganisationForm />)).toMatchSnapshot()
  })
  describe('CompanyAddressSection', () => {
    it('should match a snapshot when no error', () => {
      expect(shallow(<CompanyAddressSection />)).toMatchSnapshot()
    })
  })
  describe('CompanyInformationSection', () => {
    const mockProps: CompanyInformationSectionProps = {
      formValues: initialValues,
    }
    it('should match a snapshot when no error', () => {
      expect(shallow(<CompanyInformationSection {...mockProps} />)).toMatchSnapshot()
    })
  })
})
