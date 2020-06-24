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
    const wrapper = shallow(
      <StepCreateNewApp handleUpdateFormState={jest.fn} afterClose={jest.fn()} setWizzardStep={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  test('onLauchWithinAgencyCloud should run correctly', () => {
    const setWizzardStep = jest.fn()
    const setFieldValue = jest.fn()
    onLauchWithinAgencyCloud(setWizzardStep, setFieldValue)()
    expect(setFieldValue).toBeCalledWith(authFlowField.name, 'Authorisation Code')
    expect(setWizzardStep).toBeCalledWith('INPUT_AUTHENTICATION_URIS')
  })
  test('onPrev should run correctly', () => {
    const setWizzardStep = jest.fn()
    onPrev(setWizzardStep)()
    expect(setWizzardStep).toBeCalledWith('INPUT_APP_NAME')
  })
})
