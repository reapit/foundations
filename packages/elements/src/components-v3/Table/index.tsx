import React, { useState } from 'react'
import { ElTable } from './__styles__'
import { Icon, IconNames } from '../Icon'
import {
  TableHeadersRow,
  TableHeader,
  TableRow,
  TableCell,
  TableExpandableRow,
  TableExpandableRowTriggerCell,
} from './molecules'
import { Intent } from '../../helpers/v3/intent'

const getHeadersFromRows = (rows: Row[]): string[] => {
  const headers = new Set()
  rows.forEach((row) =>
    row.cells.forEach((cell) => {
      // add all labels and the set will ensure uniqueness
      headers.add(cell.label)
    }),
  )
  return Array.from(headers) as string[]
}

export type Cell = {
  label: string
  value: string
  children: React.ReactNode
  icon?: IconNames
  statusCircleIntent?: Intent
  cellHasDarkText?: boolean
  narrowTable?: {
    showLabel?: boolean
    isFullWidth?: boolean
  }
}
export type Row = {
  cells: Cell[]
  expandableContent: React.ReactNode
}
export interface ITable extends React.HTMLAttributes<HTMLDivElement> {
  rows?: Row[]
}

export const Table: React.FC<ITable> = ({ rows, children, ...rest }) => {
  if (!rows) return <ElTable {...rest}>{children}</ElTable>

  const [expandedRow, setExpandedRow] = useState<false | number>(false)

  const headers = getHeadersFromRows(rows)
  const hasExpandableRows = rows.some((row) => !!row.expandableContent)
  const toggleExpandedRow = (index: number) => {
    expandedRow === index ? setExpandedRow(false) : setExpandedRow(index)
  }

  return (
    <ElTable
      {...rest}
      data-num-columns-excl-expandable-row-trigger-col={hasExpandableRows ? headers.length : undefined}
    >
      <TableHeadersRow>
        {headers.map((header) => (
          <TableHeader key={header}>{header}</TableHeader>
        ))}
        {hasExpandableRows && (
          <TableHeader>
            <Icon icon="solidEdit" fontSize="1.2rem" />
          </TableHeader>
        )}
      </TableHeadersRow>
      {rows.map((row, index) => {
        const expandableRowIsOpen = expandedRow === index
        return (
          <>
            <TableRow>
              {headers.map((header) => {
                const cell = row.cells.find((c) => c.label === header)
                if (!cell) return <TableCell />

                return (
                  <TableCell
                    key={index}
                    icon={cell.icon}
                    darkText={cell.cellHasDarkText}
                    narrowLabel={cell.narrowTable?.showLabel ? cell.label : undefined}
                    narrowIsFullWidth={cell.narrowTable?.isFullWidth}
                  >
                    {cell.children || cell.value}
                  </TableCell>
                )
              })}
              {row.expandableContent && (
                <TableExpandableRowTriggerCell isOpen={expandableRowIsOpen} onClick={() => toggleExpandedRow(index)} />
              )}
            </TableRow>
            {row.expandableContent && (
              <TableExpandableRow isOpen={expandableRowIsOpen}>{row.expandableContent}</TableExpandableRow>
            )}
          </>
        )
      })}
    </ElTable>
  )
}
