import * as React from 'react'
import { Input, Button, H1, Level, Alert, Formik, Form } from '@reapit/elements'
import loginStyles from '@/styles/pages/login.scss?mod'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { ContactModel } from '@/types/platform'

import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) @client {
      token
    }
  }
`

export interface ContactQueryData {
  GetContacts: ContactModel
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

export type UseMutationPageProps = {}

export const UseMutationPage: React.FunctionComponent<UseMutationPageProps> = () => {
  const { wrapper, container, image } = loginStyles

  const [login, { data, loading, error }] = useMutation<LoginMutationResponse, LoginFormValues>(LOGIN_MUTATION)

  return (
    <div className={container}>
      <div className={`${wrapper}`}>
        <H1 isCentered>Use Mutation Demo</H1>
        <Formik
          initialValues={{ email: '', password: '' } as LoginFormValues}
          onSubmit={values => {
            login({ variables: { email: values.email, password: values.password } })
          }}
        >
          {({ isSubmitting }) => (
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
                <Button
                  type="submit"
                  loading={isSubmitting && loading}
                  variant="primary"
                  disabled={isSubmitting && loading}
                >
                  Login
                </Button>
              </Level>
              {data && <Alert message={'Success'} type="success" />}
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

export default UseMutationPage
