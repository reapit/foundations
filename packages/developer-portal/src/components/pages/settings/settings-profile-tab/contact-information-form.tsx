import React from 'react'
import {
  FormSection,
  H5,
  FormSubHeading,
  Input,
  Button,
  Form,
  LevelRight,
  Grid,
  GridItem,
  Formik,
} from '@reapit/elements-legacy'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import { validationSchemaContactInfomation as validationSchema } from './form-schema/validation-schema'
import { formFieldsContactInfomation } from './form-schema/form-fields'
import { updateCurrentMember } from '@/actions/current-member'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentMemberData, selectCurrentMemberIsUpdating } from '@/selector/current-member'
import FadeIn from '../../../../styles/fade-in'

const { nameField, jobTitleField, gitHubUsernameField } = formFieldsContactInfomation

export type ContactInformationValues = {
  name: string
  jobTitle: string
  gitHubUsername: string
}

export type ContactInformationFormProps = {}

export const defaultInitialValues: ContactInformationValues = {
  name: '',
  jobTitle: '',
  gitHubUsername: '',
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

  const { name = '', jobTitle = '', gitHubUsername = '' } = currentMemberInfo

  return {
    name,
    jobTitle,
    gitHubUsername,
  }
}

export const ContactInformationForm: React.FC<ContactInformationFormProps> = () => {
  const currentMemberInfo = useSelector(selectCurrentMemberData)
  const isUpdating = useSelector(selectCurrentMemberIsUpdating)
  const dispatch = useDispatch()
  const updateCurrentMemberInformation = (values) => dispatch(updateCurrentMember(values))

  const initialValues = generateInitialValues({ defaultInitialValues, currentMemberInfo })

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmitContactInformation(updateCurrentMemberInformation)}
    >
      {({ isValid }) => {
        return (
          <FormSection>
            <Form>
              <FadeIn>
                <H5>Contact Information</H5>
                <FormSubHeading>Please use the fields below to edit your contact information</FormSubHeading>
                <Grid>
                  <GridItem>
                    <Input
                      disabled={isUpdating}
                      dataTest="name"
                      type="text"
                      labelText={nameField.label as string}
                      id={nameField.name}
                      name={nameField.name}
                    />
                  </GridItem>
                  <GridItem>
                    <Input
                      disabled={isUpdating}
                      dataTest="job-title"
                      type="text"
                      labelText={jobTitleField.label as string}
                      id={jobTitleField.name}
                      name={jobTitleField.name}
                    />
                  </GridItem>
                  <GridItem>
                    <Input
                      disabled={isUpdating}
                      dataTest="job-title"
                      type="text"
                      labelText={gitHubUsernameField.label as string}
                      id={gitHubUsernameField.name}
                      name={gitHubUsernameField.name}
                    />
                  </GridItem>
                </Grid>
                <LevelRight>
                  <Button
                    dataTest="save-changes"
                    disabled={!isValid}
                    loading={isUpdating}
                    variant="primary"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </LevelRight>
              </FadeIn>
            </Form>
          </FormSection>
        )
      }}
    </Formik>
  )
}

export const handleSubmitContactInformation =
  (updateCurrentMemberInformation: (values: ContactInformationValues) => void) =>
  (values: ContactInformationValues) => {
    updateCurrentMemberInformation(values)
  }

export default ContactInformationForm
