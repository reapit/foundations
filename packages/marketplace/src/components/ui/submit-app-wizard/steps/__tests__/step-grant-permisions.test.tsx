import React from 'react'
import { onPrev, onNext, StepGrantPermissions } from '../step-grant-permisions'
import { shallow } from 'enzyme'

jest.mock('formik', () => ({
  useFormikContext: () => ({
    validateForm: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {},
  }),
}))

jest.mock('react-redux', () => ({
  useSelector: () => [],
}))

describe('StepGrantPermissions', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<StepGrantPermissions afterClose={jest.fn()} setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  test('onNext should run correctly', () => {
    const setWizardStep = jest.fn()
    onNext(setWizardStep)()
    expect(setWizardStep).toBeCalledWith('SUBMIT_APP_SUCCESS')
  })
  test('onPrev should run correctly', () => {
    const setWizardStep = jest.fn()
    onPrev(setWizardStep)()
    expect(setWizardStep).toBeCalledWith('BEFORE_YOU_START')
  })
})
