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
    const wrapper = shallow(
      <StepGrantPermissions handleUpdateFormState={jest.fn} afterClose={jest.fn()} setWizzardStep={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  test('onNext should run correctly', () => {
    const setWizzardStep = jest.fn()
    const handleUpdateFormState = jest.fn()
    const values = { key: 'val' }
    onNext(setWizzardStep, handleUpdateFormState, values)()
    expect(setWizzardStep).toBeCalledWith('SUBMIT_APP_SUCCESS')
    expect(handleUpdateFormState).toHaveBeenCalledWith(values)
  })
  test('onPrev should run correctly', () => {
    const setWizzardStep = jest.fn()
    onPrev(setWizzardStep)()
    expect(setWizzardStep).toBeCalledWith('BEFORE_YOU_START')
  })
})
