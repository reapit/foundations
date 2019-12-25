import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router'
import Routes from '@/constants/routes'
import { Input, Button, H1, Level, Alert, isEmail, Formik, Form } from '@reapit/elements'
import { LoginParams } from '@reapit/cognito-auth'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { ContactModel } from '@/types/platform'

import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

export const MOCK_QUERY = gql`
  query MockQuery {
    GetContacts @client {
      id
      title
    }
  }
`

interface ContactQueryData {
  GetContacts: ContactModel
}

export type LoginMappedActions = {
  login: (params: LoginParams) => void
}

export type LoginMappedProps = {
  hasSession: boolean
  error: boolean
}

export type LoginFormValues = {
  email: string
  password: string
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

export const onSubmitHandler = (setIsSubmitting: any, login: any, values: LoginFormValues) => {
  const { email, password } = values

  setIsSubmitting(true)
  login({ userName: email, password, loginType: 'CLIENT' } as LoginParams)
}

export const Login: React.FunctionComponent<LoginProps> = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  // const { hasSession, error, login } = props
  const hasSession = false
  const error = null
  const login = () => {}
  const { disabled, wrapper, container, image } = loginStyles

  const { data } = useQuery<ContactQueryData>(MOCK_QUERY)
  console.log('data', data?.GetContacts.title)

  React.useEffect(() => {
    if (error) {
      setIsSubmitting(false)
    }
  }, [error])

  if (hasSession) {
    return <Redirect to={Routes.AUTHENTICATED} />
  }

  return (
    <div className={container}>
      <div className={`${wrapper} ${isSubmitting && disabled}`}>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to smb</p>

        <Formik
          validate={validate}
          initialValues={{ email: '', password: '' } as LoginFormValues}
          onSubmit={values => onSubmitHandler(setIsSubmitting, login, values)}
          render={() => (
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
                <Button type="submit" loading={isSubmitting} variant="primary" disabled={isSubmitting}>
                  Login
                </Button>
              </Level>

              {error && <Alert message="Login failed, user credentials not recognised" type="danger" />}
            </Form>
          )}
        />
      </div>

      <div className={image}>
        <img src={logoImage} alt="Reapit Graphic" />
      </div>
    </div>
  )
}

export default withRouter(Login)
