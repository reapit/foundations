import React from 'react'
import { StepChoseAuthType, onClientSide, onServerSide, onPrev } from '../step-chose-auth-type'
import { shallow } from 'enzyme'
import { formFields } from '../../form-fields'

const { authFlowField } = formFields

const dispatch = jest.fn()
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => dispatch),
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
    expect(setWizardStep).toHaveBeenCalledWith('CREATE_NEW_APP')
  })
  test('onServerSide should run correctly', () => {
    const setWizardStep = jest.fn()
    const setFieldValue = jest.fn()
    onServerSide(setWizardStep, setFieldValue)()
    expect(setWizardStep).toHaveBeenCalledWith('GRANT_PERMISSION')
    expect(setFieldValue).toHaveBeenCalledWith(authFlowField.name, 'clientCredentials')
  })
  test('onClientSide should run correctly', () => {
    const setWizardStep = jest.fn()
    const setFieldValue = jest.fn()
    onClientSide(setWizardStep, setFieldValue)()
    expect(setWizardStep).toHaveBeenCalledWith('INPUT_AUTHENTICATION_URIS')
    expect(setFieldValue).toHaveBeenCalledWith(authFlowField.name, 'authorisationCode')
  })
  it('should match snapshot', () => {
    const wrapper = shallow(<StepChoseAuthType setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
