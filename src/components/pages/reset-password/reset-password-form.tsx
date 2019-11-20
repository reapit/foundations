import React from 'react'
import { FlexContainerBasic, Grid, GridItem, Input, FlexContainerResponsive, Button } from '@reapit/elements'
import { Form, withFormik, FormikProps, FormikErrors, FormikBag } from 'formik'
import { compose, Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { connect } from 'react-redux'

export type ResetPasswordFormProps = FormikProps<{}>

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ isValid, isSubmitting, isValidating }) => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Form>
        <Grid>
          <GridItem>
            <Input dataTest="password" type="password" labelText="Password" id="password" name="password" />
          </GridItem>
        </Grid>
        <Grid>
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
            Reset Password
          </Button>
        </FlexContainerResponsive>
      </Form>
    </FlexContainerBasic>
  )
}

export const mapPropsToValues = (): ResetPasswordValues => {
  return {
    password: '',
    confirmPassword: ''
  }
}

export type ResetPasswordValues = {
  password: string
  confirmPassword: string
}

export const validateResetPasswordForm = (values: ResetPasswordValues) => {
  const errors: FormikErrors<ResetPasswordValues> = {}
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  return errors
}

export const resetPassword = ({ values, token }) => {
  console.log({ values, token })
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

export const parseQueryParamsToToken = (queryParams: string): string => {
  const token = ''
  if (!queryParams || queryParams === '') {
    return token
  }
  const queryParamsArray = queryParams.split('=')
  const isValidQueryParams = queryParamsArray && queryParamsArray.length >= 1
  if (isValidQueryParams) {
    return queryParamsArray[1]
  }
  return token
}

export const handleSubmitResetPassword = async (
  values: ResetPasswordValues,
  { setSubmitting, props }: FormikBag<DispatchProps & RouteComponentProps, ResetPasswordValues>
) => {
  try {
    const token = parseQueryParamsToToken(props.location?.search || '')
    const isValidToken = token && token !== ''
    if (!isValidToken) {
      setSubmitting(false)
      return null
    }
    const response = await resetPassword({ values, token })
    if (response) {
      setSubmitting(false)
      const SUCCESS_ALERT_LOGIN_PAGE = '/developer/login?isChangePasswordSuccess=1'
      props.history.replace(SUCCESS_ALERT_LOGIN_PAGE)
    }
  } catch (error) {
    console.error(error)
    props.errorNotification()
  }
}

export const withForm = withFormik({
  displayName: 'ResetPasswordPageWithForm',
  validate: validateResetPasswordForm,
  mapPropsToValues: mapPropsToValues,
  handleSubmit: handleSubmitResetPassword
})

export type DispatchProps = {
  errorNotification: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    errorNotification: () =>
      dispatch(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
  }
}

export const withRedux = connect(null, mapDispatchToProps)

export type EnhanceResetPasswordFormProps = {}

export const EnhanceResetPasswordForm = compose<React.FC<EnhanceResetPasswordFormProps>>(
  withRouter,
  withRedux,
  withForm
)(ResetPasswordForm)

EnhanceResetPasswordForm.displayName = 'EnhanceResetPasswordForm'

export default EnhanceResetPasswordForm
