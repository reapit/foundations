import React, { FC, useEffect } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  ElToggleItem,
  FormLayout,
  InputError,
  InputGroup,
  InputWrap,
  Label,
  Subtitle,
  Toggle,
  ToggleRadio,
  ToggleRadioOption,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { selectIsUserOrUserAdmin, selectLoginIdentity } from '../../../../selector/auth'
import { useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { SandboxModelPagedResult, UpdateMemberModel } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'
import { useSettingsState } from '../state/use-settings-state'
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
  const { settingsDataState, settingsRefreshCurrentMember } = useSettingsState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { clientId, orgName } = selectLoginIdentity(connectSession)
  const isUserOrUserAdmin = selectIsUserOrUserAdmin(connectSession)
  const { currentMember } = settingsDataState
  const isClient = clientId && isUserOrUserAdmin
  const isDev = window.reapit.config.appEnv !== 'production'

  const [sandboxes] = useReapitGet<SandboxModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getSandboxes],
    fetchWhenTrue: [isDev],
  })

  const [, memberUpdating, updateMember, updateMemberSuccess] = useReapitUpdate<UpdateMemberModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateMember],
    method: 'PUT',
    uriParams: {
      developerId: currentMember?.developerId,
      memberId: currentMember?.id,
    },
  })

  useEffect(handleRefreshMember(settingsRefreshCurrentMember, updateMemberSuccess), [updateMemberSuccess])

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
      sandboxId: currentMember?.sandboxId ?? 'GBR',
    },
  })

  return (
    <form onSubmit={handleSubmit(updateMember)}>
      <Subtitle>Your Profile</Subtitle>
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
            {...register('jobTitle')}
            label="Job Title"
            errorMessage={errors?.jobTitle?.message}
            icon={errors?.jobTitle?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('gitHubUsername')}
            label="GitHub Username"
            errorMessage={errors?.gitHubUsername?.message}
            icon={errors?.gitHubUsername?.message ? 'asteriskSystem' : null}
            intent="danger"
          />
        </InputWrap>
      </FormLayout>
      {(isClient || isDev) && <Subtitle>Customer Data</Subtitle>}
      {isClient && (
        <BodyText hasGreyText>
          As your account is associated with both the Sandbox Data (SBOX) and Customer Data, you can choose to toggle
          between which data you want to see available in the Developer Portal.
        </BodyText>
      )}
      {isDev && (
        <BodyText hasGreyText>
          You can choose which sandbox you wish to view based on your Reapit Product. This is specific and only
          associated to your developer profile.
        </BodyText>
      )}
      {(isClient || isDev) && (
        <BodyText hasGreyText>
          <strong>Please note, you will need to log out and log back in again to see this change take effect.</strong>
        </BodyText>
      )}
      <FormLayout hasMargin>
        {isClient && (
          <InputWrap>
            <InputGroup>
              <Toggle id="useCustomerData" hasGreyBg {...register('useCustomerData')}>
                <ElToggleItem>Customer</ElToggleItem>
                <ElToggleItem>Sandbox</ElToggleItem>
              </Toggle>
              <Label>Use {orgName} Customer or Sandbox data</Label>
              {errors.useCustomerData?.message && <InputError message={errors.useCustomerData?.message} />}
            </InputGroup>
          </InputWrap>
        )}
        {isDev && (
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
        )}
      </FormLayout>
      <ButtonGroup>
        <Button intent="primary" type="submit" disabled={memberUpdating} loading={memberUpdating}>
          Save Changes
        </Button>
      </ButtonGroup>
    </form>
  )
}
