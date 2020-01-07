import React from 'react'
import { compose } from 'redux'
import {
  FlexContainerResponsive,
  GridItem,
  FormSection,
  FormHeading,
  FormSubHeading,
  Grid,
  Input,
  Button,
  Form,
  withFormik,
  FormikProps,
  FormikBag
} from '@reapit/elements'
import { validate } from '@/utils/form/change-password'

export type ChangePasswordFormProps = FormikProps<ChangePasswordValues>

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  isSubmitting,
  isValidating,
  isValid,
  touched
}) => {
  const isEnable =
    isValid && Boolean(touched) && (touched.confirmPassword || touched.currentPassword || touched.password)
  return (
    <FormSection>
      <Form>
        <FormHeading>Change password</FormHeading>
        <FormSubHeading>
          Please complete the following fields to change your password. You will be automatically logged out for the
          changes to be applied
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
          <Button
            dataTest="button-change-password"
            disabled={!isEnable}
            loading={isSubmitting || isValidating}
            variant="primary"
            type="submit"
          >
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

export const mapPropsChangePassword = (): ChangePasswordValues => ({
  currentPassword: '',
  password: '',
  confirmPassword: ''
})

export type ChangePasswordParams = {
  values: ChangePasswordValues
  email: string
}

export type EnhanceChangePasswordFormProps = {
  changePassword: (values: ChangePasswordValues) => void
  email: string
}

export const handleSubmitChangePassword = async (
  values: ChangePasswordValues,
  { setSubmitting, props }: FormikBag<EnhanceChangePasswordFormProps, ChangePasswordValues>
) => {
  setSubmitting(true)
  props.changePassword(values)
}

export const withChangePasswordForm = withFormik({
  displayName: 'WithChangePasswordForm',
  validate,
  mapPropsToValues: mapPropsChangePassword,
  handleSubmit: handleSubmitChangePassword
})

const EnhanceChangePasswordForm = compose<React.FC<EnhanceChangePasswordFormProps>>(withChangePasswordForm)(
  ChangePasswordForm
)
EnhanceChangePasswordForm.displayName = 'EnhanceChangePasswordForm'

export default EnhanceChangePasswordForm
