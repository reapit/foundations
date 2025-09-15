import React, { FC, forwardRef, useRef } from 'react'
import { Loader, PersistentNotification, Table } from '@reapit/elements'
import { DisplayChip } from './__styles__'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GroupModelPagedResult, OrganisationModelPagedResult, UserModel } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { getIsAdmin } from '../../utils/is-admin'
import { EditUserGroupsModal } from './edit-user-groups-modal'
import { OfficeGroupsModal } from './office-groups-modal'
import styled from 'styled-components'

const Container = styled.div`
  --component-table-expandable-trigger-width: 0px;

  .el-table-cell-content {
    max-height: none;
    -webkit-line-clamp: unset;
  }
`

export interface UserContentProps {
  user: UserModel
  userGroups: GroupModelPagedResult | null
  refreshUsers: () => void
  orgs: OrganisationModelPagedResult | null
}

export const UserContent: FC<UserContentProps> = ({ user, refreshUsers, orgs, userGroups }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { isSupport, isFoundationsAdmin } = getIsAdmin(connectSession)

  if (!user.organisationIds?.length) {
    return (
      <PersistentNotification isFullWidth isExpanded isInline intent="primary">
        User not part of any organisations.
      </PersistentNotification>
    )
  }

  return (
    <Container>
      <Table
        numberColumns={6}
        rows={user.organisationIds?.map((orgId) => {
          return {
            cells: [
              { label: 'Organisation', value: orgs?._embedded?.find((org) => org.id === orgId)?.name || orgId },
              {
                label: 'Organisation Claims',
                value:
                  user.organisationClaims
                    ?.filter(({ organisationId }) => organisationId === orgId)
                    .map(({ claim, value }) => `${claim}: ${value}`)
                    .join(', ') || 'None',
              },
              !isSupport && !isFoundationsAdmin
                ? null
                : {
                    label: 'User Groups',
                    children: (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <div>
                          {user?.userGroups
                            ?.filter((ug) => ug.organisationId === orgId)
                            .sort()
                            .map((group) => <DisplayChip key={group.groupId}>{group.groupId!}</DisplayChip>)}
                        </div>
                        <EditUserGroupsModal
                          refreshUsers={refreshUsers}
                          user={user}
                          orgId={orgId}
                          userGroups={userGroups}
                        />
                      </div>
                    ),
                  },
              {
                label: 'User Claims',
                value:
                  user.userClaims
                    ?.filter(({ organisationId }) => organisationId === orgId)
                    .map(({ claim, value }) => `${claim}: ${value}`)
                    .join(', ') || 'None',
              },
              {
                label: 'Office Groups',
                children: <OfficeGroupsModal email={user.email!} />,
              },
            ].filter(Boolean) as any[],
          }
        })}
      />
    </Container>
  )
}
