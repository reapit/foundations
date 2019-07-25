import * as React from 'react'
import { Formik, Form } from 'formik'
import { ReduxState, FormState } from '@/types/core'
import Input from '../form/input'
import ImageInput from '../form/image-input'
import TextArea from '../form/textarea'
import styles from '@/styles/pages/submit-app-form.scss?mod'
import { validate } from '@/utils/form/submit-app'
import Button from '../form/button'
import bulma from '@/styles/vendor/bulma'
import { connect } from 'react-redux'
import { submitApp, submitAppSetFormState, SubmitAppFormikActions } from '@/actions/submit-app'
import { SubmitAppState } from '@/reducers/submit-app'
import { CreateAppModel } from '@/types/marketplace-api-schema'

export interface SubmitAppMappedActions {
  submitApp: (appModel: CreateAppModel, actions: SubmitAppFormikActions) => void
  submitAppSetFormState: (formState: FormState) => void
}

export interface SubmitAppMappedProps {
  submitAppState: SubmitAppState
}

export type SubmitAppProps = SubmitAppMappedActions & SubmitAppMappedProps

export const SubmitApp: React.FunctionComponent<SubmitAppProps> = ({
  submitAppSetFormState,
  submitApp,
  submitAppState
}) => {
  const { formState } = submitAppState
  const isLoading = formState === 'SUBMITTING'
  const isSuccessed = formState === 'SUCCESS'

  return (
    <div className={styles.container}>
      {isSuccessed ? (
        <div data-test="submit-success-section">
          <strong data-test="submit-app-success-message">Submit success</strong>
          <Button
            type="submit"
            variant="primary"
            dataTest="submit-another-button"
            onClick={() => submitAppSetFormState('SUBMITTING')}
          >
            Submit another
          </Button>
        </div>
      ) : (
        <div className={`${styles.wrapper} ${bulma.container} ${isLoading ? 'disabled' : ''}`}>
          <Formik
            validate={validate}
            initialValues={
              {
                screen4ImageData: '',
                screen3ImageData: '',
                screen2ImageData: '',
                screen1ImageData: '',
                name: '',
                telephone: '',
                supportEmail: '',
                launchUri: '',
                iconImageData: '',
                homePage: '',
                description: '',
                summary: ''
              } as CreateAppModel
            }
            onSubmit={submitApp}
            render={({ errors }) => {
              return (
                <Form>
                  <div data-test="submit-app-form" className={`${bulma.columns}`}>
                    <div className={`${bulma.column} ${styles.column}`}>
                      <Input dataTest="submit-app-name" type="text" label="Name" id="name" name="name" />
                      <TextArea
                        id="description"
                        dataTest="submit-app-description"
                        label="Description"
                        name="description"
                      />
                      <TextArea id="summary" dataTest="submit-app-summary" label="Summary" name="summary" />
                      <Input
                        dataTest="submit-app-support-email"
                        type="text"
                        label="Support email"
                        id="supportEmail"
                        name="supportEmail"
                      />
                      <Input dataTest="submit-app-phone" type="tel" label="Telephone" id="phone" name="telephone" />
                      {/* <Input
                        dataTest="submit-app-company-reg-number"
                        type="text"
                        label="Company reg number"
                        id="companyReg"
                        name="companyReg"
                      />
                      <Input
                        dataTest="submit-app-address1"
                        type="text"
                        label="Address 1"
                        id="address1"
                        name="lineOne"
                      />
                      <Input
                        dataTest="submit-app-address2"
                        type="text"
                        label="Address 2"
                        id="address2"
                        name="lineTwo"
                      />
                      <Input dataTest="submit-app-city" type="text" label="City" id="city" name="town" />
                      <Input dataTest="submit-app-country" type="text" label="Country" id="country" name="country" />
                      <Input
                        dataTest="submit-app-postcode"
                        type="text"
                        label="Postcode"
                        id="postcode"
                        name="postcode"
                      /> */}
                    </div>
                    <div className={`${bulma.column} ${styles.column}`}>
                      <Input
                        dataTest="submit-app-home-page"
                        type="text"
                        label="Home page"
                        id="homePage"
                        name="homePage"
                      />
                      <Input
                        dataTest="submit-app-launch-uri"
                        type="text"
                        label="Launch Url"
                        id="launch Url"
                        name="launchUri"
                      />
                      {/* <Input
                        dataTest="submit-app-display-summary"
                        type="text"
                        label="Display summary"
                        id="displaySummary"
                        name="displaySummary"
                      />
                      <Input
                        dataTest="submit-app-business-address"
                        type="text"
                        label="Business address"
                        id="businessAddress"
                        name="businessAddress"
                      />
                      <Input dataTest="submit-app-county" type="text" label="County" id="county" name="County" />
                      <Input
                        dataTest="submit-app-developer-id"
                        type="text"
                        label="Developer ID"
                        id="developerId"
                        name="developerId"
                      />
                      <Input
                        dataTest="submit-app-display-summary"
                        type="text"
                        label="Display summary"
                        id="displaySummary"
                        name="Developer ID"
                      />
                      <Input dataTest="submit-app-policy" type="text" label="Policy" id="pollicy" name="pollicy" />
                      <Input
                        dataTest="submit-app-endpoint"
                        type="text"
                        label="Endpoint"
                        id="endpoint"
                        name="endpoint"
                      />
                      <TextArea
                        dataTest="submit-app-accepted-terms"
                        label="Accepted Terms"
                        id="acceptedTerms"
                        name="acceptedTerms"
                      /> */}
                      <ImageInput id="iconImage" dataTest="submit-app-icon" label="Icon" name="iconImageData" />
                      <ImageInput
                        id="screenshot1"
                        dataTest="submit-app-screenshoot1"
                        label="Screenshot 1"
                        name="screen1ImageData"
                      />
                      <ImageInput
                        id="screenshot2"
                        dataTest="submit-app-screenshoot2"
                        label="Screenshot 2"
                        name="screen2ImageData"
                      />
                      <ImageInput
                        id="screenshot3"
                        dataTest="submit-app-screenshoot3"
                        label="Screenshot 3"
                        name="screen3ImageData"
                      />
                      <ImageInput
                        id="screenshot4"
                        dataTest="submit-app-screenshoot4"
                        label="Screenshot 4"
                        name="screen4ImageData"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    dataTest="submit-app-button"
                    variant="primary"
                    loading={Boolean(isLoading)}
                    disabled={Boolean(isLoading)}
                  >
                    Submit
                  </Button>
                </Form>
              )
            }}
          />
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state: ReduxState): SubmitAppMappedProps => ({
  submitAppState: state.submitApp
})

const mapDispatchToProps = (dispatch: any): SubmitAppMappedActions => ({
  submitApp: (appModel: CreateAppModel, actions: SubmitAppFormikActions) =>
    dispatch(submitApp({ ...appModel, actions })),
  submitAppSetFormState: formState => dispatch(submitAppSetFormState(formState))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitApp)
