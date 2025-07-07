import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Marketplace, Organisations } from '@reapit/foundations-ts-definitions'
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
  elMt5,
  SmallText,
  useModal,
} from '@reapit/elements'
import { toLocalTime } from '@reapit/utils-common'
import {
  SendFunction,
  useReapitGet,
  useReapitUpdate,
  UpdateActionNames,
  updateActions,
  GetActionNames,
  getActions,
} from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { usePermissionsState } from '../../core/use-permissions-state'

export interface MembersTableProps {
  devIdMembers: string
}

export const handleUpdateMember =
  (
    updateMember: SendFunction<Marketplace.UpdateMemberModel, boolean>,
    memberUpdate: Marketplace.UpdateMemberModel | null,
  ) =>
  () => {
    if (memberUpdate) {
      updateMember(memberUpdate)
    }
  }

export const handleSetMemberEmail =
  (setMemberEmail: Dispatch<SetStateAction<string | null>>, memberEmail?: string) => () => {
    if (memberEmail) {
      setMemberEmail(memberEmail)
    }
  }

export const handleSetUpdateMember =
  (setMemberUpdate: Dispatch<SetStateAction<Marketplace.MemberModel | null>>, memberUpdate: Marketplace.MemberModel) =>
  () => {
    setMemberUpdate(memberUpdate)
  }

export const handleRefreshMembers =
  (refreshMembers: () => void, updateMemberSuccess?: boolean, deleteMemberSuccess?: boolean) => () => {
    if (updateMemberSuccess || deleteMemberSuccess) {
      refreshMembers()
    }
  }

export const handleMemberDelete =
  (
    setMemberDelete: Dispatch<SetStateAction<Marketplace.MemberModel | null>>,
    openModal: () => void,
    memberDelete: Marketplace.MemberModel,
  ) =>
  () => {
    if (memberDelete) {
      setMemberDelete(memberDelete)
      openModal()
    }
  }

export const handleDeleteMember =
  (
    setMemberDelete: Dispatch<SetStateAction<Marketplace.MemberModel | null>>,
    closeModal: () => void,
    deleteMember: SendFunction<void, boolean>,
  ) =>
  async () => {
    const deleted = await deleteMember()

    if (deleted) {
      closeModal()
      setMemberDelete(null)
    }
  }

