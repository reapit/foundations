import React from 'react'
import { H1 } from '@reapit/elements'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import EnhanceResetPasswordForm from './reset-password-form'

export const ResetPassword: React.FC = () => {
  return (
    <div className={loginStyles.container}>
      <div className={`${loginStyles.wrapper} ${loginStyles.isSubmitting && loginStyles.disabled}`}>
        <H1 isCentered>Reset Password</H1>
        <p className="pb-8">Welcome to Reapit Foundations</p>
        <EnhanceResetPasswordForm />
      </div>
      <div className={loginStyles.image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default ResetPassword
