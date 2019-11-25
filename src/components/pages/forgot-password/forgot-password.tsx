import React from 'react'
import { H1, Loader } from '@reapit/elements'
import { compose, Dispatch } from 'redux'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import loginStyles from '@/styles/pages/login.scss?mod'
import EnhanceForgotPasswordForm from './forgot-password-form'
import { connect } from 'react-redux'
import { submitEmail } from '@/actions/forgot-password'
import { ReduxState } from '@/types/core'

export type ForgotPasswordProps = StateProps & DispatchProps

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ submitEmail, loading }) => {
  return (
    <div className={loginStyles.container}>
      <div className={`${loginStyles.wrapper} ${loginStyles.isSubmitting && loginStyles.disabled}`}>
        <H1 isCentered>Forgot password</H1>
        <p className="pb-8">Welcome to Reapit Foundations</p>
        {loading ? <Loader /> : <EnhanceForgotPasswordForm submitEmail={submitEmail} />}
      </div>
      <div className={loginStyles.image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export type DispatchProps = {
  submitEmail: (email: string) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    submitEmail: email => dispatch(submitEmail(email))
  }
}

export type StateProps = {
  loading: boolean
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    loading: state.forgotPassword?.loading
  }
}

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export default compose<React.FC<ForgotPasswordProps>>(withRedux)(ForgotPassword)
