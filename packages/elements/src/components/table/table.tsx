import React, { FC, HTMLAttributes, ReactNode, useState } from 'react'
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

export type NarrowOptionsType = {
  showLabel?: boolean
  isFullWidth?: boolean
  order?: NarrowOrderType
}

export type Cell = {
  label: string
  value: string
  children?: ReactNode
  icon?: IconNames
  className?: string
  statusCircleIntent?: Intent
  cellHasDarkText?: boolean
  narrowTable?: NarrowOptionsType
}

export type Row = {
  cells: Cell[]
  expandableContent?: {
    content?: ReactNode
    cellContent?: ReactNode
    headerContent?: ReactNode
    isCallToAction?: boolean
    onClick?: () => void
    className?: string
  }
}

export type ExpandableContentSize = 'small' | 'medium' | 'large'

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  rows?: Row[]
  numberColumns?: number
  expandableContentSize?: ExpandableContentSize
}

export const Table: FC<TableProps> = ({ rows, children, numberColumns, expandableContentSize, ...rest }) => {
  const firstRow = rows?.[0]
  if (!rows || !firstRow)
    return (
      <ElTable data-expandable-content-size={expandableContentSize} {...rest}>
        {children}
      </ElTable>
    )

  const [expandedRow, setExpandedRow] = useState<false | number>(false)
  const hasExpandableRows = rows.some((row) => Boolean(row.expandableContent))
  const hasCallToAction = rows.some((row) => Boolean(row.expandableContent?.isCallToAction))
  const toggleExpandedRow = (index: number) => {
    expandedRow === index ? setExpandedRow(false) : setExpandedRow(index)
  }

  return (
    <ElTable
      {...rest}
      data-num-columns-excl-expandable-row-trigger-col={
        hasExpandableRows && numberColumns
          ? numberColumns - 1
          : numberColumns
          ? numberColumns - 1
          : hasExpandableRows
          ? firstRow.cells.length
          : undefined
      }
      data-has-expandable-action={hasExpandableRows}
      data-has-call-to-action={hasCallToAction}
      data-expandable-content-size={expandableContentSize}
    >
      <TableHeadersRow>
        {firstRow.cells.map((cell) => (
          <TableHeader className={cell.className} key={cell.label}>
            {cell.label}
          </TableHeader>
        ))}
        {hasExpandableRows && (
          <TableHeader>
            {firstRow.expandableContent?.headerContent ? (
              <>{firstRow.expandableContent?.headerContent}</>
            ) : (
              <Icon icon="settingsSystem" fontSize="1.2rem" />
            )}
          </TableHeader>
        )}
      </TableHeadersRow>
      {rows.map((row, index) => {
        const expandableRowIsOpen = expandedRow === index
        return (
          <TableRowContainer key={index} isOpen={expandableRowIsOpen}>
            <TableRow>
              {row.cells.map((cell, cellIndex) => {
                if (!cell) return <TableCell />

                return (
                  <TableCell
                    className={cell.className}
                    key={`${cellIndex}-${index}`}
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
                <TableExpandableRowTriggerCell
                  className={row.expandableContent.className}
                  isOpen={expandableRowIsOpen}
                  onClick={
                    row.expandableContent.onClick ? row.expandableContent.onClick : () => toggleExpandedRow(index)
                  }
                >
                  {row.expandableContent.cellContent}
                </TableExpandableRowTriggerCell>
              )}
            </TableRow>
            {row.expandableContent && row.expandableContent.content && (
              <TableExpandableRow isOpen={expandableRowIsOpen}>{row.expandableContent.content}</TableExpandableRow>
            )}
          </TableRowContainer>
        )
      })}
    </ElTable>
  )
}
