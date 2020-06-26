import React from 'react'
import { onPrev, onNext, StepInputAuthenticationUris } from '../step-input-authentication-uris'
import { shallow } from 'enzyme'

jest.mock('formik', () => ({
  useFormikContext: () => ({
    validateForm: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {},
    values: {},
  }),
}))

describe('StepInputAuthenticationUris', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<StepInputAuthenticationUris setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  test('onNext should run correctly', () => {
    const setWizardStep = jest.fn()
    onNext(setWizardStep)()
    expect(setWizardStep).toBeCalledWith('GRANT_PERMISSION')
  })
  test('onPrev should run correctly when isDirectApi = false', () => {
    const setWizardStep = jest.fn()
    onPrev(setWizardStep, false)()
    expect(setWizardStep).toBeCalledWith('CREATE_NEW_APP')
  })
  test('onPrev should run correctly when isDirectApi = true', () => {
    const setWizardStep = jest.fn()
    onPrev(setWizardStep, true)()
    expect(setWizardStep).toBeCalledWith('INPUT_ATHENTICATION_TYPE')
  })
})
