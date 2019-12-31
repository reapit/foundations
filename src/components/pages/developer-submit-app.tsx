import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState, FormState } from '@/types/core'
import {
  Input,
  ImageInput,
  TextArea,
  Button,
  Checkbox,
  Loader,
  Alert,
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
  SelectBox,
  SelectBoxOptions,
  Formik,
  Form,
  FormikHelpers,
  H6,
  FormikValues,
  RadioSelect
} from '@reapit/elements'

import { validate } from '@/utils/form/submit-app'
import { connect } from 'react-redux'
import { submitApp, submitAppSetFormState, SubmitAppFormikActions } from '@/actions/submit-app'
import { SubmitAppState } from '@/reducers/submit-app'
import { AppDetailState } from '@/reducers/app-detail'
import { SubmitRevisionState } from '@/reducers/submit-revision'
import { CreateAppModel, ScopeModel, AppDetailModel, CategoryModel } from '@reapit/foundations-ts-definitions'
import Routes from '@/constants/routes'
import { submitRevisionSetFormState, submitRevision } from '@/actions/submit-revision'
import DeveloperSubmitAppSuccessfully from './developer-submit-app-successfully'
import { selectCategories } from '../../selector/app-categories'
import styles from '@/styles/pages/developer-submit-app.scss?mod'
import { TermsAndConditionsModal } from '../ui/terms-and-conditions-modal'

export interface SubmitAppMappedActions {
  submitApp: (
    appModel: CreateAppModel,
    actions: SubmitAppFormikActions,
    setSubmitError: (error: string) => void
  ) => void
  submitAppSetFormState: (formState: FormState) => void
  submitRevision: (id: string, revision: CreateAppModel) => void
  submitRevisionSetFormState: (formState: FormState) => void
}

export interface SubmitAppMappedProps {
  submitAppState: SubmitAppState
  appDetailState: AppDetailState
  submitRevisionState: SubmitRevisionState
  developerId: string | null
  categories: CategoryModel[]
}

export type SubmitAppProps = SubmitAppMappedActions & SubmitAppMappedProps & RouteComponentProps<{ appid?: string }>

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
          <Checkbox name="scopes" labelText={item.description || ''} id={item.name || ''} value={item.name} />
        </GridFourColItem>
      )
    }
  })

export const generateInitialValues = (appDetail: AppDetailModel | null, developerId: string | null) => {
  let initialValues

  if (appDetail) {
    const {
      category,
      description,
      developerId,
      homePage,
      telephone,
      supportEmail,
      summary,
      launchUri,
      media,
      name,
      isListed,
      isDirectApi,
      scopes: appScopes
    } = appDetail

    const icon = (media || []).filter(({ order }) => order === 0)[0]
    const iconImageUrl = icon ? icon.uri : ''
    const images = (media || [])
      .filter(({ type }) => type !== 'icon')
      .reduce((a, c, i) => ({ ...a, [`screen${i + 1}ImageUrl`]: c.uri }), {})
    // ^reason of using index instead of `order` property is because all images in media have order of 0 (see ticket [CLD-623] to learn more)

    initialValues = {
      name,
      categoryId: category?.id || '',
      description,
      developerId,
      homePage,
      telephone,
      supportEmail,
      summary,
      launchUri,
      iconImageUrl,
      isListed,
      isDirectApi,
      scopes: appScopes?.map(item => item.name),
      ...images
    }
  } else {
    initialValues = {
      categoryId: '',
      authFlow: '',
      screen4ImageUrl: '',
      screen3ImageUrl: '',
      screen2ImageUrl: '',
      screen1ImageUrl: '',
      name: '',
      telephone: '',
      supportEmail: '',
      launchUri: '',
      iconImageUrl: '',
      homePage: '',
      description: '',
      summary: '',
      developerId,
      scopes: []
    }
  }

  return initialValues
}

export const handleSubmitApp = ({
  appId,
  submitApp,
  submitRevision,
  setSubmitError,
  isAgreedTerms,
  setShouldShowError
}) => (appModel: CreateAppModel, actions: FormikHelpers<CreateAppModel>) => {
  if (!isAgreedTerms) {
    setShouldShowError(true)
    return
  }
  if (!appId) {
    submitApp(appModel, actions, setSubmitError)
  } else {
    submitRevision(appId, appModel)
  }
}

export const handleClickOpenModal = setTermModalIsOpen => event => {
  event.preventDefault()
  setTermModalIsOpen(true)
}
export const handleCloseModal = setTermModalIsOpen => () => {
  setTermModalIsOpen(false)
}

export const handleAcceptTerms = (setIsAgreedTerms, setTermModalIsOpen) => () => {
  setIsAgreedTerms(true)
  setTermModalIsOpen(false)
}
export const handleDeclineTerms = (setIsAgreedTerms, setTermModalIsOpen) => () => {
  setIsAgreedTerms(false)
  setTermModalIsOpen(false)
}

