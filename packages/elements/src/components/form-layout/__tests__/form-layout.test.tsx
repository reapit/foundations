import React from 'react'
import { render } from '../../../tests/react-testing'
import { FormLayout } from '..'
import { InputWrapMed, InputWrap, InputWrapFull } from '../form-layout'

describe('FormLayout component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<FormLayout />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('InputWrap component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<InputWrap />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('InputWrapMed component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<InputWrapMed />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('InputWrapFull component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<InputWrapFull />)
    expect(wrapper).toMatchSnapshot()
  })
})
