import React from 'react'
import { shallow } from 'enzyme'
import { AMLProgressBar, calculateProgress } from '../aml-progressbar'

describe('AMLProgressBar', () => {
  describe('AMLProgressBar', () => {
    it('should match snapshot', () => {
      const mockProps = {
        title: 'Mock title'
      }
      const wrapper = shallow(<AMLProgressBar {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('calculateProgress', () => {
    const result = calculateProgress()
    const expected = { percentage: 50, completed: 2, total: 7 }
    expect(result).toEqual(expected)
  })
})
