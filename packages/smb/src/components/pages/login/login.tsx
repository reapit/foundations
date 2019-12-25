import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Input, Button, H1, Level, Alert, Formik, Form } from '@reapit/elements'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import Routes from '@/constants/routes'
import { useMutation, MutationHookOptions } from '@apollo/react-hooks'
import LOGIN from './login.graphql'
import { LoginParams } from '@reapit/cognito-auth'

export type LoginFormValues = {
  userName: string
  password: string
}

export type Token = {
  accessToken: string
  refreshToken: string
}

export type LoginResponse = {
  login: Token
}

export const handleOnSubmit = ({ login }) => (values: LoginFormValues) => {
  login({
    variables: {
      userName: values.userName,
      password: values.password,
      loginType: 'CLIENT',
      mode: 'WEB',
    } as LoginParams,
  })
}

export const handleOnCompleted = ({ history }) => (data: LoginResponse) => {
  const { refreshToken, accessToken } = data.login
  localStorage.setItem('accessToken', `Bearer ${accessToken}`)
  localStorage.setItem('refreshToken', `Bearer ${refreshToken}`)
  history.replace(Routes.HOME)
}

export const Login: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const { wrapper, container, image } = loginStyles

  const [login, { loading, error }] = useMutation<LoginResponse, LoginParams>(LOGIN, {
    onCompleted: handleOnCompleted({ history }),
  } as MutationHookOptions<LoginResponse, LoginParams>)

  console.log(login)

  return (
    <div className={container}>
      <div className={`${wrapper}`}>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to smb</p>
        <Formik initialValues={{ userName: '', password: '' } as LoginFormValues} onSubmit={handleOnSubmit({ login })}>
          <Form data-test="login-form">
            <Input
              required
              dataTest="login-email"
              type="email"
              labelText="Email"
              id="userName"
              name="userName"
              placeholder="Enter your user's name"
            />
            <Input
              required
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
        </Formik>
      </div>

      <div className={image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default withRouter(Login)
