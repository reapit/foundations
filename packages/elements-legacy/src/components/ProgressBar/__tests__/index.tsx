import React from 'react'
import { render } from '@testing-library/react'
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
  })
  describe('Filler', () => {
    const wrapper = render(<Filler percentage={100} />)
    expect(wrapper).toMatchSnapshot()
  })
})
