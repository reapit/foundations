import React, { FC } from 'react'
import { PersistentNotification, Table } from '@reapit/elements'
import { DisplayChip } from './__styles__'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  GroupModelPagedResult,
  OrganisationModel,
  OrganisationModelPagedResult,
  UserModel,
} from '@reapit/foundations-ts-definitions'
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
        numberColumns={!isSupport && !isFoundationsAdmin ? 7 : 8}
        rows={user.organisationIds?.map((orgId) => {
          const org: (OrganisationModel & { types?: string[] }) | undefined = orgs?._embedded?.find(
            (org) => org.id === orgId,
          )

          return {
            cells: [
              {
                label: 'Organisation',
                value: org?.name || orgId,
              },
              {
                label: 'Organisation Type(s)',
                value: org?.types?.filter((type) => type !== 'organisation').join(', '),
              },
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
                children: <OfficeGroupsModal email={user.email!} orgId={orgId} />,
              },
            ].filter(Boolean) as any[],
          }
        })}
      />
    </Container>
  )
}
