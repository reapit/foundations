import React, { Dispatch, FC, HTMLAttributes, ReactNode, SetStateAction, useState } from 'react'
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
  TableCtaTriggerCell,
} from './molecules'
import { Intent } from '../../helpers/intent'

export type NarrowOptionsType = {
  showLabel?: boolean
  isFullWidth?: boolean
  order?: NarrowOrderType
}

export interface CellProps {
  label: string
  labelChild?: ReactNode
  onLabelClick?: (event: React.MouseEvent) => void
  value?: ReactNode
  children?: ReactNode
  icon?: IconNames
  className?: string
  statusCircleIntent?: Intent
  cellHasDarkText?: boolean
  narrowTable?: NarrowOptionsType
}

export interface RowActionProps {
  content?: ReactNode
  cellContent?: ReactNode
  headerContent?: ReactNode
  onClick?: () => void
  className?: string
  icon?: IconNames
}

export interface RowProps {
  cells: CellProps[]
  expandableContent?: RowActionProps
  ctaContent?: RowActionProps
}

export interface TableProps extends HTMLAttributes<HTMLDivElement> {
  rows?: RowProps[]
  numberColumns?: number
  indexExpandedRow?: number | null
  setIndexExpandedRow?: Dispatch<SetStateAction<number | null>>
}

export const handleToggleExpandedRow = (
  index: number | null,
  expandedRow: number | null,
  setExpandedRow: Dispatch<SetStateAction<number | null>>,
  indexExpandedRow?: number | null,
  setIndexExpandedRow?: Dispatch<SetStateAction<number | null>>,
) => () => {
  if (indexExpandedRow !== undefined && setIndexExpandedRow) {
    indexExpandedRow === index ? setIndexExpandedRow(null) : setIndexExpandedRow(index)
  } else {
    expandedRow === index ? setExpandedRow(null) : setExpandedRow(index)
  }
}

export const Table: FC<TableProps> = ({
  rows,
  children,
  numberColumns,
  indexExpandedRow,
  setIndexExpandedRow,
  ...rest
}) => {
  const firstRow = rows?.[0]
  const [expandedRow, setExpandedRow] = useState<null | number>(null)

  if (!rows || !firstRow) return <ElTable {...rest}>{children}</ElTable>

  const hasExpandableRows = rows.some((row) => Boolean(row.expandableContent))
  const hasCallToAction = rows.some((row) => Boolean(row.ctaContent))

  return (
    <ElTable
      {...rest}
      data-num-columns-excl-action-col={
        (hasExpandableRows || hasCallToAction) && numberColumns
          ? numberColumns - 1
          : numberColumns
          ? numberColumns - 1
          : hasExpandableRows
          ? firstRow.cells.length
          : undefined
      }
      data-has-expandable-action={hasExpandableRows}
      data-has-call-to-action={hasCallToAction}
    >
      <TableHeadersRow>
        {firstRow.cells.map((cell) => (
          <TableHeader
            className={cell.className}
            key={cell.label?.toString()}
            onClick={(event) => {
              if (cell.onLabelClick) {
                cell.onLabelClick(event)
              }
            }}
          >
            {cell.labelChild || cell.label}
          </TableHeader>
        ))}
        {hasExpandableRows && (
          <TableHeader>
            {firstRow.expandableContent?.headerContent ? (
              <>{firstRow.expandableContent?.headerContent}</>
            ) : (
              <Icon icon="settingsSolidSystem" intent="default" fontSize="1.2rem" />
            )}
          </TableHeader>
        )}
        {hasCallToAction && (
          <TableHeader>
            {firstRow.ctaContent?.headerContent ? (
              <>{firstRow.ctaContent?.headerContent}</>
            ) : (
              <Icon icon="settingsSolidSystem" intent="default" fontSize="1.2rem" />
            )}
          </TableHeader>
        )}
      </TableHeadersRow>
      {rows.map((row, index) => {
        const expandableRowIsOpen = indexExpandedRow !== undefined ? indexExpandedRow === index : expandedRow === index
        return (
          <TableRowContainer key={index} isOpen={expandableRowIsOpen}>
            <TableRow>
              {row.cells.map((cell, cellIndex) => {
                if (!cell) return <TableCell key={`${cellIndex}-${index}`} />

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
                    row.expandableContent.onClick
                      ? row.expandableContent.onClick
                      : handleToggleExpandedRow(
                          index,
                          expandedRow,
                          setExpandedRow,
                          indexExpandedRow,
                          setIndexExpandedRow,
                        )
                  }
                >
                  {row.expandableContent.cellContent}
                </TableExpandableRowTriggerCell>
              )}
              {row.ctaContent && (
                <TableCtaTriggerCell
                  className={row.ctaContent.className}
                  icon={row.ctaContent.icon}
                  onClick={row.ctaContent.onClick}
                >
                  {row.ctaContent.cellContent}
                </TableCtaTriggerCell>
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
