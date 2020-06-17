import * as React from 'react'
import { FormSection, Form, Grid, GridItem, Formik, LevelRight, Button } from '@reapit/elements'
import ReapitReferenceSection from './reapit-reference-section'
import DirectDebitSection from './direct-debit-section'
import ContactInformationSection from './contact-information-section'

export type AccountsInformationFormProps = {}

export type AccountsInformationFormValues = {
  email: string
  hasReapitAccountsRef: string
  reapitAccountsRef: string
  phoneNumber: string
  hasDirectDebit: string
  contact: string
}

export const initialValues: AccountsInformationFormValues = {
  email: '',
  contact: '',
  hasDirectDebit: 'yes',
  reapitAccountsRef: '',
  hasReapitAccountsRef: 'yes',
  phoneNumber: '',
}

export const onSubmit = (values: AccountsInformationFormValues) => {
  console.log(values)
}

const AccountsInformationForm: React.FC<AccountsInformationFormProps> = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ setFieldValue, values }) => {
        return (
          <Form>
            <FormSection>
              <Grid>
                <GridItem>
                  <ContactInformationSection />
                </GridItem>
                <GridItem>
                  <ReapitReferenceSection setFieldValue={setFieldValue} values={values} />
                  <DirectDebitSection setFieldValue={setFieldValue} values={values} />
                </GridItem>
              </Grid>
            </FormSection>
            <FormSection>
              <LevelRight>
                <Button dataTest="save-btn" type="submit">
                  Save
                </Button>
              </LevelRight>
            </FormSection>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AccountsInformationForm
