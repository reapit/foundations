import React from 'react'
import { onPrev, onNext, StepInputAuthenticationUris } from '../step-input-authentication-uris'
import { shallow } from 'enzyme'

jest.mock('formik', () => ({
  useFormikContext: () => ({
    validateForm: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {},
  }),
}))

describe('StepInputAuthenticationUris', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<StepInputAuthenticationUris afterClose={jest.fn()} setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  test('onNext should run correctly', () => {
    const setWizardStep = jest.fn()
    onNext(setWizardStep)()
    expect(setWizardStep).toBeCalledWith('GRANT_PERMISSION')
  })
  test('onPrev should run correctly', () => {
    const setWizardStep = jest.fn()
    onPrev(setWizardStep)()
    expect(setWizardStep).toBeCalledWith('CREATE_NEW_APP')
  })
})
