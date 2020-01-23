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
  FormikBag,
} from '@reapit/elements'
import { compose, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { resetPassword } from '@/actions/reset-password'
import { ReduxState } from '@/types/core'
import { withRouter, RouteComponentProps } from 'react-router'
import { validate } from '@/utils/form/reset-password'

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
    password: '',
    confirmPassword: '',
  }
}

export type ResetPasswordValues = {
  password: string
  confirmPassword: string
}

export type ResetPasswordParams = {
  values: ResetPasswordValues
  token: string
}

export const handleSubmitResetPassword = async (
  values: ResetPasswordValues,
  { props }: FormikBag<DispatchProps & RouteComponentProps, ResetPasswordValues>,
) => {
  const queryParams = new URLSearchParams(props.location.search)
  const email = queryParams.get('userName')
  const verificationCode = queryParams.get('verificationCode')
  if (email && verificationCode) {
    props.resetPassword({ ...values, email, verificationCode })
  }
}

export const withForm = withFormik({
  displayName: 'ResetPasswordPageWithForm',
  validate,
  mapPropsToValues: mapPropsToValues,
  handleSubmit: handleSubmitResetPassword,
})

export type DispatchProps = {
  resetPassword: (values: ResetPasswordValues & { email: string; verificationCode: string }) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    resetPassword: (values: ResetPasswordValues & { email: string; verificationCode: string }) =>
      dispatch(resetPassword(values)),
  }
}

export type StateProps = {
  loading: boolean
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    loading: state.resetPassword?.loading,
  }
}

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export type EnhanceResetPasswordFormProps = {}

export const EnhanceResetPasswordForm = compose<React.FC<EnhanceResetPasswordFormProps>>(
  withRouter,
  withRedux,
  withForm,
)(ResetPasswordForm)

EnhanceResetPasswordForm.displayName = 'EnhanceResetPasswordForm'

export default EnhanceResetPasswordForm
