import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  elMb7,
  FormLayout,
  Icon,
  InputGroup,
  SmallText,
  Subtitle,
  useModal,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useGlobalState } from '../../../core/use-global-state'
import { SendFunction, useReapitUpdate } from '@reapit/use-reapit-data'
import { UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaMember } from './validation-schema'
import { useForm } from 'react-hook-form'
import { InputWrapFull } from '@reapit/elements'
import { useLocation } from 'react-router'
import Routes from '../../../constants/routes'

export const handleLogout = (connectLogoutRedirect: () => void) => () => {
  connectLogoutRedirect()
}

export const handleInviteMember =
  (reinviteMember: SendFunction<Marketplace.InviteMemberModel, boolean>, closeModal: () => void) =>
  (member: Marketplace.InviteMemberModel) => {
    reinviteMember(member)
    closeModal()
  }

export const handleInviteMemberSuccess =
  (membersShouldRefresh: Dispatch<SetStateAction<boolean>>, inviteMemberSuccess?: boolean) => () => {
    if (inviteMemberSuccess) {
      membersShouldRefresh(true)
    }
  }

export const Controls: FC = () => {
  const location = useLocation()
  const { connectLogoutRedirect, connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { globalDataState, globalRefreshState } = useGlobalState()
  const { Modal, openModal, closeModal } = useModal()
  const { currentMember } = globalDataState
  const { members } = globalRefreshState
  const { pathname } = location

  const [, membersShouldRefresh] = members

  const [, , inviteMember, inviteMemberSuccess] = useReapitUpdate<Marketplace.InviteMemberModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.inviteMember],
    method: 'POST',
    uriParams: {
      developerId: currentMember?.developerId,
    },
  })

  useEffect(handleInviteMemberSuccess(membersShouldRefresh, inviteMemberSuccess), [inviteMemberSuccess])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Marketplace.InviteMemberModel>({
    resolver: yupResolver(validationSchemaMember),
    defaultValues: {
      name: '',
      email: '',
      jobTitle: '',
      message: '',
      sender: connectSession?.loginIdentity.email,
    },
  })

  return (
    <div className={elMb7}>
      <Icon icon="reapitConnectInfographic" iconSize="large" />
      <Subtitle>Settings</Subtitle>
      <SmallText tag="div" hasGreyText>
        You can manage the information we hold about you and change your password in these pages.
      </SmallText>
      {currentMember?.role === 'admin' && (
        <SmallText tag="div" hasGreyText>
          Additionally, as an admin, you can manage your developer organisation, members and subscriptions.
        </SmallText>
      )}
      <ButtonGroup>
        {currentMember?.role === 'admin' && pathname === Routes.SETTINGS_MEMBERS && (
          <Button onClick={openModal} intent="primary">
            Invite Developer
          </Button>
        )}
        <Button onClick={handleLogout(connectLogoutRedirect)} intent="primary">
          Logout
        </Button>
      </ButtonGroup>
      <Modal title="Invite Developer">
        <form onSubmit={handleSubmit(handleInviteMember(inviteMember, closeModal))}>
          <FormLayout hasMargin>
            <InputWrapFull>
              <InputGroup
                {...register('name')}
                label="Name"
                placeholder="Your colleague's full name"
                errorMessage={errors?.name?.message}
                icon={errors?.name?.message ? 'asterisk' : null}
                intent="danger"
              />
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup
                {...register('email')}
                type="email"
                label="Email"
                placeholder="An email address we can contact your colleague at"
                errorMessage={errors?.email?.message}
                icon={errors?.email?.message ? 'asterisk' : null}
                intent="danger"
              />
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup
                {...register('jobTitle')}
                label="Job Title"
                placeholder="Your colleague's role at your company'"
                errorMessage={errors?.jobTitle?.message}
                icon={errors?.jobTitle?.message ? 'asterisk' : null}
                intent="danger"
              />
            </InputWrapFull>
            <InputWrapFull>
              <InputGroup
                {...register('message')}
                label="Invite Message"
                placeholder="An optional invite message"
                errorMessage={errors?.message?.message}
                icon={errors?.message?.message ? 'asterisk' : null}
                intent="danger"
              />
            </InputWrapFull>
          </FormLayout>
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={closeModal}>
              Close
            </Button>
            <Button intent="primary" type="submit">
              Send Invite
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </div>
  )
}
