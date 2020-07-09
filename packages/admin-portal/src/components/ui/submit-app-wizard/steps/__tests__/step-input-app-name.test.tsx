import React from 'react'
import { onPrev, onNext, StepInputAppName } from '../step-input-app-name'
import { shallow } from 'enzyme'
import { wizzardSteps } from '../../constant'

jest.mock('formik', () => ({
  useFormikContext: () => ({
    validateForm: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {},
  }),
}))

describe('StepGrantPermissions', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<StepInputAppName setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  test('onNext should run correctly', () => {
    const setWizardStep = jest.fn()
    onNext(setWizardStep)()
    expect(setWizardStep).toBeCalledWith(wizzardSteps.CREATE_NEW_APP)
  })
  test('onPrev should run correctly', () => {
    const setWizardStep = jest.fn()
    onPrev(setWizardStep)()
    expect(setWizardStep).toBeCalledWith(wizzardSteps.BEFORE_YOU_START)
  })
})
