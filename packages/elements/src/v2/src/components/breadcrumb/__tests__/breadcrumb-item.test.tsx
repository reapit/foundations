import React from 'react'
import { shallow } from 'enzyme'
import { renderLinks, BreadcrumbItem } from '../breadcrumb-item'

describe('breadcrumb-item', () => {
  describe('renderLinks', () => {
    it('should run correctly and match snapshot', () => {
      const mockOnClick = jest.fn()
      const wrapper = shallow(<div>{renderLinks(null, '#123', mockOnClick, true)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should run correctly and match snapshot when no href', () => {
      const mockOnClick = jest.fn()
      const wrapper = shallow(<div>{renderLinks(null, undefined, mockOnClick, true)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('BreadcrumbItem', () => {
    it('should match snapshot when full props', () => {
      const mockProps = {
        separator: '/',
        href: '#',
        onClick: () => null,
        isLast: true,
        isCurrent: true,
        className: 'mockClassName',
        style: { font: '10rem' },
      }
      const wrapper = shallow(<BreadcrumbItem {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        href: '#',
        onClick: () => null,
        isLast: false,
        isCurrent: false,
        className: 'mockClassName',
        style: { font: '10rem' },
      }
      const wrapper = shallow(<BreadcrumbItem {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        href: '#',
        onClick: () => null,
        className: 'mockClassName',
      }
      const wrapper = shallow(<BreadcrumbItem {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        href: '#',
        onClick: () => null,
        className: 'mockClassName',
      }
      const wrapper = shallow(<BreadcrumbItem {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        href: '#',
        onClick: () => null,
        className: 'mockClassName',
      }
      const wrapper = shallow(
        <BreadcrumbItem {...mockProps}>
          <div>Application</div>
        </BreadcrumbItem>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
