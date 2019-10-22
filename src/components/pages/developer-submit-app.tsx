import * as React from 'react'
import { Formik, Form } from 'formik'
import { ReduxState, FormState } from '@/types/core'
import {
  Input,
  ImageInput,
  TextArea,
  Button,
  Checkbox,
  Loader,
  H3,
  Grid,
  GridItem,
  FlexContainerBasic
} from '@reapit/elements'
import { validate } from '@/utils/form/submit-app'
import { transformObjectToDotNotation, ScopeObject } from '@/utils/common'
import { connect } from 'react-redux'
import { submitApp, submitAppSetFormState, SubmitAppFormikActions } from '@/actions/submit-app'
import { SubmitAppState } from '@/reducers/submit-app'
import { CreateAppModel, ScopeModel } from '@/types/marketplace-api-schema'
import { Link } from 'react-router-dom'
import Routes from '@/constants/routes'
import CallToAction from '../ui/call-to-action'

export interface SubmitAppMappedActions {
  submitApp: (appModel: CreateAppModel, actions: SubmitAppFormikActions) => void
  submitAppSetFormState: (formState: FormState) => void
}

export interface SubmitAppMappedProps {
  submitAppState: SubmitAppState
  developerId: string | null
}

export type SubmitAppProps = SubmitAppMappedActions & SubmitAppMappedProps

export const renderScopesCheckbox = (scopes: ScopeModel[] = []) =>
  scopes.map((item: ScopeModel) => (
    <Checkbox key={item.name} name={`scopes.${item.name}`} labelText={item.description || ''} id={item.name || ''} />
  ))

export const SubmitApp: React.FunctionComponent<SubmitAppProps> = ({
  submitAppSetFormState,
  submitApp,
  submitAppState,
  developerId
}) => {
  const { formState, loading, submitAppData } = submitAppState
  const scopes = (submitAppData && submitAppData.scopes) || []
  const isSubmitting = formState === 'SUBMITTING'
  const isSuccessed = formState === 'SUCCESS'

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {isSuccessed ? (
        <FlexContainerBasic hasPadding hasBackground flexColumn>
          <CallToAction
            dataTest="submit-success-section"
            onButtonClick={() => submitAppSetFormState('PENDING')}
            title="Submit Success"
            buttonText="Submit Another App"
            buttonDataTest="submit-another-button"
            isCard
          >
            You have successfully submitted your App. You will be notified via email once your app has been approved.
            Please see <Link to={Routes.DEVELOPER_MY_APPS}>Manage Apps</Link> to edit and set status to be "listed" on
            the marketplace.
          </CallToAction>
        </FlexContainerBasic>
      ) : (
        <FlexContainerBasic
          hasPadding
          hasBackground
          flexColumn
          className={`${isSubmitting ? 'disabled' : ''}`}
          data-test="app-input-form"
        >
          <H3>Submit App</H3>
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
                summary: '',
                developerId
              } as CreateAppModel
            }
            onSubmit={submitApp}
            render={() => {
              return (
                <Form noValidate={true}>
                  <Grid data-test="submit-app-form">
                    <GridItem>
                      <Input dataTest="submit-app-name" type="text" labelText="Name" id="name" name="name" />
                      <TextArea
                        id="description"
                        dataTest="submit-app-description"
                        labelText="Description"
                        name="description"
                      />
                      <TextArea id="summary" dataTest="submit-app-summary" labelText="Summary" name="summary" />
                      <Input
                        dataTest="submit-app-support-email"
                        type="email"
                        labelText="Support email"
                        id="supportEmail"
                        name="supportEmail"
                      />
                      <Input dataTest="submit-app-phone" type="tel" labelText="Telephone" id="phone" name="telephone" />
                      <Input
                        dataTest="submit-app-developer-id"
                        type="hidden"
                        labelText="Developer ID"
                        id="developerId"
                        name="developerId"
                      />
                    </GridItem>
                    <GridItem>
                      <Input
                        dataTest="submit-app-home-page"
                        type="text"
                        labelText="Home page"
                        id="homePage"
                        name="homePage"
                      />
                      <Input
                        dataTest="submit-app-launch-uri"
                        type="text"
                        labelText="Launch Url"
                        id="launch Url"
                        name="launchUri"
                      />
                      {renderScopesCheckbox(scopes)}
                      <ImageInput
                        id="iconImage"
                        dataTest="submit-app-icon"
                        labelText="Icon"
                        name="iconImageData"
                        allowClear
                      />
                      <ImageInput
                        id="screenshot1"
                        dataTest="submit-app-screenshot1"
                        labelText="Screenshot 1"
                        name="screen1ImageData"
                        allowClear
                      />
                      <ImageInput
                        id="screenshot2"
                        dataTest="submit-app-screenshot2"
                        labelText="Screenshot 2"
                        name="screen2ImageData"
                        allowClear
                      />
                      <ImageInput
                        id="screenshot3"
                        dataTest="submit-app-screenshot3"
                        labelText="Screenshot 3"
                        name="screen3ImageData"
                        allowClear
                      />
                      <ImageInput
                        id="screenshot4"
                        dataTest="submit-app-screenshot4"
                        labelText="Screenshot 4"
                        name="screen4ImageData"
                        allowClear
                      />
                    </GridItem>
                  </Grid>

                  <Button
                    type="submit"
                    dataTest="submit-app-button"
                    variant="primary"
                    loading={Boolean(isSubmitting)}
                    disabled={Boolean(isSubmitting)}
                  >
                    Submit
                  </Button>
                </Form>
              )
            }}
          />
        </FlexContainerBasic>
      )}
    </>
  )
}

const mapStateToProps = (state: ReduxState): SubmitAppMappedProps => ({
  submitAppState: state.submitApp,
  developerId: state.auth.loginSession ? state.auth.loginSession.loginIdentity.developerId : null
})

const mapDispatchToProps = (dispatch: any): SubmitAppMappedActions => ({
  submitApp: (appModel: CreateAppModel, actions: SubmitAppFormikActions) => {
    const scopes = transformObjectToDotNotation(appModel.scopes as ScopeObject)
    dispatch(submitApp({ ...appModel, actions, scopes }))
  },
  submitAppSetFormState: formState => dispatch(submitAppSetFormState(formState))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitApp)
