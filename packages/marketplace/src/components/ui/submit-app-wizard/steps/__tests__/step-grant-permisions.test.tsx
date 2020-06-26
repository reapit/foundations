import React from 'react'
import { onPrev, StepGrantPermissions } from '../step-grant-permisions'
import { shallow } from 'enzyme'

jest.mock('formik', () => ({
  useFormikContext: () => ({
    validateForm: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {},
    values: {},
  }),
}))

jest.mock('react-redux', () => ({
  useSelector: () => [],
}))

describe('StepGrantPermissions', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<StepGrantPermissions setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  test('onPrev should run correctly when authFlow = "clientCredentials"', () => {
    const setWizardStep = jest.fn()
    onPrev(setWizardStep, 'clientCredentials')()
    expect(setWizardStep).toBeCalledWith('INPUT_ATHENTICATION_TYPE')
  })
  test('onPrev should run correctly when authFlow = "authorisationCode"', () => {
    const setWizardStep = jest.fn()
    onPrev(setWizardStep, 'authorisationCode')()
    expect(setWizardStep).toBeCalledWith('INPUT_AUTHENTICATION_URIS')
  })
})
