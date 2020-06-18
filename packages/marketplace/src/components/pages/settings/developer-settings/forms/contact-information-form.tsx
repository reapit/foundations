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
  FormikBag,
} from '@reapit/elements'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { validate } from '@/utils/form/developer-settings-contact-information'

export type ContactInformationFormProps = FormikProps<ContactInformationValues>

export const ContactInformationForm: React.FC<ContactInformationFormProps> = ({
  isSubmitting,
  isValidating,
  isValid,
  touched,
}) => {
  const isEnable =
    isValid && Boolean(touched) && (touched.companyName || touched.jobTitle || touched.name || touched.telephone)
  return (
    <FormSection>
      <Form>
        <FormHeading>Contact Information</FormHeading>
        <FormSubHeading>
          Please use the fields below to edit your contact information
          <br />
          <br />
        </FormSubHeading>
        <Grid>
          <GridItem>
            <Input dataTest="company-name" type="text" labelText="Company Name" id="companyName" name="companyName" />
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
        <FlexContainerResponsive>
          <Button
            dataTest="save-changes"
            disabled={!isEnable}
            loading={isSubmitting || isValidating}
            variant="primary"
            type="submit"
          >
            Save Changes
          </Button>
        </FlexContainerResponsive>
      </Form>
    </FormSection>
  )
}

export type ContactInformationValues = {
  companyName: string
  name: string
  jobTitle: string
  telephone: string
}

export const mapPropsContactInformation = ({ developerInformation }: EnhanceContactInformationProps) => {
  return {
    jobTitle: developerInformation?.jobTitle || '',
    telephone: developerInformation?.telephone || '',
    companyName: developerInformation?.company || '',
    name: developerInformation?.name || '',
  }
}

export type EnhanceContactInformationProps = {
  developerInformation: DeveloperModel | null
  updateDeveloperInformation: (values: ContactInformationValues) => void
}

export const handleSubmitContactInformation = async (
  values: ContactInformationValues,
  { setSubmitting, props }: FormikBag<EnhanceContactInformationProps, ContactInformationValues>,
) => {
  setSubmitting(true)
  props.updateDeveloperInformation(values)
}

export const withContactInformationForm = withFormik({
  displayName: 'WithContactInformationForm',
  mapPropsToValues: mapPropsContactInformation,
  handleSubmit: handleSubmitContactInformation,
  validate,
})

const EnhanceContactInformation = compose<React.FC<EnhanceContactInformationProps>>(withContactInformationForm)(
  ContactInformationForm,
)
EnhanceContactInformation.displayName = 'EnhanceContactInformation'

export default EnhanceContactInformation
