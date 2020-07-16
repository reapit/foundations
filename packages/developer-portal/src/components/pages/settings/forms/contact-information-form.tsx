import React from 'react'
import {
  FormSection,
  FormHeading,
  FormSubHeading,
  Input,
  Button,
  Form,
  FormikBag,
  LevelRight,
  Grid,
  GridItem,
  Formik,
} from '@reapit/elements'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { validate } from '@/utils/form/settings-contact-information'

export type ContactInformationFormProps = {
  developerInformation: DeveloperModel | null
  updateDeveloperInformation: (values: ContactInformationValues) => void
}
export const ContactInformationForm: React.FC<ContactInformationFormProps> = ({
  developerInformation,
  updateDeveloperInformation,
}) => {
  return (
    <Formik
      validate={validate}
      initialValues={{
        jobTitle: developerInformation?.jobTitle || '',
        telephone: developerInformation?.telephone || '',
        companyName: developerInformation?.company || '',
        name: developerInformation?.name || '',
      }}
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
                    labelText="Company Name"
                    id="companyName"
                    name="companyName"
                  />
                </GridItem>
                <GridItem>
                  <Input dataTest="name" type="text" labelText="Full Name" id="name" name="name" />
                </GridItem>
              </Grid>
              <Grid>
                <GridItem>
                  <Input dataTest="job-title" type="text" labelText="Job Title" id="jobTitle" name="jobTitle" />
                </GridItem>
                <GridItem>
                  <Input dataTest="telephone" type="tel" labelText="Telephone" id="phone" name="telephone" />
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

export type ContactInformationValues = {
  companyName: string
  name: string
  jobTitle: string
  telephone: string
}

export const handleSubmitContactInformation = (
  updateDeveloperInformation: (values: ContactInformationValues) => void,
) => (values: ContactInformationValues, { setSubmitting }: FormikBag<null, null>) => {
  setSubmitting(true)
  updateDeveloperInformation(values)
}

export default ContactInformationForm
