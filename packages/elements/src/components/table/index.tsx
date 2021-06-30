import React, { useState } from 'react'
import { ElTable } from './__styles__'
import { Icon, IconNames } from '../icon'
import {
  TableHeadersRow,
  TableHeader,
  TableRow,
  TableCell,
  TableExpandableRow,
  TableExpandableRowTriggerCell,
  TableRowContainer,
  NarrowOrderType,
} from './molecules'
import { Intent } from '../../helpers/intent'

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

export type NarrowOptionsType =  {
  showLabel?: boolean
  isFullWidth?: boolean
  order?: NarrowOrderType
}

export type Cell = {
  label: string
  value: string
  children?: React.ReactNode
  icon?: IconNames
  statusCircleIntent?: Intent
  cellHasDarkText?: boolean
  narrowTable?: NarrowOptionsType
}
export type Row = {
  cells: Cell[]
  expandableContent?: React.ReactNode
}
export interface ITable extends React.HTMLAttributes<HTMLDivElement> {
  rows?: Row[]
  expandableContentSize?: 'small' | 'medium' | 'large'
}

export * from './molecules'

export const Table: React.FC<ITable> = ({ rows, children, expandableContentSize, ...rest }) => {
  if (!rows)
    return (
      <ElTable data-expandable-content-size={expandableContentSize} {...rest}>
        {children}
      </ElTable>
    )

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
      data-has-expandable-action={hasExpandableRows}
      data-expandable-content-size={expandableContentSize}
    >
      <TableHeadersRow>
        {headers.map((header) => (
          <TableHeader key={header}>{header}</TableHeader>
        ))}
        {hasExpandableRows && (
          <TableHeader>
            <Icon icon="editSolidSystem" fontSize="1.2rem" />
          </TableHeader>
        )}
      </TableHeadersRow>
      {rows.map((row, index) => {
        const expandableRowIsOpen = expandedRow === index
        return (
          <TableRowContainer key={index} isOpen={expandableRowIsOpen}>
            <TableRow>
              {headers.map((header, headerIndex) => {
                const cell = row.cells.find((c) => c.label === header)
                if (!cell) return <TableCell />

                return (
                  <TableCell
                    key={`${headerIndex}-${index}`}
                    icon={cell.icon}
                    darkText={cell.cellHasDarkText}
                    narrowLabel={cell.narrowTable?.showLabel ? cell.label : undefined}
                    narrowIsFullWidth={cell.narrowTable?.isFullWidth}
                    narrowOrder={cell.narrowTable?.order}
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
          </TableRowContainer>
        )
      })}
    </ElTable>
  )
}
