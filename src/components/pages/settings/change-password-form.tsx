import React from 'react'
import { Form, withFormik, FormikProps, FormikBag, FormikErrors } from 'formik'
import { compose } from 'redux'
import {
  FlexContainerResponsive,
  GridItem,
  FormSection,
  FormHeading,
  FormSubHeading,
  Grid,
  Input,
  Button
} from '@reapit/elements'
import { withRouter, RouterProps } from 'react-router'

export type ChangePasswordFormProps = FormikProps<{}>

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ isSubmitting, isValidating, isValid }) => {
  return (
    <FormSection>
      <Form>
        <FormHeading>Change password</FormHeading>
        <FormSubHeading>
          Please complete the following fields to change your password. You will be automatically logged out for the
          changed to be applied
        </FormSubHeading>
        <Grid>
          <GridItem>
            <Input
              dataTest="current-password"
              type="password"
              labelText="Current Password"
              id="currentPassword"
              name="currentPassword"
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem>
            <Input dataTest="password" type="password" labelText="Password" id="password" name="password" />
          </GridItem>
          <GridItem>
            <Input
              dataTest="confirmPassword"
              type="password"
              labelText="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
            />
          </GridItem>
        </Grid>
        <FlexContainerResponsive>
          <Button disabled={!isValid} loading={isSubmitting || isValidating} variant="primary" type="submit">
            Change Password
          </Button>
        </FlexContainerResponsive>
      </Form>
    </FormSection>
  )
}

export type ChangePasswordValues = {
  currentPassword: string
  password: string
  confirmPassword: string
}

export const validateChangePasswordForm = (values: ChangePasswordValues) => {
  const errors: FormikErrors<ChangePasswordValues> = {}
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  return errors
}

export const mapPropsChangePassword = () => ({
  currentPassword: '',
  password: '',
  confirmPassword: ''
})

export const changePassword = (values: ChangePasswordValues) => {
  console.log(values)
  // TODO: will replace mock here for real API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
    setTimeout(() => {
      reject(new Error('some errors'))
    }, 500)
  })
}

export type EnhanceChangePasswordFormProps = {
  logout: () => void
  errorNotification: () => void
}

export const handleSubmitChangePassword = async (
  values: ChangePasswordValues,
  { setSubmitting, props }: FormikBag<EnhanceChangePasswordFormProps & RouterProps, ChangePasswordValues>
) => {
  try {
    const response = await changePassword(values)
    if (response) {
      setSubmitting(false)
      props.logout()
      const SUCCESS_ALERT_LOGIN_PAGE = '/developer/login?isChangePasswordSuccess=1'
      props.history.replace(SUCCESS_ALERT_LOGIN_PAGE)
    }
  } catch (error) {
    console.error(error)
    props.errorNotification()
  }
}

export const withChangePasswordForm = withFormik({
  displayName: 'WithChangePasswordForm',
  validate: validateChangePasswordForm,
  mapPropsToValues: mapPropsChangePassword,
  handleSubmit: handleSubmitChangePassword
})

const EnhanceChangePasswordForm = compose<React.FC<EnhanceChangePasswordFormProps>>(
  withRouter,
  withChangePasswordForm
)(ChangePasswordForm)
EnhanceChangePasswordForm.displayName = 'EnhanceChangePasswordForm'

export default EnhanceChangePasswordForm
