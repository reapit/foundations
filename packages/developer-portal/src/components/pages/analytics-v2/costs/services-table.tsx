import React, { FC } from 'react'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import {
  PersistantNotification,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  Subtitle,
  RowProps,
  elMb7,
} from '@reapit/elements'
import { threeColTable } from './__styles__'

export interface ServicesTableProps {
  billing: BillingBreakdownForMonthV2Model | null
}

export const ServicesTable: FC<ServicesTableProps> = ({ billing }) => {
  const services = billing?.services ?? []
  return services.length ? (
    <>
      <Subtitle>Services and Subscriptions</Subtitle>
      <Table
        className={elMb7}
        rows={
          services
            .map(({ name, amount, cost, itemCount, items }) => {
              if (name === 'API Requests') return
              return {
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
                    value: String(amount),
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
                    value: String(itemCount),
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
                          <TableHeader>Service Name</TableHeader>
                          <TableHeader>Service Quantity</TableHeader>
                          <TableHeader>Service Cost</TableHeader>
                        </TableHeadersRow>
                        {items?.map(({ name, amount, cost }) => (
                          <TableRow className={threeColTable} key={name}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{amount}</TableCell>
                            <TableCell>{cost ? `£${cost.toFixed(2).padStart(2, '0')}` : '£0'}</TableCell>
                          </TableRow>
                        ))}
                      </Table>
                    </>
                  ),
                },
              }
            })
            .filter(Boolean) as RowProps[]
        }
      />
    </>
  ) : (
    <div>
      <PersistantNotification isExpanded isFullWidth isInline intent="secondary">
        No results found for your selected filters
      </PersistantNotification>
    </div>
  )
}
