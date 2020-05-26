import * as React from 'react'
import { RouteComponentProps, useHistory, useParams } from 'react-router'
import { FormState } from '@/types/core'
import {
  Input,
  ImageInput,
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
  GridFourCol,
  GridFourColItem,
  LevelRight,
  Formik,
  Form,
  FormikHelpers,
  H6,
  RadioSelect,
  FlexContainerResponsive,
} from '@reapit/elements'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'

import { validate } from '@/utils/form/submit-app'
import { useDispatch, useSelector } from 'react-redux'
import { submitApp, submitAppSetFormState, SubmitAppFormikActions, CustomCreateAppModel } from '@/actions/submit-app'
import { SubmitAppState } from '@/reducers/submit-app'
import { AppDetailState } from '@/reducers/app-detail'
import { SubmitRevisionState } from '@/reducers/submit-revision'
import { CreateAppModel, ScopeModel, AppDetailModel, CategoryModel } from '@reapit/foundations-ts-definitions'
import Routes from '@/constants/routes'
import { submitRevisionSetFormState, submitRevision } from '@/actions/submit-revision'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import DeveloperSubmitAppSuccessfully from '@/components/pages/developer-submit-app-successfully'
import styles from '@/styles/pages/developer-submit-app.scss?mod'
import { getCookieString, setCookieString, COOKIE_FIRST_SUBMIT, COOKIE_MAX_AGE_INFINITY } from '@/utils/cookie'
import { SubmitAppReadDocModal } from '@/components/ui/submit-app-read-doc-modal'
import dayjs from 'dayjs'
import DOCS_LINKS from '@/constants/docs-links'
import DAY_FORMATS from '@/constants/date-formats'
import { selectSubmitAppState, selectSubmitAppRevisionState } from '@/selector/submit-app'
import { selectDeveloperId } from '@/selector/auth'
import { selectAppDetailState } from '@/selector/app-detail'
import { Dispatch } from 'redux'
import GeneralInformationSection from './general-information-section'
import AgencyCloudIntegrationSection from './agency-cloud-integration-section'
import AuthenticationFlowSection from './authentication-flow-section'

