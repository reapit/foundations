import React, { FC } from 'react'
import { Title } from '@reapit/elements'
import { ChangePasswordForm } from './change-password-form'

export const SettingsPasswordPage: FC = () => {
  return (
    <>
      <Title>Password</Title>
      <ChangePasswordForm />
    </>
  )
}

export default SettingsPasswordPage
