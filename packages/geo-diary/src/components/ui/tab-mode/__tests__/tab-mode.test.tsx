import React from 'react'
import { shallow } from 'enzyme'
import { TabMode, handleChangeTabMode } from '../tab-mode'
import { AppTab } from '../../../../core/app-state'

jest.mock('../../../../core/app-state')

describe('TabMode', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<TabMode />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleChangeTabMode', () => {
  it('should run correctly', () => {
    const mockParams = {
      setAppState: jest.fn(),
      tab: 'LIST' as AppTab,
    }
    const curried = handleChangeTabMode(mockParams)
    curried()

    const newState = mockParams.setAppState.mock.calls[0][0]()
    expect(newState).toEqual({ tab: 'LIST' })
  })
})
