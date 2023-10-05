import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
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
  ElTableCtaIconContainer,
  ElTableCtaCell,
  ElTableSortHeader,
} from './__styles__'
import { Icon, IconNames } from '../icon'
import { elIsActive } from '../../styles/states'
import { FlexContainer } from '../layout'

export type NarrowOrderType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface TableCellProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  darkText?: boolean
  narrowLabel?: string
  narrowIsFullWidth?: boolean
  className?: string
  narrowOrder?: NarrowOrderType
}

export interface TableExpandableRowTriggerCellProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  narrowIsFullWidth?: boolean
}

export interface TableExpandableRowProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  className?: string
}

export interface TableRowContainerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
}

export interface TableCtaTriggerCellProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
}

export interface TableSortHeaderProps extends HTMLAttributes<HTMLDivElement> {
  direction: 'up' | 'down'
}

export const resolveNarrowOrderClass = (order: number): string | undefined => {
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

export const TableHeadersRow: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return <ElTableHeadersRow {...rest}>{children}</ElTableHeadersRow>
}

export const TableHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return <ElTableHeader {...rest}>{children}</ElTableHeader>
}

export const TableRow: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return <ElTableRow {...rest}>{children}</ElTableRow>
}

export const TableCell: FC<TableCellProps> = ({
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
      {icon && <Icon intent="default" icon={icon} />}
      <ElTableCellContent data-narrow-label={narrowLabel}>{children}</ElTableCellContent>
    </ElTableCell>
  )
}

export const TableExpandableRowTriggerCell: FC<TableExpandableRowTriggerCellProps> = ({
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
      {children ? children : <Icon intent={isOpen ? 'primary' : 'default'} icon="moreSolidSystem" />}
    </ElTableExpandableRowTriggerCell>
  )
}

export const TableCtaTriggerCell: FC<TableCtaTriggerCellProps> = ({ icon, children, ...rest }) => {
  return (
    <ElTableCtaCell {...rest}>
      {children ? (
        children
      ) : icon ? (
        <ElTableCtaIconContainer>
          <Icon icon={icon} fontSize="1.2rem" intent="default" />
        </ElTableCtaIconContainer>
      ) : (
        ''
      )}
    </ElTableCtaCell>
  )
}

export const TableExpandableRow: FC<TableExpandableRowProps> = ({ isOpen, className, children, ...rest }) => {
  const combinedClassname = cx(className, isOpen && elIsActive)
  return (
    <ElTableExpandableRow className={combinedClassname} {...rest}>
      <ElTableExpandableContainer>{children}</ElTableExpandableContainer>
    </ElTableExpandableRow>
  )
}

export const TableRowContainer: FC<TableRowContainerProps> = ({ isOpen, className, children, ...rest }) => {
  return (
    <ElTableRowContainer className={cx(className, isOpen && elIsActive)} {...rest}>
      {children}
    </ElTableRowContainer>
  )
}

export const TableSortHeader: FC<TableSortHeaderProps> = ({ children, ...rest }) => {
  return (
    <ElTableSortHeader {...rest}>
      <FlexContainer isFlexAlignCenter isFlexJustifyBetween>
        {children}
        <Icon icon="sortSolidSystem" intent="default" />
      </FlexContainer>
    </ElTableSortHeader>
  )
}
