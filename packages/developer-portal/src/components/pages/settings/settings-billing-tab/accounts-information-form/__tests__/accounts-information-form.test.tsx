import React from 'react'
import { shallow } from 'enzyme'
import AccountsInformationForm, {
  handleUseEffect,
  onSubmit,
  AccountsInformationFormValues,
} from '../accounts-information-form'
import { updateDeveloperData } from '@/actions/settings'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('AccountsInformationForm', () => {
  test('onSubmit should run correctly', () => {
    const dispatch = jest.fn()
    const value = ('value' as unknown) as DeveloperModel
    onSubmit(dispatch)(value as AccountsInformationFormValues)
    expect(dispatch).toHaveBeenCalledWith(updateDeveloperData(value))
  })

  describe('handleUseEffect', () => {
    it("shouldn't dispatch(fetchMyIdentity()) when prod", () => {
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
