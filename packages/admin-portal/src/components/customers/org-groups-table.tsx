import React, { FC, useState } from 'react'
import ErrorBoundary from '../error-boundary'
import { Organisations } from '@reapit/foundations-ts-definitions'
import {
  elMb11,
  elMt7,
  Loader,
  Pagination,
  PersistentNotification,
  Subtitle,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
} from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { fourColTable } from './__styles__'
import { Statistics } from '../statistics'

export interface OrgGroupsProps {
  orgId: string
}

export const OrgGroupsTable: FC<OrgGroupsProps> = ({ orgId }) => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)

  const [orgGroups, orgGroupsLoading] = useReapitGet<Organisations.OfficeGroupModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getGroupsByOrgId],
    queryParams: {
      pageSize,
      pageNumber,
    },
    uriParams: {
      orgId,
    },
    fetchWhenTrue: [orgId],
  })

  return (
    <ErrorBoundary>
      {orgGroupsLoading ? (
        <Loader />
      ) : orgGroups?._embedded?.length ? (
        <>
          <Subtitle>Office Groups</Subtitle>
          <Table className={elMb11}>
            <TableHeadersRow className={fourColTable}>
              <TableHeader>Customer Id</TableHeader>
              <TableHeader>Group Name</TableHeader>
              <TableHeader>Office Ids</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableHeadersRow>
            {orgGroups?._embedded?.map(({ customerId, name, officeIds, status }) => (
              <TableRow className={fourColTable} key={name}>
                <TableCell>{customerId}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{officeIds}</TableCell>
                <TableCell>{status}</TableCell>
              </TableRow>
            ))}
          </Table>
          <Pagination
            callback={setPageNumber}
            currentPage={pageNumber}
            numberPages={Math.ceil((orgGroups?.totalCount ?? 1) / 12)}
          />
          <Statistics area="OFFICE_GROUPS" data={orgGroups} setPageSize={setPageSize} />
        </>
      ) : (
        <PersistentNotification className={elMt7} isInline isExpanded isFullWidth intent="primary">
          No office groups found for this organisation
        </PersistentNotification>
      )}
    </ErrorBoundary>
  )
}
