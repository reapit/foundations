import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Input, Button, H1, Level, Alert, isEmail, Formik, Form } from '@reapit/elements'
import { LoginParams } from '@reapit/cognito-auth'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import Routes from '@/constants/routes'
import { useMutation } from '@apollo/react-hooks'
import LOGIN_MUTATION from './login-mutation.graphql'

export type LoginMappedActions = {
  login: (params: LoginParams) => void
}

export type LoginFormValues = {
  email: string
  password: string
}

export type LoginMutationResponse = {
  login: LoginResponse
}

export type LoginResponse = {
  token: string
}

export type LoginFormError = {
  email?: string
  password?: string
}

export function validate(values: LoginFormValues) {
  let errors = {} as LoginFormError

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
}

export type LoginProps = RouteComponentProps

export const Login: React.FunctionComponent<LoginProps> = ({ history }) => {
  const { wrapper, container, image } = loginStyles

  const [login, { data, loading, error }] = useMutation<LoginMutationResponse, LoginFormValues>(LOGIN_MUTATION)
  if (!loading && data) {
    history.push(Routes.HOME)
  }

  return (
    <div className={container}>
      <div className={`${wrapper}`}>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to smb</p>
        <Formik
          validate={validate}
          initialValues={{ email: 'admin@yahoo.com', password: '' } as LoginFormValues}
          onSubmit={values => {
            login({ variables: { email: values.email, password: values.password } })
          }}
        >
          {() => (
            <Form data-test="login-form">
              <Input
                dataTest="login-email"
                type="email"
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
              <Level>
                <Button type="submit" loading={loading} variant="primary" disabled={loading}>
                  Login
                </Button>
              </Level>
              {error && <Alert message="Login failed, user credentials not recognised" type="danger" />}
            </Form>
          )}
        </Formik>
      </div>

      <div className={image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default withRouter(Login)
