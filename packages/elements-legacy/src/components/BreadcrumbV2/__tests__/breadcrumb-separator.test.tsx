import React from 'react'
import { render } from '@testing-library/react'
import { BreadcrumbSeparator } from '../breadcrumb-separator'

describe('breadcrumb-separator', () => {
  describe('BreadcrumbSeparator', () => {
    it('should match snapshot', () => {
      const mockProps = {
        style: { font: '1rem' },
        className: 'mockClassname',
      }
      const wrapper = render(<BreadcrumbSeparator {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        style: { font: '1rem' },
        className: 'mockClassname',
      }
      const wrapper = render(<BreadcrumbSeparator {...mockProps}>:</BreadcrumbSeparator>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
