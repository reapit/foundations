import React, { FC, useState } from 'react'
import { BodyText, elMb11, Loader, Pagination, StatusIndicator, Table, Title } from '@reapit/elements'
import { useReapitGet } from '@reapit/utils-react'
import { MemberModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitConnect } from '@reapit/connect-session'

export const SettingsMembersPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const developerId = connectSession?.loginIdentity.developerId

  const [members, membersLoading] = useReapitGet<MemberModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloperMembers],
    queryParams: { pageSize: 12, pageNumber },
    uriParams: { developerId },
    fetchWhenTrue: [developerId],
  })

  return (
    <>
      <Title>Members</Title>
      {membersLoading && <Loader />}
      <Table
        className={elMb11}
        rows={members?.data?.map(({ name, email, status }) => ({
          cells: [
            {
              label: 'Name',
              value: name ?? '',
              icon: 'usernameSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Status',
              value: '',
              children: (
                <>
                  <StatusIndicator
                    intent={
                      status === 'active'
                        ? 'success'
                        : status === 'rejected'
                        ? 'danger'
                        : status === 'pending'
                        ? 'critical'
                        : 'low'
                    }
                  />{' '}
                  {status ? `${status.charAt(0).toUpperCase()}${status.slice(1).toLowerCase()}` : ''}
                </>
              ),
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Email',
              value: email ?? '',
              icon: 'emailSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
          ],
        }))}
      />
      <Pagination
        callback={setPageNumber}
        currentPage={pageNumber}
        numberPages={Math.ceil((members?.totalCount ?? 1) / (members?.pageSize ?? 1))}
      />
    </>
  )
}

export default SettingsMembersPage
