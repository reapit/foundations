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
    darkText && elTableCellHasDarkText,
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
    <ElTableExpandableRowTriggerCell className={cx(className, narrowIsFullWidth && elTableNarrowCellIsFullWidth)} {...rest}>
      <Icon intent={isOpen ? 'primary' : 'secondary'} icon={isOpen ? 'arrowUpSystem' : 'solidDownSystem'} />
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
