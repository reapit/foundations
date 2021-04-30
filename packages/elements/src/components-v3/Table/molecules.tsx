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
  elTableCellIsDarkText,
  elTableNarrowCellIsFullWidth,
} from './__styles__'
import { Icon, IconNames } from '../Icon'
import { elIsActive } from '../../styles-v3/base/states'

export const TableHeadersRow: React.FC = ({ children, ...rest }) => {
  return <ElTableHeadersRow {...rest}>{children}</ElTableHeadersRow>
}

export const TableHeader: React.FC = ({ children, ...rest }) => {
  return <ElTableHeader {...rest}>{children}</ElTableHeader>
}

export const TableRow: React.FC = ({ children, ...rest }) => {
  return <ElTableRow {...rest}>{children}</ElTableRow>
}

export interface ITableCell extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  darkText?: boolean
  narrowLabel?: string
  narrowIsFullWidth?: boolean
  className?: string
}
export const TableCell: React.FC<ITableCell> = ({
  icon,
  darkText,
  narrowLabel,
  narrowIsFullWidth,
  className,
  children,
  ...rest
}) => {
  const combinedClassname = cx(
    className,
    darkText && elTableCellIsDarkText,
    narrowIsFullWidth && elTableNarrowCellIsFullWidth,
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
}
export const TableExpandableRowTriggerCell: React.FC<ITableExpandableRowTriggerCell> = ({
  isOpen,
  children,
  ...rest
}) => {
  return (
    <ElTableExpandableRowTriggerCell {...rest}>
      <Icon intent={isOpen ? 'primary' : 'secondary'} icon={isOpen ? 'arrowUp' : 'solidDown'} />
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
      {children}
    </ElTableExpandableRow>
  )
}
