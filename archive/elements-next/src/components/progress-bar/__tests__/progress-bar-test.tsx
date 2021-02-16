import React from 'react'
import { shallow } from 'enzyme'
import { ProgressBar } from '../progress-bar'

describe('ProgressBar', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<ProgressBar percentage={20} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot', () => {
    const wrapper = shallow(<ProgressBar percentage={-20} />)
    expect(wrapper).toMatchSnapshot()
  })
  it('should match snapshot', () => {
    const wrapper = shallow(<ProgressBar percentage={120} />)
    expect(wrapper).toMatchSnapshot()
  })
})
