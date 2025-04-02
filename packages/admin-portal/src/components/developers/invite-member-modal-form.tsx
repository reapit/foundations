import React, { FC } from 'react'
import { Button, ButtonGroup, FormLayout, InputGroup } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaMember } from './validation-schema'
import { useForm } from 'react-hook-form'
import { InputWrapFull } from '@reapit/elements'

export interface InviteMemberModalFormProps {
  developerId: string
  closeModal: () => void
}

export const handleInviteMember =
  (inviteMember: SendFunction<Marketplace.InviteMemberModel, boolean>, closeModal: () => void) =>
  async (member: Marketplace.InviteMemberModel) => {
    const created = await inviteMember(member)
    if (created) {
      closeModal()
    }
  }

export const InviteMemberModalForm: FC<InviteMemberModalFormProps> = ({ developerId, closeModal }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [, , inviteMember] = useReapitUpdate<Marketplace.InviteMemberModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.inviteMember],
    method: 'POST',
    uriParams: {
      developerId,
    },
  })

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
        <Button onClick={closeModal}>Close</Button>
        <Button intent="primary" type="submit">
          Send Invite
        </Button>
      </ButtonGroup>
    </form>
  )
}
