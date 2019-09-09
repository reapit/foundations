import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'

export interface LoginMappedActions {}

export interface LoginMappedProps {}

export interface LoginFormValues {
  email: string
  password: string
}

export type LoginProps = LoginMappedActions & LoginMappedProps & RouteComponentProps

export const Login: React.FunctionComponent<LoginProps> = () => {
  return <h1>Login Page</h1>
}

const mapStateToProps = (): LoginMappedProps => ({})

const mapDispatchToProps = (): LoginMappedActions => ({})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
)
