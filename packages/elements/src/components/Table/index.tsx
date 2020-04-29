import { useTable, useExpanded } from 'react-table'
import * as React from 'react'
import { Loader } from '../Loader'
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa'

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
  expandable?: boolean
}

const renderExpanderCell = row => {
  return row.canExpand ? (
    <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? <FaMinusSquare /> : <FaPlusSquare />}</span>
  ) : null
}

const expanderColumn = {
  id: 'expander', // id is required for expander column
  columnProps: {
    width: 20,
  },
  Cell: ({ row }) => {
    return renderExpanderCell(row)
  },
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
  expandable,
}) => {
  if (expandable) {
    columns.unshift(expanderColumn)
  }
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, footerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useExpanded,
  )
  const hasFooter = columns.some(item => item.Footer)

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
                <tr {...row.getRowProps()} className={`${row.isExpanded ? 'is-expanded' : ''}`}>
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
      {footerGroups && hasFooter && (
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
