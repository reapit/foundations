import React from 'react'
import { shallow } from 'enzyme'
import AppError from './AppError'

describe('AppError', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AppError />)
    expect(wrapper).toMatchSnapshot()
  })
})
