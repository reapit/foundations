import { useTable } from 'react-table'
import * as React from 'react'
import { Loader } from '../Loader'

/**
 * React-table currently don't implement types
 *
 */
export interface TableProps {
  columns: any[]
  data: any[]
  loading?: boolean
  scrollable?: boolean
  bordered?: boolean
  striped?: boolean
  fullWidth?: boolean
}

export const Table = ({
  columns,
  data,
  loading,
  striped = true,
  fullWidth = true,
  scrollable = false,
  bordered = false,
}) => {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  const renderTable = () => (
    <table
      {...getTableProps()}
      className={`table ${striped ? 'is-striped' : ''} ${fullWidth ? 'is-fullwidth' : ''} ${
        bordered ? 'is-bordered' : ''
      }`}
    >
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((header, index) => (
              <th key={index} {...header.getHeaderProps()}>
                {header.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {loading ? (
          <div className="table-loading">
            <Loader />
          </div>
        ) : (
          rows.map(
            row =>
              prepareRow(row) || (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    const {
                      column: { columnProps },
                    } = cell
                    return (
                      <td key={index} {...cell.getCellProps()} {...columnProps}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              ),
          )
        )}
      </tbody>
    </table>
  )

  if (scrollable) {
    return <div className="table-responsive">{renderTable()}</div>
  }

  return renderTable()
}
