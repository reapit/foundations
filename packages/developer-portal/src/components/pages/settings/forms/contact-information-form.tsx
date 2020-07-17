import React from 'react'
import {
  FormSection,
  FormHeading,
  FormSubHeading,
  Input,
  Button,
  Form,
  LevelRight,
  Grid,
  GridItem,
  Formik,
  FormikHelpers,
} from '@reapit/elements'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { validationSchema } from './form-schema/validation-schema'
import { formFieldsContactInfomation } from './form-schema/form-fields'

const { nameField, jobTitleField, telephoneField, companyNameField } = formFieldsContactInfomation

export type ContactInformationValues = {
  companyName: string
  name: string
  jobTitle: string
  telephone: string
}

export type ContactInformationFormProps = {
  developerInformation: DeveloperModel | null
  updateDeveloperInformation: (values: ContactInformationValues) => void
}

export const defaultInitialValues: ContactInformationValues = {
  name: '',
  companyName: '',
  telephone: '',
  jobTitle: '',
}

export const generateInitialValues = ({
  defaultInitialValues,
  developerInfo,
}: {
  defaultInitialValues: ContactInformationValues
  developerInfo: DeveloperModel | null
}): ContactInformationValues => {
  if (!developerInfo) {
    return defaultInitialValues
  }

  const { name = '', company: companyName = '', telephone = '', jobTitle = '' } = developerInfo

  return {
    name,
    companyName,
    telephone,
    jobTitle,
  }
}

export const ContactInformationForm: React.FC<ContactInformationFormProps> = ({
  developerInformation,
  updateDeveloperInformation,
}) => {
  const initialValues = generateInitialValues({ defaultInitialValues, developerInfo: developerInformation })

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmitContactInformation(updateDeveloperInformation)}
    >
      {({ isSubmitting, isValidating, isValid }) => {
        return (
          <FormSection>
            <Form>
              <FormHeading>Contact Information</FormHeading>
              <FormSubHeading>Please use the fields below to edit your contact information</FormSubHeading>
              <Grid>
                <GridItem>
                  <Input
                    dataTest="company-name"
                    type="text"
                    labelText={companyNameField.label as string}
                    id={companyNameField.name}
                    name={companyNameField.name}
                  />
                </GridItem>
                <GridItem>
                  <Input
                    dataTest="name"
                    type="text"
                    labelText={nameField.label as string}
                    id={nameField.name}
                    name={nameField.name}
                  />
                </GridItem>
              </Grid>
              <Grid>
                <GridItem>
                  <Input
                    dataTest="job-title"
                    type="text"
                    labelText={jobTitleField.label as string}
                    id={jobTitleField.name}
                    name={jobTitleField.name}
                  />
                </GridItem>
                <GridItem>
                  <Input
                    dataTest="telephone"
                    type="tel"
                    labelText={telephoneField.label as string}
                    id={telephoneField.name}
                    name={telephoneField.name}
                  />
                </GridItem>
              </Grid>
              <LevelRight>
                <Button
                  dataTest="save-changes"
                  disabled={!isValid}
                  loading={isSubmitting || isValidating}
                  variant="primary"
                  type="submit"
                >
                  Save Changes
                </Button>
              </LevelRight>
            </Form>
          </FormSection>
        )
      }}
    </Formik>
  )
}

export const handleSubmitContactInformation = (
  updateDeveloperInformation: (values: ContactInformationValues) => void,
) => (values: ContactInformationValues, { setSubmitting }: FormikHelpers<ContactInformationValues>) => {
  setSubmitting(true)
  updateDeveloperInformation(values)
}

export default ContactInformationForm
