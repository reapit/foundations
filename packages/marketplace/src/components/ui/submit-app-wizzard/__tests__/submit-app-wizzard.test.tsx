import React from 'react'
import { SubmitAppWizzard, handleUpdateFormState } from '../submit-app-wizzard'
import { shallow } from 'enzyme'

jest.mock('react-redux', () => ({
  useSelector: () => false,
}))

describe('SubmitAppWizzard', () => {
  it('should match snapshot when visible = false', () => {
    const wrapper = shallow(<SubmitAppWizzard visible={false} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot when visible = true', () => {
    const wrapper = shallow(<SubmitAppWizzard visible={true} />)
    expect(wrapper).toMatchSnapshot()
  })
  test('handleUpdateFormState should run correctly', () => {
    const setFormState = jest.fn()
    const values = 'test'
    handleUpdateFormState(setFormState)(values)
    expect(setFormState).toHaveBeenCalledWith(values)
  })
})
