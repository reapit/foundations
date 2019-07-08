import * as React from 'react'
import { Formik, Form } from 'formik'
import Input from '../form/input'
import TextArea from '../form/textarea'
import styles from '@/styles/pages/submit-app-form.scss?mod'
import { validate } from '@/utils/form/submit-app'
import Button from '../form/button'

export interface SubmitAppFormValues {
  appName: string
  description?: string
  companyName: string
  companyReg?: string
  contactPhone?: string
  lineOne?: string
  lineTwo?: string
  town?: string
  country?: string
  postcode?: string
}

export type SubmitAppProps = {}

export const SubmitApp: React.FunctionComponent<SubmitAppProps> = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [succeeded, setSucceeded] = React.useState(false)

  return (
    <div className={styles.container}>
      {succeeded ? (
        <div data-test="submit-success-section">
          <strong data-test="submit-success-message">Submit success</strong>
          <Button type="submit" variant="primary" dataTest="submit-another-button" onClick={() => setSucceeded(false)}>
            Submit another
          </Button>
        </div>
      ) : (
        <div className={`${styles.wrapper} ${isSubmitting ? 'disabled' : ''}`}>
          <Formik
            validate={validate}
            initialValues={
              {
                appName: '',
                description: '',
                companyName: '',
                companyReg: '',
                contactPhone: '',
                lineOne: '',
                lineTwo: '',
                town: '',
                country: '',
                postcode: ''
              } as SubmitAppFormValues
            }
            onSubmit={values => {
              console.log(values)
              setIsSubmitting(true)
              setTimeout(() => {
                setIsSubmitting(false)
                setSucceeded(true)
              }, 1000)
            }}
            render={() => (
              <Form data-test="submit-app-form">
                <Input dataTest="submit-app-name" type="text" label="App name" id="name" name="appName" />
                <TextArea dataTest="submit-app-description" label="Description" id="description" name="description" />
                <Input
                  dataTest="submit-app-company-name"
                  type="text"
                  label="Company name"
                  id="companyName"
                  name="companyName"
                />
                <Input
                  dataTest="submit-app-company-reg-number"
                  type="text"
                  label="Company reg number"
                  id="companyReg"
                  name="companyReg"
                />
                <Input
                  dataTest="submit-app-phone"
                  type="tel"
                  label="Contact telephone"
                  id="phone"
                  name="contactPhone"
                />
                <Input dataTest="submit-app-address1" type="text" label="Address 1" id="address1" name="lineOne" />
                <Input dataTest="submit-app-address2" type="text" label="Address 2" id="address2" name="lineTwo" />
                <Input dataTest="submit-app-city" type="text" label="City" id="city" name="town" />
                <Input dataTest="submit-app-country" type="text" label="Country" id="country" name="country" />
                <Input dataTest="submit-app-postcode" type="text" label="Postcode" id="postcode" name="postcode" />
                <Button type="submit" loading={isSubmitting} variant="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            )}
          />
        </div>
      )}
    </div>
  )
}

export default SubmitApp
