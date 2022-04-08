import React, { FC, useState } from 'react'
import { elMb11, Loader, Pagination, StatusIndicator, Table, Title } from '@reapit/elements'
import { useReapitGet } from '@reapit/utils-react'
import { MemberModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitConnect } from '@reapit/connect-session'
import { MemberUpdateControls } from './member-update-controls'

export const SettingsMembersPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const developerId = connectSession?.loginIdentity.developerId

  const [members, membersLoading, , refreshMembers] = useReapitGet<MemberModelPagedResult>({
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
        rows={members?.data?.map((member) => ({
          cells: [
            {
              label: 'Name',
              value: member.name ?? '',
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
                      member.status === 'active'
                        ? 'success'
                        : member.status === 'rejected'
                        ? 'danger'
                        : member.status === 'pending'
                        ? 'critical'
                        : 'low'
                    }
                  />{' '}
                  {member.status
                    ? `${member.status.charAt(0).toUpperCase()}${member.status.slice(1).toLowerCase()}`
                    : ''}
                </>
              ),
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Email',
              value: member.email ?? '',
              icon: 'emailSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Role',
              value: member.role ? `${member.role.charAt(0).toUpperCase()}${member.role.slice(1).toLowerCase()}` : '',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
          ],
          expandableContent: {
            content: <MemberUpdateControls member={member} refreshMembers={refreshMembers} />,
          },
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
