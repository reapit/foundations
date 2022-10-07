import React, { Dispatch, FC, SetStateAction } from 'react'
import { passwordRegex, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { AccountCreateModel, AccountModel } from '../../../types/accounts'
import { BodyText, Button, ButtonGroup, FormLayout, InputError, InputGroup, InputWrap } from '@reapit/elements'
import { useGlobalState } from '../../../core/use-global-state'
import { object, ref, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SendFunction, UpdateReturnTypeEnum, useReapitUpdate } from '@reapit/utils-react'
import { getAccountService } from '../../../services/accounts'

export interface AccountProvisionModalProps {
  setProvisionInProgress: Dispatch<SetStateAction<boolean>>
  setPercentageComplete: Dispatch<SetStateAction<number>>
  closeModal: () => void
}

const validationSchema = object({
  username: string()
    .required('Required')
    .matches(/^[A-Za-z0-9]{4,20}$/, 'Mixed case alphanumeric characters only. Min 4 chars. Max 20'),
  password: string()
    .required('Required')
    .matches(passwordRegex, 'Password must be at least 8 characters, 1 number, mixed case'),
  passwordConfirm: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Required'),
})

export const handlePolling = (accountId: string): Promise<{ provisioned: boolean; interval: number }> => {
  return new Promise((resolve) => {
    const interval = window.setInterval(async () => {
      const account = await getAccountService(accountId)

      if (account && account.status === 'User is active') {
        resolve({ provisioned: true, interval })
      }

      if (account && account.status === 'An error was encountered when creating this account') {
        resolve({ provisioned: false, interval })
      }
    }, 4500)
  })
}

export const handleCreateAccount =
  (
    setProvisionInProgress: Dispatch<SetStateAction<boolean>>,
    setPercentageComplete: Dispatch<SetStateAction<number>>,
    createAccount: SendFunction<AccountCreateModel, boolean | AccountModel>,
    refreshAccounts: () => void,
    closeModal: () => void,
  ) =>
  async (formValues: AccountCreateModel) => {
    closeModal()
    setProvisionInProgress(true)

    const account = await createAccount(formValues)

    if (!account) {
      return setProvisionInProgress(false)
    }

    const accountId = (account as AccountModel).id

    const { provisioned, interval } = await handlePolling(accountId)

    window.clearInterval(interval)

    if (!provisioned) {
      setPercentageComplete(0)
      return setProvisionInProgress(false)
    }

    setPercentageComplete(100)

    setTimeout(() => {
      setPercentageComplete(0)
      setProvisionInProgress(false)
    }, 10000)

    refreshAccounts()
  }

export const AccountProvisionModal: FC<AccountProvisionModalProps> = ({
  setProvisionInProgress,
  setPercentageComplete,
  closeModal,
}) => {
  const { refreshAccounts } = useGlobalState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountCreateModel>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      isAdmin: false,
      devMode: false,
      organisationId: connectSession?.loginIdentity.orgId ?? '',
      organisationName: connectSession?.loginIdentity.orgName ?? '',
    },
  })

  const [, , createAccount] = useReapitUpdate<AccountCreateModel, AccountModel>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createDwAccount],
    method: 'POST',
    returnType: UpdateReturnTypeEnum.RESPONSE,
  })

  return (
    <form
      onSubmit={handleSubmit(
        handleCreateAccount(setProvisionInProgress, setPercentageComplete, createAccount, refreshAccounts, closeModal),
      )}
    >
      <BodyText hasGreyText>The information below will be used to access your data warehouse account</BodyText>
      <FormLayout>
        <InputWrap>
          <InputGroup {...register('username')} type="text" placeholder="Your username here" label="Username" />
          {errors.username?.message && <InputError message={errors.username.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup {...register('password')} type="password" placeholder="*********" label="Password" />
          {errors.password?.message && <InputError message={errors.password.message} />}
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('passwordConfirm')}
            type="password"
            placeholder="*********"
            label="Confirm Password"
          />
          {errors.passwordConfirm?.message && <InputError message={errors.passwordConfirm.message} />}
        </InputWrap>
      </FormLayout>
      <ButtonGroup alignment="center">
        <Button intent="low" type="button" onClick={closeModal}>
          Cancel
        </Button>
        <Button intent="primary" type="submit">
          Provision
        </Button>
      </ButtonGroup>
    </form>
  )
}
