import React, { useState } from 'react'
import { render } from '../../../tests/react-testing'
import toJson from 'enzyme-to-json'
import { Pagination, PaginationProps, generatePagination } from '..'

const props: PaginationProps = {
  pageNumber: 4,
  pageSize: 10,
  totalCount: 999,
  onChange: jest.fn(),
}

describe('Pagination render test', () => {
  it('Should match a snapshot', () => {
    expect(toJson(render(<Pagination {...props} />))).toMatchSnapshot()
  })

  it('Page 4 should be the current', () => {
    const wrapper = render(<Pagination {...props} />)
    expect(wrapper.find('[aria-label="Goto page 4"]').hasClass('is-current')).toBeTruthy()
  })

  it('onChange should only be called on not a is-current button', () => {
    const wrapper = render(<Pagination {...props} />)
    const event = { preventDefault: jest.fn() }
    wrapper.find('[aria-label="Goto page 4"]').simulate('click', event)
    wrapper.find('[aria-label="Goto page 2"]').simulate('click', event)
    wrapper.find('.pagination-next').simulate('click', event)
    wrapper.find('.pagination-previous').simulate('click', event)
    expect(props.onChange).toHaveBeenCalledTimes(3)
  })
})

const PaginatorBehaviorTest = () => {
  const [pageNumber, setPageNumber] = useState(1)
  return <Pagination pageNumber={pageNumber} onChange={setPageNumber} pageSize={10} totalCount={100} />
}

describe('Pagination behavior test', () => {
  it('Previous/Next button should work as expected', () => {
    const wrapper = render(<PaginatorBehaviorTest />)
    expect(wrapper.find('[aria-label="Goto page 1"]').hasClass('is-current')).toBeTruthy()
    wrapper.find('.pagination-next').simulate('click').simulate('click')
    expect(wrapper.find('[aria-label="Goto page 3"]').hasClass('is-current')).toBeTruthy()
    wrapper.find('.pagination-previous').simulate('click')
    expect(wrapper.find('[aria-label="Goto page 2"]').hasClass('is-current')).toBeTruthy()
  })

  it('Paging button should work as expected', () => {
    const wrapper = render(<PaginatorBehaviorTest />)
    expect(wrapper.find('[aria-label="Goto page 2"]').hasClass('is-current')).not.toBeTruthy()
    wrapper.find('[aria-label="Goto page 2"]').simulate('click')
    expect(wrapper.find('[aria-label="Goto page 2"]').hasClass('is-current')).toBeTruthy()
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
