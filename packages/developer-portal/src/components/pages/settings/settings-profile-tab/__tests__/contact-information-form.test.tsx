import React from 'react'
import { shallow } from 'enzyme'
import {
  defaultInitialValues,
  generateInitialValues,
  ContactInformationForm,
  ContactInformationValues,
  handleSubmitContactInformation,
} from '../contact-information-form'
import appState from '@/reducers/__stubs__/app-state'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

const developerInfo: DeveloperModel | null = appState.settings.developerInfomation

const valuesMock: ContactInformationValues = {
  name: 'name',
  jobTitle: 'jobTitle',
  telephone: '12341234',
  companyName: 'companyName',
}

describe('ContactInformationForm', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <ContactInformationForm developerInformation={developerInfo} updateDeveloperInformation={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with developerInfomation = null', () => {
    const wrapper = shallow(
      <ContactInformationForm developerInformation={null} updateDeveloperInformation={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleSubmitContactInformation', () => {
  it('should run correctly', () => {
    const updateDeveloperInformation = jest.fn()
    const setSubmitting = jest.fn()
    const fn = handleSubmitContactInformation(updateDeveloperInformation)
    fn(valuesMock, { setSubmitting } as any)
    expect(setSubmitting).toHaveBeenCalledWith(true)
    expect(updateDeveloperInformation).toHaveBeenCalledWith(valuesMock)
  })
})

describe('generateInitialValues', () => {
  it('should return correctly', () => {
    const result = generateInitialValues({
      developerInfo,
      defaultInitialValues,
    })
    const { name, company: companyName, telephone, jobTitle } = developerInfo as DeveloperModel
    const expectedResult = {
      name,
      companyName,
      telephone,
      jobTitle,
    }
    expect(result).toEqual(expectedResult)
  })

  it('should return correctly with developerInfo null', () => {
    const result = generateInitialValues({
      developerInfo: null,
      defaultInitialValues,
    })
    expect(result).toEqual(defaultInitialValues)
  })
})
