import React from 'react'
import { shallow } from 'enzyme'
import { FormLayout } from '..'
import { InputWrapMed, InputWrap, InputWrapFull } from '../form-layout'

describe('FormLayout component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<FormLayout />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('InputWrap component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<InputWrap />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('InputWrapMed component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<InputWrapMed />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('InputWrapFull component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<InputWrapFull />)
    expect(wrapper).toMatchSnapshot()
  })
})
