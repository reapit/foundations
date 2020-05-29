import * as React from 'react'
import { History } from 'history'
import { useHistory, useParams } from 'react-router'
import {
  Input,
  Button,
  Loader,
  Alert,
  H3,
  Grid,
  GridItem,
  FlexContainerBasic,
  FormSection,
  LevelRight,
  Formik,
  Form,
  FormikHelpers,
  H6,
  FlexContainerResponsive,
  FormikValues,
} from '@reapit/elements'
import { FIELD_ERROR_DESCRIPTION } from '@/constants/form'

import { validate } from '@/utils/form/submit-app'
import { useDispatch, useSelector } from 'react-redux'
import { submitApp, submitAppSetFormState, CustomCreateAppModel } from '@/actions/submit-app'
import { CreateAppModel, AppDetailModel } from '@reapit/foundations-ts-definitions'
import Routes from '@/constants/routes'
import { submitRevisionSetFormState, submitRevision } from '@/actions/submit-revision'
import DeveloperSubmitAppSuccessfully from '@/components/pages/developer-submit-app-successfully'
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
import RedirectUriSection from './redirect-uri-section'
import UploadImageSection from './upload-image-section'
import MarketplaceStatusSection from './marketplace-status-section'
import PermissionSection from './permission-section'
import styles from '@/styles/pages/developer-submit-app.scss?mod'
import { ScopeModel } from '@/types/marketplace-api-schema'

export type DeveloperSubmitAppProps = {}

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

export const handleGoBackToApps = (history: History) => {
  return () => {
    history.push(Routes.DEVELOPER_MY_APPS)
  }
}

export const handleOnSubmitAnotherApp = (dispatch: Dispatch) => {
  return () => {
    dispatch(submitAppSetFormState('PENDING'))
  }
}

export type HandleOpenAppPreview = {
  scopes: ScopeModel[]
  values: FormikValues
  appid?: string
  appDetails?: AppDetailModel & { apiKey?: string }
}

export const handleOpenAppPreview = ({ appDetails, values, scopes, appid }: HandleOpenAppPreview) => () => {
  const appDetailState = {
    ...appDetails,
    ...values,
    scopes: scopes.filter(scope => values.scopes.includes(scope.name)),
  }

  const url = `developer/apps/${appid}/preview`
  localStorage.setItem('developer-preview-app', JSON.stringify(appDetailState))
  window.open(url, '_blank')
}

export const DeveloperSubmitApp: React.FC<DeveloperSubmitAppProps> = () => {
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

  const goBackToApps = React.useCallback(handleGoBackToApps(history), [history])
  const onSubmitAnotherApp = React.useCallback(handleOnSubmitAnotherApp(dispatch), [dispatch])

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
    return <DeveloperSubmitAppSuccessfully onGoBackToApps={goBackToApps} onSubmitAnotherApp={onSubmitAnotherApp} />
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
              const { authFlow, isPrivateApp } = values
              return (
                <Form noValidate={true}>
                  <GeneralInformationSection />
                  <AgencyCloudIntegrationSection />
                  <AuthenticationFlowSection
                    authFlow={authFlow}
                    isSubmitApp={isSubmitApp}
                    setFieldValue={setFieldValue}
                  />
                  <RedirectUriSection authFlow={authFlow} isPrivateApp={isPrivateApp} setFieldValue={setFieldValue} />
                  <UploadImageSection />
                  <MarketplaceStatusSection isSubmitRevision={isSubmitRevision} />
                  <PermissionSection scopes={scopes} errors={errors} />
                  <FormSection>
                    {renderErrors((errors as unknown) as Record<string, string | string[]>)}
                    <LevelRight>
                      <Grid>
                        <GridItem>
                          <Button
                            onClick={handleOpenAppPreview({
                              appDetails: appDetailState?.appDetailData?.data,
                              values,
                              scopes,
                              appid,
                            })}
                            variant="primary"
                            type="button"
                          >
                            Preview
                          </Button>
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
