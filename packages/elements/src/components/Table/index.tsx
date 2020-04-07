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
  maxHeight?: number
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading,
  striped = true,
  fullWidth = true,
  scrollable = false,
  bordered = false,
  maxHeight,
}) => {
  // Use the state and functions returned from useTable to build your UI
  const chiendo = useTable({
    columns,
    data,
  })
  const { getTableProps, headerGroups, footerGroups, rows, prepareRow } = chiendo

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
      {footerGroups && (
        <tfoot>
          {footerGroups.map((footerGroup, index) => (
            <tr key={index} {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column, index) => (
                <th key={index} {...column.getFooterProps()}>
                  {column.render('Footer')}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      )}
    </table>
  )

  if (scrollable) {
    return (
      <div className="table-responsive">
        <div style={{ maxHeight: maxHeight }}>{renderTable()}</div>
      </div>
    )
  }

  return renderTable()
}
