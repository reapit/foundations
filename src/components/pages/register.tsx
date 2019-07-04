import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import Alert from '@/components/ui/alert'
import { Formik, Form } from 'formik'
import Input from '@/components/form/input'
import styles from '@/styles/pages/login.scss'
import { registerValidate } from '@/utils/form/register'
import { Link } from 'react-router-dom'
import Routes from '../../constants/routes'
import bulma from '@/styles/vendor/bulma.scss'
import Button from '../form/button'

export interface RegisterMappedActions {}

export interface RegisterMappedProps {}

export interface RegisterFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterProps = RegisterMappedActions & RegisterMappedProps

type FormState = 'done' | 'submitting' | 'error' | 'success'

export const Register: React.FunctionComponent<RegisterProps> = ({}) => {
  const [formState, setFormState] = React.useState<FormState>('done')
  const disabled = formState === 'submitting'
  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${disabled && styles.disabled}`}>
        {formState === 'success' ? (
          <Alert message="Check you email to confirm your account" type="success" className="mb-0" />
        ) : (
          <>
            <Formik
              validate={registerValidate}
              initialValues={
                { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' } as RegisterFormValues
              }
              onSubmit={(values, actions) => {
                setFormState('submitting')
                setTimeout(() => {
                  console.log(values)
                  setFormState('success')
                }, 300)
              }}
              render={props => (
                <Form>
                  <Input type="text" label="First name" id="firstName" name="firstName" />
                  <Input type="text" label="Last name" id="lastName" name="lastName" />
                  <Input type="email" label="Email" id="email" name="email" />
                  <Input type="password" label="Password" id="password" name="password" />
                  <Input type="password" label="Confirm password" id="confirmPassword" name="confirmPassword" />
                  <div className={bulma.level}>
                    <div className={bulma['level-left']}>
                      <Button type="submit" loading variant="primary" disabled={disabled}>
                        Register
                      </Button>
                    </div>
                    <div className={bulma['level-right']}>
                      <Link to={Routes.LOGIN}>Login</Link>
                    </div>
                  </div>
                  {formState === 'error' && <Alert message="Failed to register" type="danger" className="mt-4 mb-1" />}
                </Form>
              )}
            />
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): RegisterMappedProps => ({})

const mapDispatchToProps = (dispatch: any): RegisterMappedActions => ({})

export default connect()(Register)
