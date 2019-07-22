import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import { Link } from 'react-router-dom'

export interface PaginationProps {
  baseUrl: string
  pageNumber?: number
  pageSize?: number
  totalCount?: number
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

export const Pagination: React.FunctionComponent<PaginationProps> = ({
  baseUrl,
  pageNumber = 1,
  pageSize = 1,
  totalCount = 1
}) => {
  const maxPage = Math.ceil(totalCount / pageSize)

  if (maxPage < 2) {
    return null
  }

  const paginator = generatePagination(pageNumber, maxPage)

  return (
    <nav className={bulma.pagination + ' ' + bulma.isCentered} role="navigation" aria-label="pagination">
      {
        // @ts-ignore: skip bulma link disabled complaint
        <Link
          to={`${baseUrl}/${pageNumber - 1}`}
          onClick={e => {
            if (pageNumber < 2) {
              e.preventDefault()
            }
          }}
          className={bulma.paginationPrevious}
          disabled={pageNumber < 2}
        >
          Previous
        </Link>
      }
      {
        // @ts-ignore: skip bulma link disabled complaint
        <Link
          to={`${baseUrl}/${pageNumber + 1}`}
          onClick={e => {
            if (pageNumber + 1 > maxPage) {
              e.preventDefault()
            }
          }}
          className={bulma.paginationNext}
          disabled={pageNumber + 1 > maxPage}
        >
          Next page
        </Link>
      }
      <ul className={bulma.paginationList}>
        {paginator.map((pg, i) => {
          if (pg === '...') {
            return (
              <li key={i}>
                <span className={`${bulma.paginationEllipsis} ${bulma.hasTextGrey}`}>&hellip;</span>
              </li>
            )
          }

          return (
            <li key={i}>
              <Link
                to={`${baseUrl}/${pg}`}
                className={bulma.paginationLink + (pg === pageNumber ? ` ${bulma.isCurrent}` : '')}
                onClick={e => {
                  if (pg === pageNumber) {
                    e.preventDefault()
                  }
                }}
                aria-label={`Goto page ${pg}`}
              >
                {pg}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Pagination
