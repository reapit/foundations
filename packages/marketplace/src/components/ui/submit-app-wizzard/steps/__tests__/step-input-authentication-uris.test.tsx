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
    const wrapper = shallow(
      <StepInputAuthenticationUris handleUpdateFormState={jest.fn} afterClose={jest.fn()} setWizzardStep={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  test('onNext should run correctly', () => {
    const setWizzardStep = jest.fn()
    const handleUpdateFormState = jest.fn()
    const values = { key: 'val' }
    onNext(setWizzardStep, handleUpdateFormState, values)()
    expect(setWizzardStep).toBeCalledWith('GRANT_PERMISSION')
    expect(handleUpdateFormState).toHaveBeenCalledWith(values)
  })
  test('onPrev should run correctly', () => {
    const setWizzardStep = jest.fn()
    onPrev(setWizzardStep)()
    expect(setWizzardStep).toBeCalledWith('CREATE_NEW_APP')
  })
})
