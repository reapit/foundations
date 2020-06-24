import React from 'react'
import { onPrev, onNext, StepInputAppName } from '../step-input-app-name'
import { shallow } from 'enzyme'

jest.mock('formik', () => ({
  useFormikContext: () => ({
    validateForm: jest.fn(),
    handleSubmit: jest.fn(),
    errors: {},
  }),
}))

describe('StepGrantPermissions', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <StepInputAppName handleUpdateFormState={jest.fn} afterClose={jest.fn()} setWizzardStep={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  test('onNext should run correctly', () => {
    const setWizzardStep = jest.fn()
    const handleUpdateFormState = jest.fn()
    const values = { key: 'val' }
    onNext(setWizzardStep, handleUpdateFormState, values)()
    expect(setWizzardStep).toBeCalledWith('CREATE_NEW_APP')
    expect(handleUpdateFormState).toHaveBeenCalledWith(values)
  })
  test('onPrev should run correctly', () => {
    const setWizzardStep = jest.fn()
    onPrev(setWizzardStep)()
    expect(setWizzardStep).toBeCalledWith('BEFORE_YOU_START')
  })
})
