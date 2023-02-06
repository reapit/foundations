import React, { FC } from 'react'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import {
  PersistentNotification,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  RowProps,
  elMb7,
  TableRowContainer,
} from '@reapit/elements'
import { threeColTable } from './__styles__'

export interface ServicesTableProps {
  billing: BillingBreakdownForMonthV2Model
}

export const ServicesTable: FC<ServicesTableProps> = ({ billing }) => {
  const services = billing?.services?.filter((service) => service.name !== 'API Requests') ?? []

  return services.length ? (
    <Table
      className={elMb7}
      rows={
        services
          .map(({ name, amount, cost, itemCount, items }) => {
            return {
              cells: [
                {
                  label: 'Service Name',
                  value: name ?? '',
                  icon: 'cloudSolidSystem',
                  cellHasDarkText: true,
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Total Number Service Items',
                  value: String(amount),
                  cellHasDarkText: true,
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Total Number Services',
                  value: String(itemCount),
                  cellHasDarkText: true,
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Total Service Cost',
                  value: cost ? `£${cost.toFixed(2).padStart(2, '0')}` : '£0',
                  icon: 'paymentSystem',
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
                        <TableRowContainer key={name}>
                          <TableRow className={threeColTable}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{amount}</TableCell>
                            <TableCell>{cost ? `£${cost.toFixed(2).padStart(2, '0')}` : '£0'}</TableCell>
                          </TableRow>
                        </TableRowContainer>
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
  ) : (
    <PersistentNotification isExpanded isFullWidth isInline intent="secondary">
      No results found for your selected filters
    </PersistentNotification>
  )
}
