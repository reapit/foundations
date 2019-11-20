import React from 'react'
import { H1 } from '@reapit/elements'
import { withRouter, RouteComponentProps } from 'react-router'
import { compose } from 'redux'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import loginStyles from '@/styles/pages/login.scss?mod'
import EnhanceForgotPasswordForm from './forgot-password-form'

export type ForgotPasswordProps = {} & RouteComponentProps

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ location }) => {
  const isSuccessRequestResetPassword = location?.search === '?isSuccessRequestResetPassword=1'
  return (
    <div className={loginStyles.container}>
      <div className={`${loginStyles.wrapper} ${loginStyles.isSubmitting && loginStyles.disabled}`}>
        <H1 isCentered>Forgot password</H1>
        <p className="pb-8">Welcome to Reapit Foundations</p>
        {isSuccessRequestResetPassword ? (
          <p className="pb-8">Please check your email inbox for the next step to reset your password</p>
        ) : (
          <EnhanceForgotPasswordForm />
        )}
      </div>
      <div className={loginStyles.image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default compose<React.FC<ForgotPasswordProps>>(withRouter)(ForgotPassword)
