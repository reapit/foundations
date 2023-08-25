import React, { FC } from 'react'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import {
  PersistentNotification,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  Subtitle,
  BodyText,
  Grid,
  Col,
} from '@reapit/elements'
import { threeColTable } from './__styles__'

export interface UsageTableProps {
  billing: BillingBreakdownForMonthV2Model | null
}

export const UsageTable: FC<UsageTableProps> = ({ billing }) => {
  const apiCalls = billing?.services?.find((item) => item.name === 'API Requests')?.items ?? []
  return apiCalls.length ? (
    <>
      <Grid>
        <Col>
          <Subtitle>Billable Amount</Subtitle>
          <BodyText hasGreyText>£{billing?.totalCost?.toFixed(2).padStart(2, '0')}</BodyText>
        </Col>
        <Col>
          <Subtitle>Actual Cost</Subtitle>
          <BodyText hasGreyText>£{billing?.actualCost?.toFixed(2).padStart(2, '0')}</BodyText>
        </Col>
      </Grid>
      <Subtitle>Breakdown</Subtitle>

      <Table
        rows={apiCalls.map(({ name, amount, cost, itemCount, items }) => ({
          cells: [
            {
              label: 'Entity Name',
              value: name ?? '',
              icon: 'homeSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Total Number Calls',
              value: String(amount) ?? '',
              icon: 'homeSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Total Cost',
              value: cost ? `£${cost.toFixed(2).padStart(2, '0')}` : '£0',
              icon: 'homeSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Total Number Endpoints',
              value: String(itemCount) ?? '',
              icon: 'homeSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
          ],
          expandableContent: {
            content: (
              <>
                <Table>
                  <TableHeadersRow className={threeColTable}>
                    <TableHeader>Endpoint Name</TableHeader>
                    <TableHeader>Endpoint Number Calls</TableHeader>
                    <TableHeader>Endpoint Cost</TableHeader>
                  </TableHeadersRow>
                  {items?.map(({ name, amount, cost }) => (
                    <TableRow className={threeColTable} key={name}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{amount}</TableCell>
                      <TableCell>{cost ? `£${cost}` : '£0'}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </>
            ),
          },
        }))}
      />
    </>
  ) : (
    <div>
      <PersistentNotification isExpanded isFullWidth isInline intent="secondary">
        No results found for your selected filters
      </PersistentNotification>
    </div>
  )
}
