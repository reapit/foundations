import React from 'react'
import { shallow } from 'enzyme'
import { AMLProgressBar, calculateProgress } from '../aml-progressbar'
import { sectionsStatus } from '@/sagas/__stubs__/status'

describe('AMLProgressBar', () => {
  describe('AMLProgressBar', () => {
    it('should match snapshot', () => {
      const mockProps = {
        title: 'Mock title',
        status: sectionsStatus
      }
      const wrapper = shallow(<AMLProgressBar {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('calculateProgress', () => {
    const result = calculateProgress(sectionsStatus)
    const expected = { percentage: 37, completed: 3, total: 8 }
    expect(result).toEqual(expected)
  })
})
