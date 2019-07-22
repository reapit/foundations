import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Pagination, { PaginationProps, generatePagination } from '../pagination'

const props: PaginationProps = {
  baseUrl: '/page',
  pageNumber: 4,
  pageSize: 10,
  totalCount: 999
}

describe('Pagination', () => {
  it('Should match a snapshot', () => {
    expect(toJson(shallow(<Pagination {...props} />))).toMatchSnapshot()
  })

  it('Page 4 should be the current', () => {
    const wrapper = shallow(<Pagination {...props} />)
    expect(wrapper.find('[aria-label="Goto page 4"]').hasClass('isCurrent')).toBeTruthy()
  })

  it('Page 4 should have link /page/4', () => {
    const wrapper = shallow(<Pagination {...props} />)
    expect(wrapper.find('[aria-label="Goto page 4"]').prop('to')).toBe('/page/4')
  })

  it('Previous link should be /3 and next link should be /5', () => {
    const wrapper = shallow(<Pagination {...props} />)
    const previousLink = wrapper.find('.paginationPrevious')
    expect(previousLink.props().to).toBe('/page/3')
    const nextLink = wrapper.find('.paginationNext')
    expect(nextLink.props().to).toBe('/page/5')
  })
})

describe('generatePagination', () => {
  it('Should always generate the first, last page & current page', () => {
    const paginator = generatePagination(99, 9999)
    expect(paginator[0]).toBe(1)
    expect(paginator[paginator.length - 1]).toBe(9999)
    expect(paginator).toContain(99)
  })

  it('Should generate a maximum of 9 items', () => {
    expect(generatePagination(5, 9999)).toHaveLength(9)
  })
})
