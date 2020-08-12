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
import { MemberModel } from '@reapit/foundations-ts-definitions'
import { validationSchemaContactInfomation as validationSchema } from './form-schema/validation-schema'
import { formFieldsContactInfomation } from './form-schema/form-fields'
import { updateCurrentMember } from '@/actions/current-member'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentMemberData } from '@/selector/current-member'

const { nameField, jobTitleField } = formFieldsContactInfomation

export type ContactInformationValues = {
  name: string
  jobTitle: string
}

export type ContactInformationFormProps = {}

export const defaultInitialValues: ContactInformationValues = {
  name: '',
  jobTitle: '',
}

export const generateInitialValues = ({
  defaultInitialValues,
  currentMemberInfo,
}: {
  defaultInitialValues: ContactInformationValues
  currentMemberInfo: MemberModel | null
}): ContactInformationValues => {
  if (!currentMemberInfo) {
    return defaultInitialValues
  }

  const { name = '', jobTitle = '' } = currentMemberInfo

  return {
    name,
    jobTitle,
  }
}

export const ContactInformationForm: React.FC<ContactInformationFormProps> = () => {
  const currentMemberInfo = useSelector(selectCurrentMemberData)
  const dispatch = useDispatch()
  const updateCurrentMemberInformation = values => dispatch(updateCurrentMember(values))

  const initialValues = generateInitialValues({ defaultInitialValues, currentMemberInfo })

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmitContactInformation(updateCurrentMemberInformation)}
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
                    dataTest="name"
                    type="text"
                    labelText={nameField.label as string}
                    id={nameField.name}
                    name={nameField.name}
                  />
                </GridItem>
                <GridItem>
                  <Input
                    dataTest="job-title"
                    type="text"
                    labelText={jobTitleField.label as string}
                    id={jobTitleField.name}
                    name={jobTitleField.name}
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
  updateCurrentMemberInformation: (values: ContactInformationValues) => void,
) => (values: ContactInformationValues, { setSubmitting }: FormikHelpers<ContactInformationValues>) => {
  setSubmitting(true)
  updateCurrentMemberInformation(values)
}

export default ContactInformationForm
