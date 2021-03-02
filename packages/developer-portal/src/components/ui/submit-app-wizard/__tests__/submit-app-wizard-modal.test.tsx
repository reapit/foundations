import { SubmitAppWizardModal, handleUseEffect } from '../submit-app-wizard-modal'
import React from 'react'
import { shallow } from 'enzyme'
import { Dispatch } from 'redux'
import { fetchScopeList } from '@/actions/scopes'
jest.mock('../steps/step-submit-app-success', () => ({
  onFinish: jest.fn().mockImplementation((fn) => fn),
}))

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Object),
  useDispatch: jest.fn(),
}))

describe('SubmitAppWizardModal', () => {
  test('handleUseEffect should run correctly', () => {
    const dispatch = jest.fn()
    handleUseEffect((dispatch as unknown) as Dispatch)()
    expect(dispatch).toHaveBeenCalledWith(fetchScopeList())
  })

  it('should match snapshot when visible = true', () => {
    const wrapper = shallow(<SubmitAppWizardModal visible={true} onClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot when visible = true', () => {
    const wrapper = shallow(<SubmitAppWizardModal visible={false} onClose={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})
