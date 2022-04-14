import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import {
  Button,
  ButtonGroup,
  elMb5,
  FormLayout,
  Icon,
  InputGroup,
  InputWrap,
  SmallText,
  Subtitle,
  useModal,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useGlobalState } from '../../../core/use-global-state'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { InviteMemberModel } from '@reapit/foundations-ts-definitions'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaMember } from './validation-schema'
import { useForm } from 'react-hook-form'
import { InputWrapFull } from '@reapit/elements'

export const handleLogout = (connectLogoutRedirect: () => void) => () => {
  connectLogoutRedirect()
}

export const handleInviteMember =
  (reinviteMember: SendFunction<InviteMemberModel, boolean>, closeModal: () => void) => (member: InviteMemberModel) => {
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
  const { connectLogoutRedirect, connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { globalDataState, globalRefreshState } = useGlobalState()
  const { Modal, openModal, closeModal } = useModal()
  const { currentMember } = globalDataState
  const { members } = globalRefreshState

  const [, membersShouldRefresh] = members

  const [, , inviteMember, inviteMemberSuccess] = useReapitUpdate<InviteMemberModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.inviteMember],
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
  } = useForm<InviteMemberModel>({
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
    <>
      <Icon icon="reapitConnectInfographic" iconSize="large" />
      <Subtitle>Settings</Subtitle>
      <SmallText hasGreyText>
        You can manage the information we hold about you and change your password in these pages.
      </SmallText>
      {currentMember?.role === 'admin' && (
        <>
          <SmallText hasGreyText>
            Additionally, as an admin, you can manage your developer organisation, members and subscriptions.
          </SmallText>
          <Button className={elMb5} onClick={openModal} intent="primary">
            Invite Developer
          </Button>
        </>
      )}
      <Button onClick={handleLogout(connectLogoutRedirect)} intent="critical" chevronRight>
        Logout
      </Button>
      <Modal title="Invite Developer">
        <form onSubmit={handleSubmit(handleInviteMember(inviteMember, closeModal))}>
          <FormLayout hasMargin>
            <InputWrap>
              <InputGroup
                {...register('name')}
                label="Name"
                errorMessage={errors?.name?.message}
                icon={errors?.name?.message ? 'asteriskSystem' : null}
                intent="danger"
              />
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('email')}
                type="email"
                label="Email"
                errorMessage={errors?.email?.message}
                icon={errors?.email?.message ? 'asteriskSystem' : null}
                intent="danger"
              />
            </InputWrap>
            <InputWrap>
              <InputGroup
                {...register('jobTitle')}
                label="Job Title"
                errorMessage={errors?.jobTitle?.message}
                icon={errors?.jobTitle?.message ? 'asteriskSystem' : null}
                intent="danger"
              />
            </InputWrap>
            <InputWrapFull>
              <InputGroup
                {...register('message')}
                label="Invite Message"
                errorMessage={errors?.message?.message}
                icon={errors?.message?.message ? 'asteriskSystem' : null}
                intent="danger"
              />
            </InputWrapFull>
          </FormLayout>
          <ButtonGroup alignment="center">
            <Button intent="low" onClick={closeModal}>
              Close
            </Button>
            <Button intent="primary" type="submit">
              Send Invite
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </>
  )
}
