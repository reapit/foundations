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

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type LoginMutationResponse = {
  login: LoginResponse
}

export const handleOnSubmit = ({ login }) => (values: LoginFormValues) => {
  login({
    variables: {
      userName: values.userName,
      password: values.password,
      loginType: 'CLIENT',
    } as LoginParams,
  })
}

export const handleOnCompleted = ({ history }) => (cache: any, response: LoginMutationResponse) => {
  const { refreshToken, accessToken } = response?.login
  localStorage.setItem('refreshToken', refreshToken)
  localStorage.set('accessToken', accessToken)
  history.push(Routes.HOME)
}

export type LoginProps = RouteComponentProps

export const Login: React.FC<LoginProps> = ({ history }: LoginProps) => {
  const { wrapper, container, image } = loginStyles

  const [login, { loading, error }] = useMutation<LoginMutationResponse, LoginParams>(LOGIN, {
    onCompleted: handleOnCompleted({ history }),
  } as MutationHookOptions<LoginMutationResponse, LoginParams>)
  console.log(loading)
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
