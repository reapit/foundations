import React from 'react'
import { cx } from 'linaria'
import {
  ElTableHeadersRow,
  ElTableHeader,
  ElTableRow,
  ElTableCell,
  ElTableCellContent,
  ElTableExpandableRowTriggerCell,
  ElTableExpandableRow,
  elTableCellHasDarkText,
  elTableNarrowCellIsFullWidth,
  ElTableRowContainer,
  ElTableExpandableContainer,
  ElTableCellNarrowOrder1,
  ElTableCellNarrowOrder2,
  ElTableCellNarrowOrder3,
  ElTableCellNarrowOrder4,
  ElTableCellNarrowOrder5,
  ElTableCellNarrowOrder6,
  ElTableCellNarrowOrder7,
  ElTableCellNarrowOrder8,
  ElTableCellNarrowOrder9,
  ElTableCellNarrowOrder10,
  ElTableCellNarrowOrder11,
  ElTableCellNarrowOrder12,
} from './__styles__'
import { Icon, IconNames } from '../icon'
import { elIsActive } from '../../styles/states'

export const TableHeadersRow: React.FC = ({ children, ...rest }) => {
  return <ElTableHeadersRow {...rest}>{children}</ElTableHeadersRow>
}

export const TableHeader: React.FC = ({ children, ...rest }) => {
  return <ElTableHeader {...rest}>{children}</ElTableHeader>
}

export const TableRow: React.FC = ({ children, ...rest }) => {
  return <ElTableRow {...rest}>{children}</ElTableRow>
}

const resolveNarrowOrderClass = (order: number): string | undefined => {
  switch (order) {
    case 1:
      return ElTableCellNarrowOrder1
    case 2:
      return ElTableCellNarrowOrder2
    case 3:
      return ElTableCellNarrowOrder3
    case 4:
      return ElTableCellNarrowOrder4
    case 5:
      return ElTableCellNarrowOrder5
    case 6:
      return ElTableCellNarrowOrder6
    case 7:
      return ElTableCellNarrowOrder7
    case 8:
      return ElTableCellNarrowOrder8
    case 9:
      return ElTableCellNarrowOrder9
    case 10:
      return ElTableCellNarrowOrder10
    case 11:
      return ElTableCellNarrowOrder11
    case 12:
      return ElTableCellNarrowOrder12
  }
}

export type NarrowOrderType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface ITableCell extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  darkText?: boolean
  narrowLabel?: string
  narrowIsFullWidth?: boolean
  className?: string
  narrowOrder?: NarrowOrderType
}
export const TableCell: React.FC<ITableCell> = ({
  icon,
  darkText,
  narrowLabel,
  narrowIsFullWidth,
  className,
  children,
  narrowOrder,
  ...rest
}) => {
  const combinedClassname = cx(
    className,
    darkText && elTableCellHasDarkText,
    narrowIsFullWidth && elTableNarrowCellIsFullWidth,
    narrowOrder && resolveNarrowOrderClass(narrowOrder),
  )
  return (
    <ElTableCell className={combinedClassname} {...rest}>
      {icon && <Icon intent="secondary" icon={icon} />}
      <ElTableCellContent data-narrow-label={narrowLabel}>{children}</ElTableCellContent>
    </ElTableCell>
  )
}

export interface ITableExpandableRowTriggerCell extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  narrowIsFullWidth?: boolean
}
export const TableExpandableRowTriggerCell: React.FC<ITableExpandableRowTriggerCell> = ({
  isOpen,
  narrowIsFullWidth,
  className,
  children,
  ...rest
}) => {
  return (
    <ElTableExpandableRowTriggerCell
      className={cx(className, narrowIsFullWidth && elTableNarrowCellIsFullWidth)}
      {...rest}
    >
      <Icon intent={isOpen ? 'primary' : 'secondary'} icon={isOpen ? 'arrowUpSystem' : 'arrowDownSystem'} />
      {children}
    </ElTableExpandableRowTriggerCell>
  )
}

export interface ITableExpandableRow extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  className?: string
}
export const TableExpandableRow: React.FC<ITableExpandableRow> = ({ isOpen, className, children, ...rest }) => {
  const combinedClassname = cx(className, isOpen && elIsActive)
  return (
    <ElTableExpandableRow className={combinedClassname} {...rest}>
      <ElTableExpandableContainer>{children}</ElTableExpandableContainer>
    </ElTableExpandableRow>
  )
}

export interface ITableRowContainer extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
}

export const TableRowContainer: React.FC<ITableRowContainer> = ({ isOpen, className, children, ...rest }) => {
  return (
    <ElTableRowContainer className={cx(className, isOpen && elIsActive)} {...rest}>
      {children}
    </ElTableRowContainer>
  )
}
