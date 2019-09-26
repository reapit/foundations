import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState } from '@/types/core'
import { authLogin } from '@/actions/auth'
import { validate } from '@/utils/form/login'
import Routes from '@/constants/routes'
import { LOGIN_TYPE } from '@/constants/auth'
import { Input, Button, LoginParams, Alert } from '@reapit/elements'

import loginStyles from '@/styles/pages/login.scss?mod'
import bulma from '@/styles/vendor/bulma'
import logoImage from '@/assets/images/lifetimelegalwhite.png'

export interface LoginMappedActions {
  login: (params: LoginParams) => void
}

export interface LoginMappedProps {
  isLogin: boolean
  error: boolean
}

export interface LoginFormValues {
  email: string
  password: string
}

export type LoginProps = LoginMappedActions & LoginMappedProps & RouteComponentProps

export const onSubmitHandler = (setIsSubmitting: any, login: any, values: LoginFormValues) => {
  const { email, password } = values

  setIsSubmitting(true)
  login({ userName: email, password, loginType: LOGIN_TYPE.CLIENT } as LoginParams)
}

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { isLogin, error, login } = props
  const { disabled, wrapper, container, imageLogo, wrapperBorder } = loginStyles
  const { level } = bulma

  React.useEffect(() => {
    if (error) {
      setIsSubmitting(false)
    }
  }, [error])

  if (isLogin) {
    return <Redirect to={Routes.SEARCH} />
  }

  const LoginForm = (
    <div className={container}>
      <div className={`${wrapper} ${isSubmitting && disabled}`}>
        <img className={imageLogo} src={logoImage} alt="lifetimelegal" />
        <div className={wrapperBorder}>
          <Formik
            validate={validate}
            initialValues={{ email: '', password: '' } as LoginFormValues}
            onSubmit={values => onSubmitHandler(setIsSubmitting, login, values)}
            render={() => (
              <Form data-test="login-form">
                <Input
                  dataTest="login-email"
                  type="text"
                  labelText="Email"
                  id="email"
                  name="email"
                  placeholder="name@address.com"
                />
                <Input
                  dataTest="login-password"
                  type="password"
                  labelText="Password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                />

                <div className={level}>
                  <Button type="submit" loading={isSubmitting} variant="primary" fullWidth disabled={isSubmitting}>
                    Login
                  </Button>
                </div>

                {error && <Alert type="danger" message="Login failed, user credentials not recognised" />}
              </Form>
            )}
          />
        </div>
      </div>
    </div>
  )

  return LoginForm
}

const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  isLogin: state.auth.isLogin,
  error: state.auth.error
})

const mapDispatchToProps = (dispatch: Dispatch): LoginMappedActions => ({
  login: (params: LoginParams) => dispatch(authLogin(params))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
)
