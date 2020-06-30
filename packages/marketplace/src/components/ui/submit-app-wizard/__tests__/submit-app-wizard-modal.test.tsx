import { SubmitAppWizardModal, handleUseEffect, customAfterClose } from '../submit-app-wizard-modal'
import React from 'react'
import { shallow } from 'enzyme'
import { submitAppSetFormState } from '@/actions/submit-app'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import { onFinish } from '../steps/step-submit-app-success'
jest.mock('../steps/step-submit-app-success', () => ({
  onFinish: jest.fn().mockImplementation(fn => fn),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

describe('SubmitAppWizardModal', () => {
  describe('customAfterClose should run correctly', () => {
    test('when formState = "SUCCESS"', () => {
      const dispatch = jest.fn()
      const afterClose = jest.fn()
      const reduxState = 'state'
      const getReduxState = () => reduxState
      customAfterClose({
        dispatch,
        afterClose,
        getReduxState: (getReduxState as unknown) as () => ReduxState,
        selectSubmitAppFormState: () => 'SUCCESS',
      })()
      expect(onFinish).toHaveBeenCalledWith(dispatch)
    })
    test('when formState != "SUCCESS"', () => {
      const dispatch = jest.fn()
      const afterClose = jest.fn()
      const reduxState = 'state'
      const getReduxState = () => reduxState
      customAfterClose({
        dispatch,
        afterClose,
        getReduxState: (getReduxState as unknown) as () => ReduxState,
        selectSubmitAppFormState: () => 'PENDING',
      })()
      expect(afterClose).toHaveBeenCalled()
    })
  })
  test('handleUseEffect should run correctly', () => {
    const dispatch = jest.fn()
    handleUseEffect((dispatch as unknown) as Dispatch)()
    expect(dispatch).toHaveBeenCalledWith(submitAppSetFormState('PENDING'))
  })

  it('should match snapshot when visible = true', () => {
    const wrapper = shallow(<SubmitAppWizardModal visible={true} afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot when visible = true', () => {
    const wrapper = shallow(<SubmitAppWizardModal visible={false} afterClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
