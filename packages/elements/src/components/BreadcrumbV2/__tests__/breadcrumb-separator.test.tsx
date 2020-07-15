import React from 'react'
import { shallow } from 'enzyme'
import { BreadcrumbSeparator } from '../breadcrumb-separator'

describe('breadcrumb-separator', () => {
  describe('BreadcrumbSeparator', () => {
    it('should match snapshot', () => {
      const mockProps = {
        style: { font: '1rem' },
        className: 'mockClassname',
      }
      const wrapper = shallow(<BreadcrumbSeparator {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        style: { font: '1rem' },
        className: 'mockClassname',
      }
      const wrapper = shallow(<BreadcrumbSeparator {...mockProps}>:</BreadcrumbSeparator>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
