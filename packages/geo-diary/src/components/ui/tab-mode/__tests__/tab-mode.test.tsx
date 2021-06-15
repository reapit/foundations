import React, { ChangeEvent } from 'react'
import { shallow } from 'enzyme'
import { TabMode, handleChangeTabMode } from '../tab-mode'

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
    }
    const curried = handleChangeTabMode(mockParams)
    const event = { currentTarget: { value: 'LIST' } } as ChangeEvent<HTMLInputElement>
    curried(event)

    const newState = mockParams.setAppState.mock.calls[0][0]()
    expect(newState).toEqual({ tab: 'LIST' })
  })
})