export const SubmitApp: React.FC<SubmitAppProps> = ({
  submitAppSetFormState,
  submitApp,
  submitAppState,
  submitRevisionSetFormState,
  submitRevision,
  submitRevisionState,
  appDetailState,
  developerId,
  match,
  history,
  categories
}) => {
  let initialValues
  let formState
  let appId
  /* terms state */
  const [termModalIsOpen, setTermModalIsOpen] = React.useState<boolean>(false)
  const [isAgreedTerms, setIsAgreedTerms] = React.useState<boolean>(false)
  const [shouldShowError, setShouldShowError] = React.useState<boolean>(false)
  /* toggle checked input */
  const handleOnChangeAgree = setIsAgreedTerms.bind(null, prev => !prev)

  const [submitError, setSubmitError] = React.useState<string>()

  const isSubmitRevision = Boolean(match.params && match.params.appid)
  const isSubmitApp = !isSubmitRevision

  if (isSubmitApp) {
    const { loading } = submitAppState
    formState = submitAppState.formState

    if (loading) {
      return <Loader />
    }

    initialValues = generateInitialValues(null, developerId)
  }

  if (isSubmitRevision) {
    const { loading, error, appDetailData } = appDetailState
    formState = submitRevisionState.formState

    if (loading) {
      return <Loader />
    }

    if (error) {
      return <Alert type="danger" message="Failed to fetch. Please try later." />
    }

    if (!appDetailData) {
      return null
    }

    appId = appDetailData.data.id
    initialValues = generateInitialValues(appDetailData.data, developerId)
  }

  const scopes = (submitAppState.submitAppData && submitAppState.submitAppData.scopes) || []

  const isSubmitting = formState === 'SUBMITTING'
  const isSuccessed = formState === 'SUCCESS'

  const submitAppSuccessfully = !isSubmitRevision && isSuccessed
  const submitRevisionSuccessfully = isSubmitRevision && isSuccessed

  if (submitAppSuccessfully) {
    return <DeveloperSubmitAppSuccessfully onClickHandler={() => submitAppSetFormState('PENDING')} />
  }

  if (submitRevisionSuccessfully) {
    submitRevisionSetFormState('PENDING')
    history.push(Routes.DEVELOPER_MY_APPS)
  }

  const categoryOptions: SelectBoxOptions[] = categories.map(category => ({
    value: category.id as string,
    label: category.name as string
  }))

  return (
    <FlexContainerBasic
      hasPadding
      flexColumn
      className={`${isSubmitting ? 'disabled' : ''}`}
      data-test="app-input-form"
    >
      <FlexContainerBasic flexColumn hasBackground hasPadding>
        {isSubmitApp ? <H3>Submit App</H3> : <H3>Edit App</H3>}
        <Formik
          validate={validate}
          initialValues={initialValues}
          onSubmit={handleSubmitApp({
            appId,
            submitApp,
            submitRevision,
            setSubmitError,
            isAgreedTerms,
            setShouldShowError
          })}
        >
          {({ setFieldValue, values }) => {
            return (
              <Form noValidate={true}>
                <Grid data-test="submit-app-form">
                  <GridItem>
                    <FormSection>
                      <FormHeading>App Listing</FormHeading>
                      <FormSubHeading>
                        These fields refer to the name and icon of your application as they will appear to a user in the
                        Marketplace and in their installed apps. If your App is an external application, please select
                        'Direct API'.
                      </FormSubHeading>
                      <Grid isMultiLine>
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
                              name="iconImageUrl"
                              allowClear
                            />
                          </div>
                        </GridItem>
                      </Grid>
                      <Grid>
                        {isSubmitRevision && (
                          <GridItem>
                            <Checkbox name="isListed" labelText="Is Listed" id="isListed" />
                          </GridItem>
                        )}
                        <GridItem>
                          <Checkbox name="isDirectApi" labelText="Direct API" id="isDirectApi" />
                        </GridItem>
                      </Grid>
                    </FormSection>
                    <FormSection>
                      <FormHeading>AUTHENTICATION FLOW</FormHeading>
                      <FormSubHeading>
                        Please select an authentication flow for your application. If you select "User Session" your
                        users will have to login and you will need to attach a Bearer token to your API Authorization
                        headers. This will typically be the flow for client side web apps. If you select "Client Secret"
                        we will provide you with a secret token to include in your API requests - this secret will be
                        unique per app and would typically be the flow for machine-to-machine server side apps.
                      </FormSubHeading>
                      <RadioSelect
                        setFieldValue={setFieldValue}
                        state={values['authFlow']}
                        disabled={!isSubmitApp}
                        options={[
                          { label: 'USER SESSION', value: 'authorisationCode' },
                          { label: 'CLIENT SECRET', value: 'clientCredentials' }
                        ]}
                        name="authFlow"
                        id="authFlow"
                      />
                    </FormSection>
                    <FormSection>
                      <FormHeading>APP CATEGORY</FormHeading>
                      <FormSubHeading>
                        To ensure your App is searchable on the Marketplace, please choose the most relevant category
                        from the list below.
                      </FormSubHeading>
                      <Grid>
                        <GridItem>
                          <SelectBox id="categoryId" name="categoryId" options={categoryOptions} labelText="CATEGORY" />
                        </GridItem>
                      </Grid>
                    </FormSection>
                    <FormSection>
                      <FormHeading>App Details</FormHeading>
                      <FormSubHeading>
                        Information that will be the user facing listing for your app. "Summary" will be the short app
                        strapline whereas "description", will be more detailed. These fields have a min/max charset of
                        50/150 and 150/1000 respectively.
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
                        Homepage refers to your company's corporate site. The launch URI is default homepage for your
                        listed application.
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
                        You can select a minimum of one and up to four screenshots of your application, that will appear
                        in a carousel in the details view of your app listing.
                      </FormSubHeading>
                      <Grid isMultiLine>
                        <GridItem>
                          <div className="control mb-4">
                            <label className="label">Screenshot 1</label>
                            <ImageInput
                              id="screenshot1"
                              dataTest="submit-app-screenshot1"
                              labelText="Upload Image"
                              name="screen1ImageUrl"
                              allowClear
                            />
                          </div>
                          <div className="control mb-4">
                            <label className="label">Screenshot 2</label>
                            <ImageInput
                              id="screenshot2"
                              dataTest="submit-app-screenshot2"
                              labelText="Upload Image"
                              name="screen2ImageUrl"
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
                              name="screen3ImageUrl"
                              allowClear
                            />
                          </div>
                          <div className="control mb-4">
                            <label className="label">Screenshot 4</label>
                            <ImageInput
                              id="screenshot4"
                              dataTest="submit-app-screenshot4"
                              labelText="Upload Image"
                              name="screen4ImageUrl"
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
                    write basis. You should be familar with these entities from the sandbox. When the user installs your
                    application, they will have to consent to your usage based on these permissions. If you do not have
                    the correct permissions on an entity basis, your app will receive a 403 error.
                  </FormSubHeading>
                  <GridFiveCol>{renderScopesCheckbox(scopes)}</GridFiveCol>
                </FormSection>
                <FormSection>
                  <LevelRight>
                    {submitError && <H6 className="has-text-danger mr-5">{submitError}</H6>}
                    <Grid>
                      <GridItem>
                        <FlexContainerBasic
                          className={`${styles['terms-submit-app']}`}
                          centerContent={false}
                          hasPadding={false}
                        >
                          <div className="field field-checkbox">
                            <input
                              type="checkbox"
                              checked={isAgreedTerms}
                              onChange={handleOnChangeAgree}
                              className="checkbox"
                              id="terms-submit-app"
                              name="terms-submit-app"
                            />
                            <label htmlFor="terms-submit-app" className={`pb-4 mb-4 ${styles['label-terms']}`}>
                              I AGREE TO THE{' '}
                              <span className={styles['terms-link']} onClick={handleClickOpenModal(setTermModalIsOpen)}>
                                'TERMS AND CONDITIONS'
                              </span>
                            </label>
                          </div>
                        </FlexContainerBasic>
                        <TermsAndConditionsModal
                          visible={termModalIsOpen}
                          onAccept={handleAcceptTerms(setIsAgreedTerms, setTermModalIsOpen)}
                          onDecline={handleDeclineTerms(setIsAgreedTerms, setTermModalIsOpen)}
                          afterClose={handleCloseModal(setTermModalIsOpen)}
                        />
                      </GridItem>

                      <GridItem>
                        <Button
                          type="submit"
                          dataTest="submit-app-button"
                          variant="primary"
                          loading={Boolean(isSubmitting)}
                          disabled={Boolean(isSubmitting)}
                        >
                          Submit App
                        </Button>
                      </GridItem>
                    </Grid>
                  </LevelRight>
                </FormSection>

                {shouldShowError && (
                  <Alert
                    message="Please indicate that you have read and agree to the terms and conditions"
                    type="danger"
                  />
                )}
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
        </Formik>
      </FlexContainerBasic>
    </FlexContainerBasic>
  )
}

const mapStateToProps = (state: ReduxState): SubmitAppMappedProps => ({
  submitAppState: state.submitApp,
  appDetailState: state.appDetail,
  submitRevisionState: state.submitRevision,
  developerId: state.auth.loginSession ? state.auth.loginSession.loginIdentity.developerId : null,
  categories: selectCategories(state)
})

const mapDispatchToProps = (dispatch: any): SubmitAppMappedActions => ({
  submitApp: (appModel: CreateAppModel, actions: SubmitAppFormikActions, setSubmitError: (error: string) => void) => {
    dispatch(submitApp({ ...appModel, actions, setSubmitError }))
  },
  submitRevision: (id, revision) => {
    dispatch(submitRevision({ ...revision, id }))
  },
  submitRevisionSetFormState: formState => dispatch(submitRevisionSetFormState(formState)),
  submitAppSetFormState: formState => dispatch(submitAppSetFormState(formState))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitApp))
