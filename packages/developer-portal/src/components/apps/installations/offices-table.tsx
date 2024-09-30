import React, { FC } from 'react'
import { Platform } from '@reapit/foundations-ts-definitions'
import {
  Table,
  Subtitle,
  BodyText,
  elMb11,
  elMt5,
  TableHeadersRow,
  TableHeader,
  TableRowContainer,
  TableRow,
  TableCell,
} from '@reapit/elements'

export interface OfficesTableProps {
  offices: Platform.OfficeModel[]
}

export const OfficesTable: FC<OfficesTableProps> = ({ offices }) => (
  <div className={elMt5}>
    <Subtitle>Total Offices</Subtitle>
    <BodyText hasGreyText>{offices.length}</BodyText>
    <Table className={elMb11} data-num-columns-excl-action-col="2" data-has-expandable-action="false">
      <TableHeadersRow>
        <TableHeader>Office Name</TableHeader>
        <TableHeader>Office ID</TableHeader>
        <TableHeader />
      </TableHeadersRow>
      {offices.map(({ name, id }) => (
        <TableRowContainer key={id}>
          <TableRow>
            <TableCell>{name}</TableCell>
            <TableCell>{id}</TableCell>
          </TableRow>
        </TableRowContainer>
      ))}
    </Table>
  </div>
)
