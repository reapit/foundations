import * as React from 'react'

export interface PaginationProps {
  pageNumber?: number
  pageSize?: number
  totalCount?: number
  onChange?: (page: number) => void
}

export const generatePagination = (currentPage: number, pageCount: number) => {
  const delta = 2

  let range: (number | string)[] = []
  for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
    range.push(i)
  }

  if (currentPage - delta > 2) {
    range.unshift('...')
  }
  if (currentPage + delta < pageCount - 1) {
    range.push('...')
  }

  range.unshift(1)
  range.push(pageCount)

  return range
}

export const Pagination = ({ onChange, pageNumber = 1, pageSize = 1, totalCount = 1 }: PaginationProps) => {
  const maxPage = Math.ceil(totalCount / pageSize)

  if (maxPage < 2) {
    return null
  }

  const paginator = generatePagination(pageNumber, maxPage)

  return (
    <div className="flex justify-center">
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        {
          <a
            onClick={e => {
              e.preventDefault()
              if (pageNumber >= 2 && onChange) {
                onChange(pageNumber - 1)
              }
            }}
            className={`pagination-previous ${pageNumber < 2 ? 'pagination-disabled' : ''}`}
          >
            Previous
          </a>
        }
        {
          <a
            onClick={e => {
              e.preventDefault()
              if (pageNumber + 1 <= maxPage && onChange) {
                onChange(pageNumber + 1)
              }
            }}
            className={`pagination-next  ${pageNumber + 1 > maxPage ? 'pagination-disabled' : ''}`}
          >
            Next page
          </a>
        }
        <ul className="pagination-list">
          {paginator.map((pg, i) => {
            if (pg === '...') {
              return (
                <li key={i}>
                  <span className="pagination-ellipsis has-text-grey">&hellip;</span>
                </li>
              )
            }

            return (
              <li key={i}>
                <a
                  className={'pagination-link' + (pg === pageNumber ? ' is-current' : '')}
                  onClick={e => {
                    e.preventDefault()
                    if (pg !== pageNumber && onChange) {
                      onChange(pg as number)
                    }
                  }}
                  aria-label={`Goto page ${pg}`}
                >
                  {pg}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
