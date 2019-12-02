import React from 'react'
import {
  FlexContainerBasic,
  Grid,
  GridItem,
  Input,
  FlexContainerResponsive,
  Button,
  Loader,
  Form,
  withFormik,
  FormikProps,
  FormikErrors,
  FormikBag
} from '@reapit/elements'
import { compose, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { resetPassword } from '@/actions/reset-password'
import { ReduxState } from '@/types/core'

export type ResetPasswordFormProps = FormikProps<ResetPasswordValues> & StateProps & DispatchProps

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ isValid, loading }) => {
  if (loading) {
    return <Loader />
  }
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Form>
        <Grid>
          <GridItem>
            <Input dataTest="email" type="email" labelText="Email" id="email" name="email" />
          </GridItem>
        </Grid>
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
        <Grid>
          <GridItem>
            <Input
              dataTest="verificationCode"
              type="text"
              labelText="Verification Code"
              id="verificationCode"
              name="verificationCode"
            />
          </GridItem>
        </Grid>
        <FlexContainerResponsive>
          <Button disabled={!isValid} variant="primary" type="submit">
            Reset Password
          </Button>
        </FlexContainerResponsive>
      </Form>
    </FlexContainerBasic>
  )
}

export const mapPropsToValues = (): ResetPasswordValues => {
  return {
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  }
}

export type ResetPasswordValues = {
  email: string
  password: string
  confirmPassword: string
  verificationCode: string
}

export const validateResetPasswordForm = (values: ResetPasswordValues) => {
  const errors: FormikErrors<ResetPasswordValues> = {}
  if (values.email === '') {
    errors.email = 'Please input email'
  }
  if (values.verificationCode === '') {
    errors.verificationCode = 'Please input verification code'
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }
  return errors
}

export type ResetPasswordParams = {
  values: ResetPasswordValues
  token: string
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
  { props }: FormikBag<DispatchProps, ResetPasswordValues>
) => {
  props.resetPassword(values)
}

export const withForm = withFormik({
  displayName: 'ResetPasswordPageWithForm',
  validate: validateResetPasswordForm,
  mapPropsToValues: mapPropsToValues,
  handleSubmit: handleSubmitResetPassword
})

export type DispatchProps = {
  resetPassword: (values: ResetPasswordValues) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    resetPassword: (values: ResetPasswordValues) => dispatch(resetPassword(values))
  }
}

export type StateProps = {
  loading: boolean
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    loading: state.resetPassword?.loading
  }
}

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export type EnhanceResetPasswordFormProps = {}

export const EnhanceResetPasswordForm = compose<React.FC<EnhanceResetPasswordFormProps>>(
  withRedux,
  withForm
)(ResetPasswordForm)

EnhanceResetPasswordForm.displayName = 'EnhanceResetPasswordForm'

export default EnhanceResetPasswordForm
