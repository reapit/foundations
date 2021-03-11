import React from 'react'
import {
  FormSection,
  FormSubHeading,
  Input,
  Button,
  Form,
  Formik,
  H5,
  LevelRight,
  Grid,
  GridItem,
  FormikHelpers,
} from '@reapit/elements'
import { validationSchemaChangePassword as validationSchema } from './form-schema/validation-schema'
import { formFieldsChangePassword } from './form-schema/form-fields'
import FadeIn from '../../../../styles/fade-in'

const { currentPasswordField, passwordField, confirmPasswordField } = formFieldsChangePassword

export type ChangePasswordValues = {
  currentPassword: string
  password: string
  confirmPassword: string
}

export type ChangePasswordFormProps = {
  changePassword: (values: ChangePasswordValues) => void
}

export const handleSubmitChangePassword = (changePassword: (values: ChangePasswordValues) => void) => (
  values: ChangePasswordValues,
  { setSubmitting }: FormikHelpers<ChangePasswordValues>,
) => {
  setSubmitting(true)
  changePassword(values)
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ changePassword }) => {
  return (
    <FormSection>
      <Formik
        initialValues={{
          currentPassword: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitChangePassword(changePassword)}
      >
        {({ isSubmitting, isValidating, isValid, touched }) => {
          const isEnable =
            isValid && Boolean(touched) && (touched.confirmPassword || touched.currentPassword || touched.password)

          return (
            <Form>
              <FadeIn>
                <H5>Change password</H5>
                <FormSubHeading>
                  Please complete the following fields to change your password. You will be automatically logged out for
                  the changes to be applied
                </FormSubHeading>
                <Grid>
                  <GridItem>
                    <Input
                      dataTest="current-password"
                      type="password"
                      labelText={currentPasswordField.label}
                      id={currentPasswordField.name}
                      name={currentPasswordField.name}
                    />
                  </GridItem>
                  <GridItem>
                    <Input
                      dataTest="password"
                      type="password"
                      labelText={passwordField.label}
                      id={passwordField.name}
                      name={passwordField.name}
                    />
                  </GridItem>
                </Grid>
                <Grid>
                  <GridItem className="is-half">
                    <Input
                      dataTest="confirmPassword"
                      type="password"
                      labelText={confirmPasswordField.label}
                      id={confirmPasswordField.name}
                      name={confirmPasswordField.name}
                    />
                  </GridItem>
                </Grid>
                <LevelRight>
                  <Button
                    dataTest="button-change-password"
                    disabled={!isEnable}
                    loading={isSubmitting || isValidating}
                    variant="primary"
                    type="submit"
                  >
                    Change Password
                  </Button>
                </LevelRight>
              </FadeIn>
            </Form>
          )
        }}
      </Formik>
    </FormSection>
  )
}

export default ChangePasswordForm
