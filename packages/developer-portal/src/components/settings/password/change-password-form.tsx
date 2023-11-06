import React, { FC } from 'react'
import { Button, ButtonGroup, FormLayout, InputGroup, InputWrap, UseSnack, useSnack } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchemaChangePassword } from './validation-schema'
import { changePasswordService } from '../../../services/cognito-identity'

export type ChangePasswordFormValues = {
  password: string
  newPassword: string
  confirmPassword: string
}

export const handleChangePassword =
  (email: string, { success, error }: UseSnack) =>
  async ({ newPassword, password }: ChangePasswordFormValues) => {
    const passwordChanged = await changePasswordService({
      password,
      newPassword,
      userName: email,
    })

    if (passwordChanged) {
      success('Successfully updated your password')
    } else {
      error('Failed to update your password. This error has been logged, please try again')
    }
  }

export const ChangePasswordForm: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const snacks = useSnack()
  const email = connectSession?.loginIdentity.email ?? ''
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: yupResolver(validationSchemaChangePassword),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(handleChangePassword(email, snacks))}>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup
            {...register('password')}
            type="password"
            label="Current Password"
            placeholder="Current Password"
            errorMessage={errors?.password?.message}
            icon={errors?.password?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('newPassword')}
            type="password"
            label="New Password"
            placeholder="New Password"
            errorMessage={errors?.newPassword?.message}
            icon={errors?.newPassword?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('confirmPassword')}
            type="password"
            label="Confirm New Password"
            placeholder="Confirm New Password"
            errorMessage={errors?.confirmPassword?.message}
            icon={errors?.confirmPassword?.message ? 'asterisk' : null}
            intent="danger"
          />
        </InputWrap>
      </FormLayout>
      <ButtonGroup>
        <Button intent="primary" type="submit">
          Save Changes
        </Button>
      </ButtonGroup>
    </form>
  )
}
