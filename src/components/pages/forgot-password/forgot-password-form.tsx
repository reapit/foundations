import React from 'react'
import { Form, withFormik, FormikProps, FormikBag, FormikErrors } from 'formik'
import { compose } from 'redux'
import { FlexContainerResponsive, GridItem, FormSubHeading, Grid, Input, Button } from '@reapit/elements'
import { RouterProps, withRouter } from 'react-router'
import Routes from '@/constants/routes'

export type ForgotPasswordFormProps = FormikProps<ForgotPasswordValues>

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ isSubmitting, isValidating, isValid }) => {
  return (
    <Form>
      <FormSubHeading>Please enter your email address to reset your password</FormSubHeading>
      <Grid>
        <GridItem>
          <Input dataTest="email" type="email" labelText="Email" id="email" name="email" />
        </GridItem>
      </Grid>
      <FlexContainerResponsive>
        <Button disabled={!isValid} loading={isSubmitting || isValidating} variant="primary" type="submit">
          Submit
        </Button>
      </FlexContainerResponsive>
    </Form>
  )
}

export type ForgotPasswordValues = {
  email: string
}

export const mapPropsToValues = (): ForgotPasswordValues => ({
  email: ''
})

export const requestForgotPassword = (values: ForgotPasswordValues) => {
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

export const handleSubmitForgotPassword = async (
  values: ForgotPasswordValues,
  { setSubmitting, props, setErrors }: FormikBag<EnhanceForgotPasswordFormProps & RouterProps, ForgotPasswordValues>
) => {
  try {
    const response = await requestForgotPassword(values)
    if (response) {
      setSubmitting(false)
      props.history.push(`${Routes.FORGOT_PASSWORD}?isSuccessRequestResetPassword=1`)
    }
  } catch (error) {
    console.error(error)
    setErrors({ email: 'We could not find an account registered with that email address' })
    setSubmitting(false)
  }
}

export const withForgotPasswordForm = withFormik({
  displayName: 'WithForgotPasswordForm',
  mapPropsToValues,
  handleSubmit: handleSubmitForgotPassword
})

export type EnhanceForgotPasswordFormProps = {}

const EnhanceForgotPasswordForm = compose<React.FC<EnhanceForgotPasswordFormProps>>(
  withRouter,
  withForgotPasswordForm
)(ForgotPasswordForm)
EnhanceForgotPasswordForm.displayName = 'EnhanceForgotPasswordForm'

export default EnhanceForgotPasswordForm
