import React from 'react'
import { StepChoseAuthType, onClientSide, onServerSide, onPrev } from '../step-chose-auth-type'
import { shallow } from 'enzyme'
import { formFields } from '../../form-fields'
import { wizzardSteps } from '../../constant'
import authFlows from '@/constants/app-auth-flow'

const { authFlowField } = formFields

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
}))

jest.mock('formik', () => ({
  useFormikContext: () => ({
    setErrors: jest.fn(),
    values: { name: 'name' },
  }),
}))

describe('StepInputAuthenticationUris', () => {
  test('onPrev', () => {
    const setWizardStep = jest.fn()
    onPrev(setWizardStep)()
    expect(setWizardStep).toHaveBeenCalledWith(wizzardSteps.CREATE_NEW_APP)
  })
  test('onServerSide should run correctly', () => {
    const setWizardStep = jest.fn()
    const setFieldValue = jest.fn()
    onServerSide(setWizardStep, setFieldValue)()
    expect(setWizardStep).toHaveBeenCalledWith(wizzardSteps.GRANT_PERMISSION)
    expect(setFieldValue).toHaveBeenCalledWith(authFlowField.name, authFlows.CLIENT_SECRET)
  })
  test('onClientSide should run correctly', () => {
    const setWizardStep = jest.fn()
    const setFieldValue = jest.fn()
    onClientSide(setWizardStep, setFieldValue)()
    expect(setWizardStep).toHaveBeenCalledWith(wizzardSteps.INPUT_AUTHENTICATION_URIS)
    expect(setFieldValue).toHaveBeenCalledWith(authFlowField.name, authFlows.USER_SESSION)
  })
  it('should match snapshot', () => {
    const wrapper = shallow(<StepChoseAuthType setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
