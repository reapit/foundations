import React, { FC, useEffect, useState } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  Col,
  elFadeIn,
  elMb11,
  elMt11,
  Grid,
  PersistantNotification,
  Subtitle,
} from '@reapit/elements'
import { GetActionNames, getActions, SendFunction, useReapitGet, useReapitUpdate } from '@reapit/use-reapit-data'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { ReapitConnectSession } from '@reapit/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { cx } from '@linaria/core'
import dayjs from 'dayjs'
import { DeleteAuthenticator } from './delete-authenticator'

type Authenticator = {
  id: string
  userId: string
  status: string
  type: string
  created: string
  modified: string
}

export interface MemberUpdateControlsProps {
  member: Marketplace.MemberModel
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
  (updateMember: SendFunction<Marketplace.UpdateMemberModel, boolean>, memberUpdate: Marketplace.UpdateMemberModel) =>
  () => {
    updateMember(memberUpdate)
  }

export const handleDeleteMember = (deleteMember: SendFunction<undefined, boolean>) => () => {
  deleteMember(undefined)
}

export const handleReinviteMember =
  (
    reinviteMember: SendFunction<Marketplace.InviteMemberModel, boolean>,
    member: Marketplace.MemberModel,
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
  const [openFetchAuthenticators, setOpenFetchAuthenticators] = useState<boolean>(false)

  const [memberUpdating, , updateMember, updateMemberSuccess] = useReapitUpdate<Marketplace.UpdateMemberModel, boolean>(
    {
      reapitConnectBrowserSession,
      action: updateActions[UpdateActionNames.updateMember],
      method: 'PUT',
      uriParams: {
        developerId: member.developerId,
        memberId: member.id,
      },
    },
  )

  const [memberDeleting, , deleteMember, deleteMemberSuccess] = useReapitUpdate<undefined, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateMember],
    method: 'DELETE',
    uriParams: {
      developerId: member.developerId,
      memberId: member.id,
    },
  })

  const [memberReinviting, , reinviteMember, reinviteMemberSuccess] = useReapitUpdate<
    Marketplace.InviteMemberModel,
    boolean
  >({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.inviteMember],
    method: 'POST',
    uriParams: {
      developerId: member.developerId,
    },
  })

  const [authenticators, authenticatorsLoading, , refreshAuthenticators] = useReapitGet<Authenticator[]>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getMarketplaceMemeberAuthenticators],
    uriParams: {
      id: member.developerId,
      memberId: member.id,
    },
    fetchWhenTrue: [openFetchAuthenticators],
  })

  useEffect(() => {
    openFetchAuthenticators && refreshAuthenticators()
  }, [openFetchAuthenticators])

  useEffect(handleRefreshMembers(refreshMembers, updateMemberSuccess, deleteMemberSuccess, reinviteMemberSuccess), [
    updateMemberSuccess,
    deleteMemberSuccess,
    reinviteMemberSuccess,
  ])

  const isLoading = memberDeleting || memberUpdating || memberReinviting
  const isDisabled = isLoading || member.email === currentMemberEmail

  return (
    <>
      <ButtonGroup alignment="center">
        <Button
          intent="primary"
          onClick={() => {
            openFetchAuthenticators ? refreshAuthenticators() : setOpenFetchAuthenticators(true)
          }}
          loading={authenticatorsLoading}
          disabled={authenticatorsLoading || member.status !== 'active'}
        >
          Fetch Current Authenticators
        </Button>
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
          intent="primary"
          disabled={isDisabled}
          loading={isLoading}
          onClick={handleReinviteMember(reinviteMember, member, connectSession)}
        >
          Invite Again
        </Button>
        {!member.isMainContact && (
          <Button
            intent="primary"
            disabled={isLoading}
            loading={isLoading}
            onClick={handleUpdateMember(updateMember, {
              ...member,
              isMainContact: true,
            })}
          >
            Set As Main Contact
          </Button>
        )}
        {member.status === 'active' && (
          <Button
            intent="danger"
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
      {openFetchAuthenticators && (
        <div>
          {authenticators && authenticators.length >= 1 ? (
            authenticators?.map(({ type, modified, created, id, userId, status }) => (
              <Grid className={cx(elMb11, elFadeIn, elMt11)} key={id}>
                <Col>
                  <Subtitle hasNoMargin>Authenticator Type</Subtitle>
                  <BodyText hasGreyText hasNoMargin>
                    {type === 'sms' ? 'Mobile SMS' : 'Authenticator App'}
                  </BodyText>
                </Col>
                <Col>
                  <Subtitle hasNoMargin>Status</Subtitle>
                  <BodyText hasGreyText hasNoMargin>
                    {status === 'inProgress' ? 'Currently Configuring' : status === 'active' ? 'Active' : 'Disabled'}
                  </BodyText>
                </Col>
                <Col>
                  <Subtitle hasNoMargin>Created</Subtitle>
                  <BodyText hasGreyText hasNoMargin>
                    {modified ? dayjs(created).format('DD/MM/YYYY HH:mm') : '-'}
                  </BodyText>
                </Col>
                <Col>
                  <Subtitle hasNoMargin>Last Updated</Subtitle>
                  <BodyText hasGreyText hasNoMargin>
                    {modified ? dayjs(modified).format('DD/MM/YYYY HH:mm') : '-'}
                  </BodyText>
                </Col>
                <Col>
                  <DeleteAuthenticator
                    authenticatorId={id}
                    userId={userId}
                    refreshAuthenticators={refreshAuthenticators}
                  />
                </Col>
              </Grid>
            ))
          ) : (
            <PersistantNotification intent="primary" isInline isExpanded className={cx(elMt11, elMb11)}>
              No authenticators configured for this user.
            </PersistantNotification>
          )}
        </div>
      )}
    </>
  )
}
