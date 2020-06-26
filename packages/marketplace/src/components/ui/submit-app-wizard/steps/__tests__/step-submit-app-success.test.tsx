import React from 'react'
import { StepSubmitAppSuccess, onFinnish } from '../step-submit-app-success'
import { shallow } from 'enzyme'
import { developerRequestData } from '@/actions/developer'

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
  test('onFinish should run correctly', () => {
    const dispatch = jest.fn()
    onFinnish(dispatch)()
    expect(dispatch).toHaveBeenCalledWith(developerRequestData({ page: 1 }))
  })
  it('should match snapshot', () => {
    const wrapper = shallow(<StepSubmitAppSuccess setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
