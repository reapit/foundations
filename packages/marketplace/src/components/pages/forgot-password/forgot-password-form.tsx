import React from 'react'
import { compose } from 'redux'
import {
  FlexContainerResponsive,
  GridItem,
  FormSubHeading,
  Grid,
  Input,
  Button,
  Alert,
  Form,
  withFormik,
  FormikProps,
  FormikBag,
  H5,
  FlexContainerBasic
} from '@reapit/elements'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

export const SuccessForgetPasswordContent: React.FC = () => {
  return (
    <FlexContainerBasic flexColumn centerContent hasPadding>
      <H5 isCentered>Success</H5>
      <span>
        Please check your inbox for an email we have just sent you with instructions for how to reset your password.
      </span>
      <br />
      <Link to="/developer/login">Click here to return to the login page</Link>
    </FlexContainerBasic>
  )
}

export type ForgotPasswordFormProps = FormikProps<ForgotPasswordValues> & RouteComponentProps

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  isSubmitting,
  isValidating,
  isValid,
  location
}) => {
  const isError = location.search === '?isError=1'
  const isSuccess = location.search === '?isSuccess=1'
  if (isSuccess) {
    return <SuccessForgetPasswordContent />
  }
  return (
    <Form>
      <FormSubHeading>Please enter your email address to reset your password</FormSubHeading>
      <Grid>
        <GridItem>
          <Input dataTest="email" type="email" labelText="Email" id="email" name="email" />
        </GridItem>
      </Grid>
      {isError && (
        <Alert
          type="danger"
          message="Your forgotten password request has failed. Please try again or contact our support desk"
        />
      )}
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

export const handleSubmitForgotPassword = async (
  values: ForgotPasswordValues,
  { props }: FormikBag<EnhanceForgotPasswordFormProps & RouteComponentProps, ForgotPasswordValues>
) => {
  props.submitEmail(values.email)
}

export const withForgotPasswordForm = withFormik({
  displayName: 'WithForgotPasswordForm',
  mapPropsToValues,
  handleSubmit: handleSubmitForgotPassword
})

export type EnhanceForgotPasswordFormProps = {
  submitEmail: (email: string) => void
}

const EnhanceForgotPasswordForm = compose<React.FC<EnhanceForgotPasswordFormProps>>(
  withRouter,
  withForgotPasswordForm
)(ForgotPasswordForm)
EnhanceForgotPasswordForm.displayName = 'EnhanceForgotPasswordForm'

export default EnhanceForgotPasswordForm
