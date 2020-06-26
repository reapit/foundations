import React from 'react'
import { StepSubmitAppSuccess } from '../step-submit-app-success'
import { shallow } from 'enzyme'

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
  it('should match snapshot', () => {
    const wrapper = shallow(<StepSubmitAppSuccess afterClose={jest.fn()} setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
