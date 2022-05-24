import React, { FC, useEffect } from 'react'
import { Button, ButtonGroup } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { InviteMemberModel, MemberModel, UpdateMemberModel } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { ReapitConnectSession } from '@reapit/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

export interface MemberUpdateControlsProps {
  member: MemberModel
  refreshMembers: () => void
}

export const handleRefreshMembers =
  (
    refreshMembers: () => void,
    updateMemberSuccess?: boolean,
    deleteMemberSuccess?: boolean,
    reinviteMemberSuccess?: boolean,
  ) =>
  () => {
    if (updateMemberSuccess || deleteMemberSuccess || reinviteMemberSuccess) {
      refreshMembers()
    }
  }

export const handleUpdateMember =
  (updateMember: SendFunction<UpdateMemberModel, boolean>, memberUpdate: UpdateMemberModel) => () => {
    updateMember(memberUpdate)
  }

export const handleDeleteMember = (deleteMember: SendFunction<undefined, boolean>) => () => {
  deleteMember(undefined)
}

export const handleReinviteMember =
  (
    reinviteMember: SendFunction<InviteMemberModel, boolean>,
    member: MemberModel,
    connectSession: ReapitConnectSession | null,
  ) =>
  () => {
    const { name, jobTitle, email } = member
    const sender = connectSession?.loginIdentity.email
    const orgName = connectSession?.loginIdentity.orgName
    reinviteMember({
      name,
      jobTitle,
      email,
      sender,
      message: `Resending your invite to the ${orgName} in the Reapit Developer Portal`,
    })
  }

export const MemberUpdateControls: FC<MemberUpdateControlsProps> = ({ member, refreshMembers }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const currentMemberEmail = connectSession?.loginIdentity.email

  const [, memberUpdating, updateMember, updateMemberSuccess] = useReapitUpdate<UpdateMemberModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateMember],
    method: 'PUT',
    uriParams: {
      developerId: member.developerId,
      memberId: member.id,
    },
  })

  const [, memberDeleting, deleteMember, deleteMemberSuccess] = useReapitUpdate<undefined, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateMember],
    method: 'DELETE',
    uriParams: {
      developerId: member.developerId,
      memberId: member.id,
    },
  })

  const [, memberReinviting, reinviteMember, reinviteMemberSuccess] = useReapitUpdate<InviteMemberModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.inviteMember],
    method: 'POST',
    uriParams: {
      developerId: member.developerId,
    },
  })

  useEffect(handleRefreshMembers(refreshMembers, updateMemberSuccess, deleteMemberSuccess, reinviteMemberSuccess), [
    updateMemberSuccess,
    deleteMemberSuccess,
    reinviteMemberSuccess,
  ])

  const isLoading = memberDeleting || memberUpdating || memberReinviting
  const isDisabled = isLoading || member.email === currentMemberEmail

  return (
    <ButtonGroup alignment="center">
      <Button
        intent="primary"
        disabled={isDisabled}
        loading={isLoading}
        onClick={handleUpdateMember(updateMember, {
          ...member,
          role: member.role === 'admin' ? 'user' : 'admin',
        })}
      >
        Set As {member.role === 'admin' ? 'User' : 'Admin'}
      </Button>
      <Button
        intent="secondary"
        disabled={isDisabled}
        loading={isLoading}
        onClick={handleReinviteMember(reinviteMember, member, connectSession)}
      >
        Invite Again
      </Button>
      {member.status === 'active' && (
        <Button
          intent="low"
          disabled={isDisabled}
          loading={isLoading}
          onClick={handleUpdateMember(updateMember, {
            ...member,
            status: 'inactive',
          })}
        >
          Disable
        </Button>
      )}
      <Button intent="danger" disabled={isDisabled} loading={isLoading} onClick={handleDeleteMember(deleteMember)}>
        Delete
      </Button>
    </ButtonGroup>
  )
}
