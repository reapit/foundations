import React from 'react'
import { onPrev, onLauchWithinAgencyCloud, StepCreateNewApp } from '../step-create-new-app'
import { shallow } from 'enzyme'
jest.mock('formik', () => ({
  useFormikContext: () => ({
    setFieldValue: jest.fn(),
  }),
}))

import { formFields } from '../../form-fields'

const { authFlowField } = formFields

describe('StepCreateNewApp', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<StepCreateNewApp afterClose={jest.fn()} setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  test('onLauchWithinAgencyCloud should run correctly', () => {
    const setWizardStep = jest.fn()
    const setFieldValue = jest.fn()
    onLauchWithinAgencyCloud(setWizardStep, setFieldValue)()
    expect(setFieldValue).toBeCalledWith(authFlowField.name, 'Authorisation Code')
    expect(setWizardStep).toBeCalledWith('INPUT_AUTHENTICATION_URIS')
  })
  test('onPrev should run correctly', () => {
    const setWizardStep = jest.fn()
    onPrev(setWizardStep)()
    expect(setWizardStep).toBeCalledWith('INPUT_APP_NAME')
  })
})
