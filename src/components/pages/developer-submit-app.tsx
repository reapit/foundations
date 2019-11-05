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
  FlexContainerBasic,
  FormSection,
  FormHeading,
  FormSubHeading,
  GridFiveCol,
  GridFourColItem,
  LevelRight,
  FlexContainerResponsive
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
  scopes.map((item: ScopeModel) => {
    // TODO - short term hack to remove temporary scopes from API response
    if (
      item.name !== 'Marketplace/developers.read' &&
      item.name !== 'Marketplace/developers.write' &&
      item.name !== 'TestResourceServer/test.scope'
    ) {
      return (
        <GridFourColItem key={item.name}>
          <Checkbox name={`scopes.${item.name}`} labelText={item.description || ''} id={item.name || ''} />
        </GridFourColItem>
      )
    }

    return null
  })

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
        <FlexContainerBasic hasPadding flexColumn>
          <FlexContainerResponsive flexColumn hasBackground hasPadding>
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
          </FlexContainerResponsive>
        </FlexContainerBasic>
      ) : (
        <FlexContainerBasic
          hasPadding
          flexColumn
          className={`${isSubmitting ? 'disabled' : ''}`}
          data-test="app-input-form"
        >
          <FlexContainerResponsive flexColumn hasBackground hasPadding>
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
                        <FormSection>
                          <FormHeading>App Listing</FormHeading>
                          <FormSubHeading>
                            These fields refer to the name and icon of your application as they will appear to a user in
                            the Marketplace and in their installed apps.
                          </FormSubHeading>
                          <Grid>
                            <GridItem>
                              <Input dataTest="submit-app-name" type="text" labelText="Name" id="name" name="name" />
                            </GridItem>
                            <GridItem>
                              <div className="control">
                                <label className="label">Icon</label>
                                <ImageInput
                                  id="iconImage"
                                  dataTest="submit-app-icon"
                                  labelText="Upload Image"
                                  name="iconImageData"
                                  allowClear
                                />
                              </div>
                            </GridItem>
                          </Grid>
                        </FormSection>
                        <FormSection>
                          <FormHeading>App Details</FormHeading>
                          <FormSubHeading>
                            Information that will be the user facing listing for your app. "Summary" will be the short
                            app strapline whereas "description", will be more detailed. These fields have a min/max
                            charset of 50/150 and 150/1000 respectively.
                          </FormSubHeading>
                          <TextArea id="summary" dataTest="submit-app-summary" labelText="Summary" name="summary" />
                          <TextArea
                            id="description"
                            dataTest="submit-app-description"
                            labelText="Description"
                            name="description"
                          />
                        </FormSection>
                      </GridItem>
                      <GridItem>
                        <FormSection>
                          <FormHeading>Contact Details</FormHeading>
                          <FormSubHeading>
                            Should one of our developers need to get in touch about your app listing.
                          </FormSubHeading>
                          <Grid>
                            <GridItem>
                              <Input
                                dataTest="submit-app-support-email"
                                type="email"
                                labelText="Support email"
                                id="supportEmail"
                                name="supportEmail"
                              />
                            </GridItem>
                            <GridItem>
                              <Input
                                dataTest="submit-app-phone"
                                type="tel"
                                labelText="Telephone"
                                id="phone"
                                name="telephone"
                              />
                            </GridItem>
                          </Grid>
                        </FormSection>
                        <FormSection>
                          <FormHeading>Websites</FormHeading>
                          <FormSubHeading>
                            Homepage refers to your company's corporate site. The launch URI is default homepage for
                            your listed application.
                          </FormSubHeading>
                          <Grid>
                            <GridItem>
                              <Input
                                dataTest="submit-app-home-page"
                                type="text"
                                labelText="Home page"
                                id="homePage"
                                name="homePage"
                              />
                            </GridItem>
                            <GridItem>
                              <Input
                                dataTest="submit-app-launch-uri"
                                type="text"
                                labelText="Launch Url"
                                id="launch Url"
                                name="launchUri"
                              />
                            </GridItem>
                          </Grid>
                        </FormSection>
                        <FormSection>
                          <FormHeading>Screenshots</FormHeading>
                          <FormSubHeading>
                            You can select a minimum of one and up to four screenshots of your application, that will
                            appear in a carousel in the details view of your app listing.
                          </FormSubHeading>
                          <Grid>
                            <GridItem>
                              <div className="control mb-4">
                                <label className="label">Screenshot 1</label>
                                <ImageInput
                                  id="screenshot1"
                                  dataTest="submit-app-screenshot1"
                                  labelText="Upload Image"
                                  name="screen1ImageData"
                                  allowClear
                                />
                              </div>
                              <div className="control mb-4">
                                <label className="label">Screenshot 2</label>
                                <ImageInput
                                  id="screenshot2"
                                  dataTest="submit-app-screenshot2"
                                  labelText="Upload Image"
                                  name="screen2ImageData"
                                  allowClear
                                />
                              </div>
                            </GridItem>
                            <GridItem>
                              <div className="control mb-4">
                                <label className="label">Screenshot 3</label>
                                <ImageInput
                                  id="screenshot3"
                                  dataTest="submit-app-screenshot3"
                                  labelText="Upload Image"
                                  name="screen3ImageData"
                                  allowClear
                                />
                              </div>
                              <div className="control mb-4">
                                <label className="label">Screenshot 4</label>
                                <ImageInput
                                  id="screenshot4"
                                  dataTest="submit-app-screenshot4"
                                  labelText="Upload Image"
                                  name="screen4ImageData"
                                  allowClear
                                />
                              </div>
                            </GridItem>
                          </Grid>
                        </FormSection>
                      </GridItem>
                    </Grid>
                    <FormSection>
                      <FormHeading>Permissions</FormHeading>
                      <FormSubHeading>
                        To access a client's data, you will need to specify the entities you need access to on a read or
                        write basis. You should be familar with these entities from the sandbox. When the user installs
                        your application, they will have to consent to your usage based on these permissions. If you do
                        not have the correct permissions on an entity basis, your app will receive a 403 error.
                      </FormSubHeading>
                      <GridFiveCol>{renderScopesCheckbox(scopes)}</GridFiveCol>
                    </FormSection>
                    <FormSection>
                      <LevelRight>
                        <Button
                          type="submit"
                          dataTest="submit-app-button"
                          variant="primary"
                          loading={Boolean(isSubmitting)}
                          disabled={Boolean(isSubmitting)}
                        >
                          Submit App
                        </Button>
                      </LevelRight>
                    </FormSection>
                    <Input
                      dataTest="submit-app-developer-id"
                      type="hidden"
                      labelText="Developer ID"
                      id="developerId"
                      name="developerId"
                    />
                  </Form>
                )
              }}
            />
          </FlexContainerResponsive>
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
