import React, { FC, useEffect } from 'react'
import { BodyText, Button, ButtonGroup, elMb11, FormLayout, InputGroup, InputWrap, Subtitle } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { useForm } from 'react-hook-form'
import { useGlobalState } from '../../../core/use-global-state'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaProfile } from './validation-schema'

export type MemberUpdateFormValues = {
  useCustomerData: boolean
  sandboxId: string
  name: string
  jobTitle: string
  gitHubUsername: string
}

export const handleRefreshMember = (refreshMember: () => void, updateMemberSuccess?: boolean) => () => {
  if (updateMemberSuccess) {
    refreshMember()
  }
}

export const ProfileForm: FC = () => {
  const { globalDataState, globalRefreshCurrentMember } = useGlobalState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { currentMember, currentDeveloper } = globalDataState
  const [memberUpdating, , updateMember, updateMemberSuccess] = useReapitUpdate<Marketplace.UpdateMemberModel, boolean>(
    {
      reapitConnectBrowserSession,
      action: updateActions[UpdateActionNames.updateMember],
      method: 'PUT',
      uriParams: {
        developerId: currentMember?.developerId,
        memberId: currentMember?.id,
      },
    },
  )

  useEffect(handleRefreshMember(globalRefreshCurrentMember, updateMemberSuccess), [updateMemberSuccess])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberUpdateFormValues>({
    resolver: yupResolver(validationSchemaProfile),
    defaultValues: {
      ...currentMember,
      name: currentMember?.name ?? '',
      jobTitle: currentMember?.jobTitle ?? '',
      gitHubUsername: currentMember?.gitHubUsername ?? '',
      useCustomerData: currentMember?.useCustomerData ?? false,
      sandboxId: currentMember?.sandboxId || 'GBR',
    },
  })

  return (
    <form onSubmit={handleSubmit((values) => updateMember(values))}>
      <div className={elMb11}>
        <FormLayout>
          <InputWrap>
            <InputGroup
              {...register('name')}
              label="Name"
              placeholder="Your full name here"
              errorMessage={errors.name?.message}
              icon={errors.name?.message ? 'asteriskSystem' : null}
              intent="danger"
            />
          </InputWrap>
          <InputWrap>
            <InputGroup
              {...register('jobTitle')}
              label="Job Title"
              placeholder="What role do you have at your company"
              errorMessage={errors.jobTitle?.message}
              icon={errors.jobTitle?.message ? 'asteriskSystem' : null}
              intent="danger"
            />
          </InputWrap>
        </FormLayout>
      </div>
      <div className={elMb11}>
        <FormLayout>
          <InputWrap>
            <Subtitle hasNoMargin>Company Name</Subtitle>
            <BodyText hasNoMargin hasGreyText>
              {currentDeveloper?.company}
            </BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle hasNoMargin>Email Address</Subtitle>
            <BodyText hasNoMargin hasGreyText>
              {currentMember?.email}
            </BodyText>
          </InputWrap>
          <InputWrap>
            <Subtitle hasNoMargin>Profile Settings</Subtitle>
            <BodyText hasNoMargin hasGreyText>
              {connectSession?.loginIdentity.clientId}
            </BodyText>
          </InputWrap>
        </FormLayout>
      </div>
      <ButtonGroup>
        <Button intent="primary" type="submit" disabled={memberUpdating} loading={memberUpdating}>
          Save Changes
        </Button>
      </ButtonGroup>
    </form>
  )
}
