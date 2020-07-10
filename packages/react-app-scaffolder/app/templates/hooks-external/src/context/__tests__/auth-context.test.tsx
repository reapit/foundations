import React from 'react'
import { shallow } from 'enzyme'
import AuthContext from '../auth-context'
import { mockContext } from '../__mocks__/mock-context'

describe('auth-context', () => {
  it('should return correctly', () => {
    const wrapper = shallow(<AuthContext.Provider value={mockContext} />)
    expect(wrapper).toMatchSnapshot()
  })
})
