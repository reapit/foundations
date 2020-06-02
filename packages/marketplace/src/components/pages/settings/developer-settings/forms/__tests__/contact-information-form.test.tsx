import React from 'react'
import { shallow } from 'enzyme'
import {
  ContactInformationForm,
  ContactInformationFormProps,
  mapPropsContactInformation,
  EnhanceContactInformationProps,
  ContactInformationValues,
  handleSubmitContactInformation,
} from '../contact-information-form'
import { mockFormikAction } from '@/utils/mock-formik'
import { developerStub } from '@/sagas/__stubs__/developer'

describe('ContactInformationForm', () => {
  it('should match snapshot', () => {
    const mockProps = {
      isSubmitting: false,
      isValidating: false,
      isValid: true,
    } as ContactInformationFormProps
    const wrapper = shallow(<ContactInformationForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot', () => {
    const mockProps = {
      isSubmitting: true,
      isValidating: true,
      isValid: false,
    } as ContactInformationFormProps
    const wrapper = shallow(<ContactInformationForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  describe('mapPropsContactInformation', () => {
    it('should run correctly', () => {
      const mockProps: EnhanceContactInformationProps = {
        developerInformation: developerStub,
        updateDeveloperInformation: jest.fn(),
      }
      const result = mapPropsContactInformation(mockProps)
      const output = {
        jobTitle: mockProps.developerInformation?.jobTitle || '',
        telephone: mockProps.developerInformation?.telephone || '',
        companyName: mockProps.developerInformation?.company || '',
        name: mockProps.developerInformation?.name || '',
      }
      expect(result).toEqual(output)
    })

    it('should return to fall back', () => {
      const mockProps: EnhanceContactInformationProps = {
        developerInformation: developerStub,
        updateDeveloperInformation: jest.fn(),
      }
      const result = mapPropsContactInformation(mockProps)
      const output = {
        jobTitle: mockProps.developerInformation?.jobTitle || '',
        telephone: mockProps.developerInformation?.telephone || '',
        companyName: mockProps.developerInformation?.company || '',
        name: mockProps.developerInformation?.name || '',
      }
      expect(result).toEqual(output)
    })
  })
  describe('handleSubmitContactInformation', () => {
    it('should call setSubmitting', () => {
      const mockValues: ContactInformationValues = {
        companyName: 'Reapit Ltd',
        name: 'Reapit Ltd',
        jobTitle: 'Head of Cloud',
        telephone: '01234 567890',
      }
      const mockForm = {
        ...mockFormikAction,
      }
      const mockProps: EnhanceContactInformationProps = {
        developerInformation: developerStub,
        updateDeveloperInformation: jest.fn(),
      }
      handleSubmitContactInformation(mockValues, { ...mockForm, props: mockProps })
      expect(mockForm.setSubmitting).toBeCalledWith(true)
      expect(mockProps.updateDeveloperInformation).toBeCalled()
    })
  })
})
