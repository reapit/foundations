import React from 'react'
import { shallow } from 'enzyme'
import {
  ContactInformationForm,
  ContactInformationFormProps,
  mapPropsContactInformation,
  EnhanceContactInformationProps,
  ContactInformationValues,
  handleSubmitContactInformation
} from '../contact-information-form'
import { mockFormikAction } from '@/utils/mock-formik'

jest.mock('@reapit/elements', () => ({
  fetcher: jest.fn().mockResolvedValue(true)
}))

describe('ContactInformationForm', () => {
  it('should match snapshot', () => {
    const mockProps = {
      isSubmitting: false,
      isValidating: false,
      isValid: true
    } as ContactInformationFormProps
    const wrapper = shallow(<ContactInformationForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot', () => {
    const mockProps = {
      isSubmitting: true,
      isValidating: true,
      isValid: false
    } as ContactInformationFormProps
    const wrapper = shallow(<ContactInformationForm {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
  describe('mapPropsContactInformation', () => {
    it('should run correctly', () => {
      const mockProps: EnhanceContactInformationProps = {
        setLoading: jest.fn(),
        developerId: '7b2517b3-aad3-4ad8-b31c-988a4b3d112d',
        developerInformation: {
          id: '7b2517b3-aad3-4ad8-b31c-988a4b3d112d',
          externalId: 'ecaf36e1-2b4c-46c2-90d8-1cb493e5dcbd',
          name: 'Reapit Ltd',
          company: 'Reapit Ltd',
          jobTitle: 'Head of Cloud',
          email: 'wmcvay@reapit.com',
          telephone: '01234 567890',
          created: '2019-07-31T11:34:30',
          modified: '2019-11-18T08:04:52'
        },
        errorNotification: jest.fn()
      }
      const result = mapPropsContactInformation(mockProps)
      const output = {
        jobTitle: mockProps.developerInformation?.jobTitle || '',
        telephone: mockProps.developerInformation?.telephone || '',
        companyName: mockProps.developerInformation?.company || '',
        name: mockProps.developerInformation?.name || ''
      }
      expect(result).toEqual(output)
    })

    it('should return to fall back', () => {
      const mockProps: EnhanceContactInformationProps = {
        setLoading: jest.fn(),
        developerId: '7b2517b3-aad3-4ad8-b31c-988a4b3d112d',
        developerInformation: {},
        errorNotification: jest.fn()
      }
      const result = mapPropsContactInformation(mockProps)
      const output = {
        jobTitle: mockProps.developerInformation?.jobTitle || '',
        telephone: mockProps.developerInformation?.telephone || '',
        companyName: mockProps.developerInformation?.company || '',
        name: mockProps.developerInformation?.name || ''
      }
      expect(result).toEqual(output)
    })
  })
  describe('handleSubmitContactInformation', () => {
    it('should call setSubmitting', done => {
      const mockValues: ContactInformationValues = {
        companyName: 'Reapit Ltd',
        name: 'Reapit Ltd',
        jobTitle: 'Head of Cloud',
        telephone: '01234 567890'
      }
      const mockForm = {
        ...mockFormikAction
      }
      const mockProps: EnhanceContactInformationProps = {
        setLoading: jest.fn(),
        developerId: '7b2517b3-aad3-4ad8-b31c-988a4b3d112d',
        developerInformation: {},
        errorNotification: jest.fn()
      }
      handleSubmitContactInformation(mockValues, { ...mockForm, props: mockProps })
      setTimeout(() => {
        expect(mockForm.setSubmitting).toBeCalledWith(false)
        expect(mockProps.setLoading).toBeCalledWith(true)
        done()
      }, 100)
    })
  })
})
