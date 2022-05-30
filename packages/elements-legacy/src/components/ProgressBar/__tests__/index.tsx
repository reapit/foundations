import React from 'react'
import { render } from '../../../tests/react-testing'
import { ProgressBar, Filler } from '../.'

describe('ProgressBar', () => {
  describe('ProgressBar', () => {
    it('should match snapshot', () => {
      const mockProps = {
        percentage: 100,
      }
      const wrapper = render(<ProgressBar {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should run correctly when percentage < 0', () => {
      const mockProps = {
        percentage: -1,
      }
      const wrapper = render(<ProgressBar {...mockProps} />)
      expect(wrapper.find('Filler').prop('percentage')).toEqual(0)
    })

    it('should run correctly when percentage > 100', () => {
      const mockProps = {
        percentage: 101,
      }
      const wrapper = render(<ProgressBar {...mockProps} />)
      expect(wrapper.find('Filler').prop('percentage')).toEqual(100)
    })
  })
  describe('Filler', () => {
    const wrapper = render(<Filler percentage={100} />)
    expect(wrapper).toMatchSnapshot()
  })
})
