import React, { FC } from 'react'
import { passwordRegex, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { AccountCreateModel } from '../../../types/accounts'
import { object, ref, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useGlobalState } from '../../../core/use-global-state'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { BodyText, Button, ButtonGroup, FormLayout, InputError, InputGroup, InputWrap } from '@reapit/elements'

export interface AccountUpdateModalProps {
  accountId: string | null
  closeModal: () => void
}

const validationSchema = object({
  password: string()
    .required('Required')
    .matches(passwordRegex, 'Password must be at least 8 characters, 1 number, mixed case'),
  passwordConfirm: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Required'),
})

export const handleUpdateAccount =
  (
    updateAccount: SendFunction<Partial<AccountCreateModel>, boolean>,
    refreshAccounts: () => void,
    closeModal: () => void,
  ) =>
  async (formValues: Partial<AccountCreateModel>) => {
    const accountUpdate = await updateAccount(formValues)

    if (accountUpdate) {
      refreshAccounts()
      closeModal()
    }
  }

export const AccountUpdateModal: FC<AccountUpdateModalProps> = ({ accountId, closeModal }) => {
  const { refreshAccounts } = useGlobalState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<AccountCreateModel>>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  })

  const [, , updateAccount] = useReapitUpdate<Partial<AccountCreateModel>, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateDwAccount],
    method: 'PATCH',
    uriParams: {
      accountId,
    },
  })

  return (
    <form onSubmit={handleSubmit(handleUpdateAccount(updateAccount, refreshAccounts, closeModal))}>
      <BodyText hasGreyText>Enter new password below</BodyText>
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
          Update
        </Button>
      </ButtonGroup>
    </form>
  )
}
