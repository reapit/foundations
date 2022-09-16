import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { MemberModel, MemberModelPagedResult, UpdateMemberModel } from '@reapit/foundations-ts-definitions'
import {
  PersistentNotification,
  Table,
  Subtitle,
  BodyText,
  ButtonGroup,
  elMb11,
  Button,
  Loader,
  Pagination,
} from '@reapit/elements'
import { GetActionNames, getActions, toLocalTime, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export interface MembersTableProps {
  devIdMembers: string
}

export const handleUpdateMember =
  (updateMember: SendFunction<UpdateMemberModel, boolean>, memberUpdate: UpdateMemberModel) => () => {
    updateMember(memberUpdate)
  }

export const handleSetUpdateMember =
  (setMemberUpdate: Dispatch<SetStateAction<MemberModel | null>>, memberUpdate: MemberModel) => () => {
    setMemberUpdate(memberUpdate)
  }

export const handleRefreshMembers = (refreshMembers: () => void, updateMemberSuccess?: boolean) => () => {
  if (updateMemberSuccess) {
    refreshMembers()
  }
}

export const MembersTable: FC<MembersTableProps> = ({ devIdMembers }) => {
  const [memberUpdate, setMemberUpdate] = useState<MemberModel | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)

  const [members, membersLoading, , refreshMembers] = useReapitGet<MemberModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloperMembers],
    uriParams: {
      pageNumber,
      pageSize: 12,
      developerId: devIdMembers,
      memberId: memberUpdate?.id,
    },
    fetchWhenTrue: [devIdMembers],
  })

  const [, memberUpdating, updateMember, updateMemberSuccess] = useReapitUpdate<UpdateMemberModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateMember],
    method: 'PUT',
    uriParams: {
      developerId: devIdMembers,
      memberId: memberUpdate?.id,
    },
  })

  useEffect(handleRefreshMembers(refreshMembers, updateMemberSuccess), [updateMemberSuccess])
  useEffect(handleUpdateMember(updateMember, memberUpdate as UpdateMemberModel), [memberUpdate])

  return membersLoading ? (
    <Loader />
  ) : members?.data?.length ? (
    <>
      <Subtitle>Total Members</Subtitle>
      <BodyText hasGreyText>{members.totalCount}</BodyText>
      <Table
        className={elMb11}
        rows={members.data.map((member) => {
          const { name, jobTitle, status, role, gitHubUsername, agreedTerms } = member
          return {
            cells: [
              {
                label: 'Developer Name',
                value: name,
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Job Title',
                value: jobTitle,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Role',
                value: role,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Github Username',
                value: gitHubUsername,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Status',
                value: status,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Agreed Terms Date',
                value: agreedTerms ? toLocalTime(agreedTerms) : '-',
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            expandableContent: {
              content: (
                <>
                  <ButtonGroup className={elMb11} alignment="center">
                    <Button
                      intent="primary"
                      disabled={memberUpdating}
                      loading={memberUpdating}
                      onClick={handleSetUpdateMember(setMemberUpdate, {
                        ...member,
                        role: role === 'admin' ? 'user' : 'admin',
                      })}
                    >
                      Set As {role === 'admin' ? 'User' : 'Admin'}
                    </Button>
                    <Button
                      intent="danger"
                      disabled={memberUpdating}
                      loading={memberUpdating}
                      onClick={handleSetUpdateMember(setMemberUpdate, {
                        ...member,
                        status: status === 'active' ? 'inactive' : 'active',
                      })}
                    >
                      {status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                  </ButtonGroup>
                </>
              ),
            },
          }
        })}
      />
      <Pagination
        callback={setPageNumber}
        currentPage={pageNumber}
        numberPages={Math.ceil((members?.totalCount ?? 1) / 12)}
      />
    </>
  ) : (
    <div className={elMb11}>
      <PersistentNotification isExpanded isFullWidth isInline intent="secondary">
        No results found for your selected filters
      </PersistentNotification>
    </div>
  )
}
