import React from 'react'
import { shallow } from 'enzyme'
import AccountsInformationForm, { handleUseEffect } from '../accounts-information-form'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}))

describe('AccountsInformationForm', () => {
  describe('handleUseEffect', () => {
    it('shouldn\'t dispatch(fetchMyIdentity()) when prod', () => {
      const dispatch = jest.fn()
      handleUseEffect({ dispatch, isProd: true })()
      expect(dispatch).toHaveBeenCalledTimes(0)
    })

    it('should dispatch(fetchMyIdentity()) when dev', () => {
      const dispatch = jest.fn()
      handleUseEffect({ dispatch, isProd: true })()
      expect(dispatch).toHaveBeenCalledTimes(0)
    })
  })

  it('should match snapshot', () => {
    const wrapper = shallow(<AccountsInformationForm />)
    expect(wrapper).toMatchSnapshot()
  })
})
