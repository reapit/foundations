import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import Alert from '@/components/ui/alert'
import { Formik, Form } from 'formik'
import { Input, Button } from '@reapit/elements'
import loginStyles from '@/styles/pages/login.scss?mod'
import { registerValidate } from '@/utils/form/register'
import { Link } from 'react-router-dom'
import Routes from '../../constants/routes'
import bulma from '@/styles/vendor/bulma'
import { CreateDeveloperModel } from '../../types/marketplace-api-schema'
import { Dispatch } from 'redux'
import { developerCreate } from '../../actions/developer'
import { FormState } from '../../types/core'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import CallToAction from '../ui/call-to-action'

// const { history } = React.lazy(() => )

export interface RegisterMappedActions {
  developerCreate: (developer: CreateDeveloperModel) => void
}

export interface RegisterMappedProps {
  formState: FormState
}

export interface RegisterFormValues {
  name: string
  companyName: string
  email: string
  telephone: string
  password: string
  confirmPassword: string
}

export type RegisterProps = RegisterMappedActions & RegisterMappedProps

const { level, title, isH1, isCentered } = bulma
const { container, wrapper, disabled, image } = loginStyles

export const Register: React.FunctionComponent<RegisterProps> = ({ developerCreate, formState }) => {
  const isDisabled = formState === 'SUBMITTING'
  return (
    <div className={container}>
      <div className={`${wrapper} ${isDisabled ? disabled : ''}`}>
        <h1 className={`${title} ${isH1} ${isCentered}`}>Register</h1>
        <p className="pb-8">Reapit Foundations developers</p>
        {formState === 'SUCCESS' ? (
          <CallToAction
            title="Success!"
            buttonText="Login"
            dataTest="register-success-message"
            onButtonClick={() =>
              import('../../core/router').then(router => {
                router.history.push(Routes.LOGIN)
              })
            }
            isCenter
          >
            Check you email to confirm your account
          </CallToAction>
        ) : (
          <>
            <Formik
              validate={registerValidate}
              initialValues={
                {
                  name: '',
                  companyName: '',
                  email: '',
                  telephone: '',
                  password: '',
                  confirmPassword: ''
                } as RegisterFormValues
              }
              onSubmit={values => developerCreate(values as CreateDeveloperModel)}
              render={() => (
                <Form data-test="register-form">
                  <Input
                    dataTest="register-name"
                    type="text"
                    labelText="Full name"
                    id="name"
                    name="name"
                    placeholder="Joe Developer"
                  />
                  <Input
                    dataTest="register-company-name"
                    type="text"
                    labelText="Company name"
                    id="companyName"
                    name="companyName"
                    placeholder="Acme Industries Ltd"
                  />
                  <Input
                    dataTest="register-email"
                    type="email"
                    labelText="Email"
                    id="email"
                    name="email"
                    placeholder="name@address.com"
                  />
                  <Input
                    dataTest="register-telephone"
                    type="tel"
                    labelText="Telephone"
                    id="telephone"
                    name="telephone"
                    placeholder="0800 800 800"
                  />
                  <Input
                    dataTest="register-password"
                    type="password"
                    labelText="Password"
                    id="password"
                    name="password"
                  />
                  <Input
                    dataTest="register-confirm-password"
                    type="password"
                    labelText="Confirm password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <div className={level}>
                    <Button type="submit" loading={isDisabled} variant="primary" disabled={isDisabled} fullWidth>
                      Register
                    </Button>
                  </div>
                  <div className={level}>
                    Already have an account?<Link to={Routes.LOGIN}>Login</Link>
                  </div>
                  {formState === 'ERROR' && (
                    <Alert message="Failed to register" type="danger" dataTest="register-error-message" />
                  )}
                </Form>
              )}
            />
          </>
        )}
      </div>
      <div className={image}>
        <img src={logoImage} alt="Reapit graphic" />
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): RegisterMappedProps => ({
  formState: state.developer.formState
})

const mapDispatchToProps = (dispatch: Dispatch): RegisterMappedActions => ({
  developerCreate: (developer: CreateDeveloperModel) => dispatch(developerCreate(developer))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