export interface SubmitAppMappedActions {
  submitApp: (
    appModel: CreateAppModel,
    actions: SubmitAppFormikActions,
    setSubmitError: (error: string) => void,
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
  integrationTypes: DesktopIntegrationTypeModel[]
}

export const labelTextOfField = {
  name: 'Name',
  supportEmail: 'Support email',
  telephone: 'Telephone',
  homePage: 'Home page',
  launchUri: 'Launch URI',
  summary: 'Summary',
  description: 'Description',
  redirectUris: 'Redirect URI(s)',
  signoutUris: 'Sign Out URI(s)',
  screen1ImageUrl: 'Screenshot 1',
  iconImageUrl: 'Icon',
  scopes: 'Permissions',
  authFlow: 'Authentication flow',
  limitToClientIds: 'Private Apps',
}

export type SubmitAppProps = {}

export const renderErrors = (errors: Record<string, string | string[]>) => {
  const isErrorsEmpty = typeof errors !== 'object' || Object.keys(errors).length === 0
  if (isErrorsEmpty) {
    return null
  }

  const description = errors[FIELD_ERROR_DESCRIPTION]

  return (
    <div className="has-text-danger">
      <H6 className="has-text-danger mb-1">{description || 'The following validation errors have occurred:'}</H6>
      <div>
        {Object.keys(errors).map(key => {
          const value = errors[key]

          if (key === FIELD_ERROR_DESCRIPTION) {
            return null
          }

          if (typeof value === 'string') {
            return (
              <div data-test={key} key={key}>
                {labelTextOfField[key] || key}: {errors[key]}
              </div>
            )
          }

          return (
            <div data-test={key} key={key}>
              {labelTextOfField[key] || key}: {(errors[key] as string[]).join(', ')}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const renderScopesCheckbox = (scopes: ScopeModel[] = [], errorScope?: string) => (
  <>
    {scopes.map((item: ScopeModel) => {
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
    })}
    {errorScope && (
      <div className={`has-text-danger has-text-right ${styles.errorScope}`} data-test="input-error">
        {errorScope}
      </div>
    )}
  </>
)

export const generateInitialValues = (appDetail: AppDetailModel | null, developerId?: string | null) => {
  let initialValues

  if (appDetail) {
    const {
      category,
      authFlow,
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
      scopes: appScopes,
      redirectUris = [],
      signoutUris = [],
      limitToClientIds = [],
      desktopIntegrationTypeIds = [],
    } = appDetail

    const icon = (media || []).filter(({ order }) => order === 0)[0]
    const iconImageUrl = icon ? icon.uri : ''
    const images = (media || [])
      .filter(({ type }) => type !== 'icon')
      .reduce((a, c, i) => ({ ...a, [`screen${i + 1}ImageUrl`]: c.uri }), {})
    // ^reason of using index instead of `order` property is because all images
    // in media have order of 0 (see ticket [CLD-623] to learn more)

    initialValues = {
      name,
      categoryId: category?.id || '',
      authFlow,
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
      scopes: appScopes ? appScopes.map(item => item.name) : [],
      redirectUris: redirectUris.join(','),
      signoutUris: signoutUris.join(','),
      limitToClientIds: limitToClientIds.join(','),
      isPrivateApp: limitToClientIds.length > 0 ? 'yes' : 'no',
      desktopIntegrationTypeIds: desktopIntegrationTypeIds,
      ...images,
    }
  } else {
    initialValues = {
      categoryId: '',
      authFlow: '',
      screen5ImageUrl: '',
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
      scopes: [],
      redirectUris: '',
      signoutUris: '',
      limitToClientIds: '',
      desktopIntegrationTypeIds: '',
    }
  }

  return initialValues
}

export const handleSubmitApp = (appId: string, dispatch: Dispatch) => (
  appModel: CustomCreateAppModel,
  actions: FormikHelpers<CustomCreateAppModel>,
) => {
  const { redirectUris, signoutUris, limitToClientIds, ...otherData } = appModel
  let appToSubmit: CreateAppModel
  if (appModel.authFlow === 'clientCredentials') {
    appToSubmit = otherData
  } else {
    appToSubmit = {
      ...otherData,
      redirectUris: redirectUris ? redirectUris.split(',') : [],
      signoutUris: signoutUris ? signoutUris.split(',') : [],
    }
  }
  if (appModel.isPrivateApp === 'yes') {
    appToSubmit.limitToClientIds = limitToClientIds ? limitToClientIds.replace(/ /g, '').split(',') : []
  }

  if (!appId) {
    dispatch(submitApp({ ...appToSubmit, actions }))
  } else {
    if (appToSubmit.authFlow) {
      delete appToSubmit.authFlow
    }
    if (appModel.isPrivateApp === 'no') {
      appToSubmit.limitToClientIds = []
    }
    dispatch(submitRevision({ ...appToSubmit, id: appId }))
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

/**
 * Before submit, run this to check first submit,
 * and validate all fields
 */
export const handleBeforeSubmit = (validateFunction, setIsSubmitModalOpen) => (values: CustomCreateAppModel) => {
  const firstSubmitCookie = getCookieString(COOKIE_FIRST_SUBMIT)
  if (!firstSubmitCookie) {
    setIsSubmitModalOpen(true)
    // return FormikErrors-like object to prevent formik from submit data
    return { message: 'firstSubmit' }
  }
  return validateFunction(values)
}

export const handleSubmitModalContinue = setIsSubmitModalOpen => () => {
  setIsSubmitModalOpen(false)
  setCookieString(COOKIE_FIRST_SUBMIT, dayjs().format(DAY_FORMATS.YYYY_MM_DD), COOKIE_MAX_AGE_INFINITY)
}

export const handleSubmitModalViewDocs = () => {
  const newTab = window.open(DOCS_LINKS.DEVELOPER_PORTAL, '_blank')

  if (newTab) {
    newTab.focus()
  }
}

const getGoBackToAppsFunc = ({ history }: Pick<RouteComponentProps, 'history'>) =>
  React.useCallback(() => history.push(Routes.DEVELOPER_MY_APPS), [history])

const onSubmitAnotherApp = (dispatch: Dispatch) => {
  return () => {
    dispatch(submitAppSetFormState('PENDING'))
  }
}

export const DeveloperSubmitApp: React.FC<SubmitAppProps> = () => {
  let initialValues
  let formState
  let appId
  const dispatch = useDispatch()
  const history = useHistory()
  const { appid } = useParams()
  const developerId = useSelector(selectDeveloperId)
  const appDetailState = useSelector(selectAppDetailState)
  const submitAppState = useSelector(selectSubmitAppState)
  const submitRevisionState = useSelector(selectSubmitAppRevisionState)

  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState<boolean>(!getCookieString(COOKIE_FIRST_SUBMIT))

  const goBackToApps = getGoBackToAppsFunc({ history })

  const isSubmitRevision = appid ? true : false
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
    return (
      <DeveloperSubmitAppSuccessfully onGoBackToApps={goBackToApps} onSubmitAnotherApp={onSubmitAnotherApp(dispatch)} />
    )
  }

  if (submitRevisionSuccessfully) {
    dispatch(submitRevisionSetFormState('PENDING'))
    history.push(Routes.DEVELOPER_MY_APPS)
  }

  return (
    <>
      <FlexContainerBasic
        hasPadding
        flexColumn
        className={`${isSubmitting ? 'disabled' : ''} ${styles.container}`}
        data-test="app-input-form"
      >
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          {isSubmitApp ? <H3>Submit App</H3> : <H3>Edit App</H3>}
          <Formik
            validate={handleBeforeSubmit(validate, setIsSubmitModalOpen)}
            initialValues={initialValues}
            onSubmit={handleSubmitApp(appId, dispatch)}
          >
            {({ setFieldValue, values, errors }) => {
              return (
                <Form noValidate={true}>
                  <GeneralInformationSection />
                  <AgencyCloudIntegrationSection />
                  <AuthenticationFlowSection
                    authFlow={values['authFlow']}
                    isSubmitApp={isSubmitApp}
                    setFieldValue={setFieldValue}
                  />
                  {/* <FormSection>
                    <Grid>
                      <GridItem>
                        <FormHeading>Redirect URI(s)</FormHeading>
                        <FormSubHeading>
                          Please enter a Redirect URI(s) to define the route Reapit Connect is permitted to redirect to
                          after a successful authentication. The following formats are supported: https://, http:// (for
                          localhost only) or your own custom URI schemes such as myapp://login. For multiple URI’s,
                          separate using a comma.
                        </FormSubHeading>
                        <Input
                          disabled={values['authFlow'] === 'clientCredentials'}
                          dataTest="submit-app-redirect-uri"
                          type="text"
                          id="redirectUris"
                          name="redirectUris"
                          placeholder="Enter your Redirect URI(s)"
                        />
                      </GridItem>
                    </Grid>
                    <Grid>
                      <GridItem>
                        <FormHeading>Sign Out URI(s)</FormHeading>
                        <FormSubHeading>
                          Please enter a Sign Out URI(s) to define the route Reapit Connect is permitted to redirect to
                          after successfully logging out. The following formats are supported: https://, http:// (for
                          localhost only) or your own custom URI schemes such as myapp://login. For multiple URI’s,
                          separate using a comma.
                        </FormSubHeading>
                        <Input
                          disabled={values['authFlow'] === 'clientCredentials'}
                          dataTest="submit-app-signout-uris"
                          type="text"
                          id="signoutUris"
                          name="signoutUris"
                          placeholder="Enter your Sign Out URI(s)"
                        />
                      </GridItem>
                    </Grid>
                    <Grid>
                      <GridItem>
                        <FormHeading>Private Apps</FormHeading>
                        <FormSubHeading>
                          If your App is a Private App and you would like it to only be visible to certain customers,
                          please select ‘Yes’ below. You should then enter the ‘Customer ID’ of the customer(s) you wish
                          to share your app with. If you select ‘No’, your App will be visible to all on the
                          Marketplace. For multiple customers, please separate the Customer IDs using a comma, e.g. ABC,
                          DEF.
                        </FormSubHeading>
                        <RadioSelect
                          setFieldValue={setFieldValue}
                          state={values['isPrivateApp']}
                          options={[
                            { label: 'YES', value: 'yes' },
                            { label: 'NO', value: 'no' },
                          ]}
                          name="isPrivateApp"
                          id="isPrivateApp"
                        />
                        <Input
                          disabled={values['isPrivateApp'] === 'no'}
                          dataTest="submit-app-limited-to-client-ids"
                          type="text"
                          id="limitToClientIds"
                          name="limitToClientIds"
                          placeholder={
                            'Please enter the Customer ID. For multiple Customer ID’s, please separate using a comma'
                          }
                        />
                      </GridItem>
                    </Grid>
                  </FormSection> */}
                  <FormSection>
                    <FormHeading>Images</FormHeading>
                    <FormSubHeading>
                      The icon field will appear as the main brand representation of your app in marketplace listings
                      and installed apps pages. You can also select a minimum of one and up to five screenshots of your
                      application, that will appear in a carousel in the details view of your app listing.
                    </FormSubHeading>
                    <GridFourCol>
                      <GridFourColItem>
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
                      </GridFourColItem>
                      <GridFourColItem>
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
                      </GridFourColItem>
                      <GridFourColItem>
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
                      </GridFourColItem>
                      <GridFourColItem>
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
                      </GridFourColItem>
                      <GridFourColItem>
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
                      </GridFourColItem>
                      <GridFourColItem>
                        <div className="control mb-4">
                          <label className="label">Screenshot 5</label>
                          <ImageInput
                            id="screenshot5"
                            dataTest="submit-app-screenshot5"
                            labelText="Upload Image"
                            name="screen5ImageUrl"
                            allowClear
                          />
                        </div>
                      </GridFourColItem>
                    </GridFourCol>
                  </FormSection>
                  <FormSection>
                    <FormHeading>Marketplace Status</FormHeading>
                    <FormSubHeading>
                      This section refers to the listing status in the Marketplace. If your App is an external
                      application i.e. it is just an API feed app or is a web application that exists out of the
                      Marketplace ecosystem, please select, &ldquo;Direct API&rdquo;. Your app will still need to be
                      listed in the Marketplace and installed by clients so they can grant permissions however, it will
                      not appear as a launchable app for users from the Marketplace. It is a hard requirement that
                      launchable apps conform closely to our &ldquo;Elements&rdquo;, brand guidelines so if your app
                      does not, please also select &ldquo;Direct API&rdquo;. When you have done your initial app submit,
                      please return here to set the &ldquo;is Listed&rdquo; status to make the app installable for
                      users.
                    </FormSubHeading>
                    <Grid>
                      <GridItem>
                        <Checkbox name="isDirectApi" labelText="Direct API" id="isDirectApi" />
                      </GridItem>
                      {isSubmitRevision && (
                        <GridItem>
                          <Checkbox name="isListed" labelText="Is Listed" id="isListed" />
                        </GridItem>
                      )}
                    </Grid>
                  </FormSection>
                  <FormSection>
                    <FormHeading>Permissions</FormHeading>
                    <FormSubHeading>
                      To access a client&apos;s data, you will need to specify the entities you need access to on a read
                      or write basis. You should be familiar with these entities from the sandbox. When the user
                      installs your application, they will have to consent to your usage based on these permissions. If
                      you do not have the correct permissions on an entity basis, your app will receive a 403 error.
                    </FormSubHeading>
                    <GridFourCol>{renderScopesCheckbox(scopes, errors.scopes)}</GridFourCol>
                  </FormSection>
                  <FormSection>
                    {renderErrors((errors as unknown) as Record<string, string | string[]>)}
                    <LevelRight>
                      <Grid>
                        <GridItem>
                          {!isSubmitApp && (
                            <Button onClick={goBackToApps} variant="primary" type="button">
                              Back To Apps
                            </Button>
                          )}
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
        </FlexContainerResponsive>
      </FlexContainerBasic>
      <SubmitAppReadDocModal
        visible={isSubmitModalOpen}
        onContinueClick={handleSubmitModalContinue(setIsSubmitModalOpen)}
        onViewDocClick={handleSubmitModalViewDocs}
      />
    </>
  )
}

export default DeveloperSubmitApp
