import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ReduxState } from '../../types/core'
import Alert from '../ui/alert'
import { Formik, Form } from 'formik'
import Input from '../form/input'
import { authLogin } from '../../actions/auth'
import { LoginContainer, LoginFormWrapper } from '../../styles/pages/login'
import { validate } from '../../utils/form/login'

export interface LoginMappedActions {
  login: () => void
}

export interface LoginMappedProps {
  isLogin: boolean
  error: boolean
}

export interface LoginFormValues {
  email: string
  password: string
}

export type LoginProps = LoginMappedActions & LoginMappedProps

export const Login: React.FunctionComponent<LoginProps> = ({ isLogin, error, login }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  React.useEffect(() => {
    if (error) {
      setIsSubmitting(false)
    }
  }, [error])
  if (isLogin) {
    return <Redirect to="/client" />
  }
  return (
    <LoginContainer>
      <LoginFormWrapper>
        <Formik
          validate={validate}
          initialValues={{ email: '', password: '' } as LoginFormValues}
          onSubmit={(values, actions) => {
            console.log(values)
            setIsSubmitting(true)
            login()
          }}
          render={props => (
            <Form>
              <Input type="email" label="Email" id="email" name="email" />
              <Input type="password" label="Password" id="password" name="password" />
              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                Login
              </button>
              {error && (
                <Alert message="Login failed, user credentials not recognised" type="danger" className="mt-4 mb-1" />
              )}
            </Form>
          )}
        />
      </LoginFormWrapper>
    </LoginContainer>
  )
}

const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  isLogin: state.auth.isLogin,
  error: state.auth.error
})

const mapDispatchToProps = (dispatch: any): LoginMappedActions => ({
  login: () => dispatch(authLogin())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