export const MembersTable: FC<MembersTableProps> = ({ devIdMembers }) => {
  const [memberUpdate, setMemberUpdate] = useState<Marketplace.MemberModel | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [memberEmail, setMemberEmail] = useState<string | null>(null)
  const [memberDelete, setMemberDelete] = useState<Marketplace.MemberModel | null>(null)
  const { hasReadAccess } = usePermissionsState()
  const { Modal, openModal, closeModal } = useModal()

  const [members, membersLoading, , refreshMembers] = useReapitGet<Marketplace.MemberModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getDeveloperMembers],
    uriParams: {
      developerId: devIdMembers,
      memberId: memberUpdate?.id,
    },
    queryParams: {
      pageNumber,
      pageSize: 12,
    },
    fetchWhenTrue: [devIdMembers],
  })

  const [userInfo, userInfoLoading] = useReapitGet<Organisations.UserInfoModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserInfo],
    queryParams: {
      email: encodeURIComponent(memberEmail ?? ''),
      includeIdpData: true,
    },
    fetchWhenTrue: [memberEmail],
  })

  const [memberUpdating, , updateMember, updateMemberSuccess] = useReapitUpdate<Marketplace.UpdateMemberModel, boolean>(
    {
      reapitConnectBrowserSession,
      action: updateActions[UpdateActionNames.updateMember],
      method: 'PUT',
      uriParams: {
        developerId: devIdMembers,
        memberId: memberUpdate?.id,
      },
    },
  )

  const [, , deleteMember, deleteMemberSuccess] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteMember],
    method: 'DELETE',
    uriParams: { developerId: memberDelete?.developerId, memberId: memberDelete?.id },
  })

  useEffect(handleRefreshMembers(refreshMembers, updateMemberSuccess, deleteMemberSuccess), [
    updateMemberSuccess,
    deleteMemberSuccess,
  ])
  useEffect(handleUpdateMember(updateMember, memberUpdate), [memberUpdate])

  const idpEvents = userInfo?.idpData?.authEvents ?? []

  return membersLoading ? (
    <Loader />
  ) : members?.data?.length ? (
    <div className={elMt5}>
      <Subtitle>Total Members</Subtitle>
      <BodyText hasGreyText>{members.totalCount}</BodyText>
      <Table
        className={elMb11}
        rows={members.data.map((member) => {
          const { name, jobTitle, status, role, gitHubUsername, agreedTerms, created, email, isMainContact } = member
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
                label: 'Member Email',
                value: email,
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
                label: 'Member Status',
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
              {
                label: 'Created Date',
                value: created ? toLocalTime(created) : '-',
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            expandableContent: {
              content: (
                <>
                  <ButtonGroup alignment="center">
                    <Button
                      intent="primary"
                      disabled={hasReadAccess || memberUpdating}
                      loading={memberUpdating}
                      onClick={handleSetUpdateMember(setMemberUpdate, {
                        ...member,
                        role: role === 'admin' ? 'user' : 'admin',
                      })}
                    >
                      Set As {role === 'admin' ? 'User' : 'Admin'}
                    </Button>
                    <Button
                      intent="primary"
                      disabled={hasReadAccess || memberUpdating || isMainContact}
                      loading={memberUpdating}
                      onClick={handleSetUpdateMember(setMemberUpdate, {
                        ...member,
                        isMainContact: true,
                      })}
                    >
                      Set As Main Contact
                    </Button>
                    <Button
                      intent="primary"
                      disabled={userInfoLoading}
                      loading={userInfoLoading}
                      onClick={handleSetMemberEmail(setMemberEmail, email)}
                    >
                      Get Login Info
                    </Button>
                    <Button
                      type="button"
                      intent="danger"
                      disabled={hasReadAccess}
                      onClick={handleMemberDelete(setMemberDelete, openModal, member)}
                    >
                      Delete Member
                    </Button>
                    <Button
                      intent="danger"
                      disabled={hasReadAccess || memberUpdating}
                      loading={memberUpdating}
                      onClick={handleSetUpdateMember(setMemberUpdate, {
                        ...member,
                        status: status === 'active' ? 'inactive' : 'active',
                      })}
                    >
                      {status === 'active' ? 'Disable' : 'Enable'}
                    </Button>
                  </ButtonGroup>
                  {userInfoLoading && <Loader className={elMt5} />}
                  {userInfo && memberEmail === email && idpEvents.length ? (
                    <>
                      <Subtitle className={elMt5}>Recent Logins</Subtitle>
                      {userInfo.idpData?.authEvents?.map((authEvent, index) => {
                        return index < 5 ? (
                          <SmallText hasGreyText key={authEvent}>
                            {authEvent}
                          </SmallText>
                        ) : null
                      })}
                    </>
                  ) : userInfo && memberEmail === email ? (
                    <PersistentNotification className={elMt5} isExpanded isFullWidth isInline intent="primary">
                      No login information for user
                    </PersistentNotification>
                  ) : null}
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
      <Modal title="Delete Member">
        <BodyText hasGreyText>Are you sure you want to delete this member? This action cannot be undone.</BodyText>
        <ButtonGroup alignment="right">
          <Button onClick={closeModal}>Cancel</Button>
          <Button intent="danger" onClick={handleDeleteMember(setMemberDelete, closeModal, deleteMember)}>
            Delete
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  ) : (
    <PersistentNotification className={elMt5} isExpanded isFullWidth isInline intent="primary">
      No results found for your selected filters
    </PersistentNotification>
  )
}
