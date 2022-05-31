import React from 'react'
import { render } from '@testing-library/react'
import { Pagination, PaginationProps, generatePagination } from '..'

const props: PaginationProps = {
  pageNumber: 4,
  pageSize: 10,
  totalCount: 999,
  onChange: jest.fn(),
}

describe('Pagination render test', () => {
  it('Should match a snapshot', () => {
    expect(render(<Pagination {...props} />)).toMatchSnapshot()
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
