import React from 'react'
import { onHandleFinish, StepSubmitAppSuccess } from '../step-submit-app-success'
import { shallow } from 'enzyme'
import { wizzardSteps } from '../../constant'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
}))

jest.mock('formik', () => ({
  useFormikContext: () => ({
    setErrors: jest.fn(),
    values: { name: 'name' },
  }),
}))

describe('step-submit-app-success', () => {
  describe('SubmitAppWizardModal', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<StepSubmitAppSuccess setWizardStep={jest.fn()} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('onHandleFinish', () => {
    it('should run correctly', () => {
      const mockSetWizardStep = jest.fn()
      const mockOnClose = jest.fn()
      const fn = onHandleFinish(mockSetWizardStep, mockOnClose)
      fn()
      expect(mockSetWizardStep).toBeCalledWith(wizzardSteps.BEFORE_YOU_START)
      expect(mockOnClose).toBeCalled()
    })
  })
})
