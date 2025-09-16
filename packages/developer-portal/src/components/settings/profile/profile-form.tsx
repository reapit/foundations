import React, { FC, useEffect } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb11,
  elMb6,
  FormLayout,
  InputError,
  InputGroup,
  InputWrap,
  Label,
  PersistentNotification,
  Subtitle,
  ToggleRadio,
  ToggleRadioOption,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { selectIsUserOrUserAdmin } from '../../../utils/auth'
import { useReapitGet, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
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
  const clientId = connectSession?.loginIdentity.clientId
  const orgName = connectSession?.loginIdentity.orgName
  const isUserOrUserAdmin = selectIsUserOrUserAdmin(connectSession)
  const { currentMember, currentDeveloper } = globalDataState
  const isClient = clientId && isUserOrUserAdmin
  const hasProducts = process.env.swaggerWhitelist.includes(currentDeveloper?.id as string)

  const [sandboxes] = useReapitGet<Marketplace.SandboxModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getSandboxes],
  })

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
      {hasProducts && (
        <>
          <Subtitle hasNoMargin>Customer Data</Subtitle>
          <BodyText hasGreyText>
            You can choose which sandbox you wish to view based on your Reapit Product. This is specific and only
            associated to your developer profile.
          </BodyText>
          <FormLayout className={elMb6}>
            <InputWrap>
              <InputGroup>
                <ToggleRadio
                  hasGreyBg
                  {...register('sandboxId')}
                  options={
                    (sandboxes?.data?.map((sandbox) => ({
                      id: sandbox.id ?? '',
                      text: sandbox.name ?? '',
                      value: sandbox.id ?? '',
                      isChecked: currentMember?.sandboxId === sandbox.id,
                    })) as ToggleRadioOption[]) ?? []
                  }
                />
                <Label>Choose Sandbox</Label>
                {errors.sandboxId?.message && <InputError message={errors.sandboxId?.message} />}
              </InputGroup>
            </InputWrap>
          </FormLayout>
          <PersistentNotification className={elMb11} isInline isExpanded isFullWidth intent="primary">
            Please note, you will need to log out and log back in again to see this change take effect
          </PersistentNotification>
        </>
      )}
      <ButtonGroup>
        <Button intent="primary" type="submit" disabled={memberUpdating} loading={memberUpdating}>
          Save Changes
        </Button>
      </ButtonGroup>
    </form>
  )
}
