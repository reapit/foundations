import React from 'react'
import { render } from '../../../tests/react-testing'
import { renderLinks, BreadcrumbItem } from '../breadcrumb-item'

describe('breadcrumb-item', () => {
  describe('renderLinks', () => {
    it('should run correctly and match snapshot', () => {
      const mockProps = {
        children: <span>Test</span>,
        href: '#123',
        onClick: jest.fn(),
        style: { fontSize: '10rem' },
        isCurrent: true,
        className: 'mockClassName',
        isLast: true,
      }
      const wrapper = render(<div>{renderLinks(mockProps)}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should run correctly and match snapshot when no href', () => {
      const mockProps = {
        children: <span>Test</span>,
        href: '#123',
        onClick: jest.fn(),
        style: { fontSize: '10rem' },
        isCurrent: false,
        className: 'mockClassName',
        isLast: false,
      }
      const wrapper = render(<div>{renderLinks(mockProps)}</div>)
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
      const wrapper = render(<BreadcrumbItem {...mockProps} />)
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
      const wrapper = render(<BreadcrumbItem {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        href: '#',
        onClick: () => null,
        className: 'mockClassName',
      }
      const wrapper = render(<BreadcrumbItem {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        href: '#',
        onClick: () => null,
        className: 'mockClassName',
      }
      const wrapper = render(<BreadcrumbItem {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        href: '#',
        onClick: () => null,
        className: 'mockClassName',
      }
      const wrapper = render(
        <BreadcrumbItem {...mockProps}>
          <div>Application</div>
        </BreadcrumbItem>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
