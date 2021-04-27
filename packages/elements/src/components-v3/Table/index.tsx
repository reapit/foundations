import * as React from 'react'
// import { cx } from 'linaria'
import { ElTable, ElTableHeaders, ElTableHeader, ElTableRow, ElTableCell, ElTableExpandableCell } from './__styles__'

export interface ITable extends React.HTMLAttributes<HTMLDivElement> {}

export const Table: React.FC<ITable> = ({ children, ...rest }) => {
  return <ElTable {...rest}>{children}</ElTable>
}
export const TableHeaders: React.FC = ({ children, ...rest }) => {
  return <ElTableHeaders {...rest}>{children}</ElTableHeaders>
}
export const TableHeader: React.FC = ({ children, ...rest }) => {
  return <ElTableHeader {...rest}>{children}</ElTableHeader>
}
export const TableRow: React.FC = ({ children, ...rest }) => {
  return <ElTableRow {...rest}>{children}</ElTableRow>
}
export const TableCell: React.FC = ({ children, ...rest }) => {
  return <ElTableCell {...rest}>{children}</ElTableCell>
}
export const TableExpandableCell: React.FC = ({ children, ...rest }) => {
  return <ElTableExpandableCell {...rest}>{children}</ElTableExpandableCell>
}
