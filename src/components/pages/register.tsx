import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import Alert from '@/components/ui/alert'
import { Formik, Form } from 'formik'
import Input from '@/components/form/input'
import loginStyles from '@/styles/pages/login.scss?mod'
import { registerValidate } from '@/utils/form/register'
import { Link } from 'react-router-dom'
import Routes from '../../constants/routes'
import bulma from '@/styles/vendor/bulma'
import Button from '../form/button'
import { CreateDeveloperModel } from '../../types/marketplace-api-schema'
import { Dispatch } from 'redux'
import { developerCreate } from '../../actions/developer'
import { FormState } from '../../types/core'

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
  // password: string
  // confirmPassword: string
}

export type RegisterProps = RegisterMappedActions & RegisterMappedProps

const { level, levelLeft, levelRight } = bulma
const { container, wrapper, disabled } = loginStyles

export const Register: React.FunctionComponent<RegisterProps> = ({ developerCreate, formState }) => {
  const isDisabled = formState === 'SUBMITTING'
  return (
    <div className={container}>
      <div className={`${wrapper} ${isDisabled ? disabled : ''}`}>
        {formState === 'SUCCESS' ? (
          <>
            <Alert
              dataTest="register-success-message"
              message="Check you email to confirm your account"
              type="success"
            />
            <Link to={Routes.LOGIN}>Login</Link>
          </>
        ) : (
          <>
            <Formik
              validate={registerValidate}
              initialValues={
                {
                  name: '',
                  companyName: '',
                  email: '',
                  telephone: '' /*, password: '', confirmPassword: ''*/
                } as RegisterFormValues
              }
              onSubmit={values => developerCreate(values as CreateDeveloperModel)}
              render={() => (
                <Form data-test="register-form">
                  <Input dataTest="register-name" type="text" label="Full name" id="name" name="name" />
                  <Input
                    dataTest="register-company-name"
                    type="text"
                    label="Company name"
                    id="companyName"
                    name="companyName"
                  />
                  <Input dataTest="register-email" type="email" label="Email" id="email" name="email" />
                  <Input dataTest="register-telephone" type="text" label="Telephone" id="telephone" name="telephone" />
                  {/* <Input dataTest="register-password" type="password" label="Password" id="password" name="password" />
                  <Input
                    dataTest="register-confirm-password"
                    type="password"
                    label="Confirm password"
                    id="confirmPassword"
                    name="confirmPassword"
                  /> */}
                  <div className={level}>
                    <div className={levelLeft}>
                      <Button type="submit" loading={isDisabled} variant="primary" disabled={isDisabled}>
                        Register
                      </Button>
                    </div>
                    <div className={levelRight}>
                      <Link to={Routes.LOGIN}>Login</Link>
                    </div>
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
