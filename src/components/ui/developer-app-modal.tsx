import * as React from 'react'
import bulma from '@/styles/vendor/bulma'
import Modal, { ModalProps } from '@/components/ui/modal'
import { connect } from 'react-redux'
import { ReduxState, FormState } from '@/types/core'
import { AppDetailState } from '@/reducers/app-detail'
import Loader from '@/components/ui/loader'
import Alert from '@/components/ui/alert'
import { submitRevisionSetFormState, submitRevision } from '@/actions/submit-revision'
import { SubmitRevisionState } from '@/reducers/submit-revision'
import { CreateAppRevisionModel, ScopeModel } from '@/types/marketplace-api-schema'
import { Input, Button, ImageInput, Checkbox, TextArea } from '@reapit/elements'
import { Form, Formik } from 'formik'
import { validate } from '@/utils/form/submit-revision'
import { transformDotNotationToObject, ScopeObject, transformObjectToDotNotation } from '@/utils/common'
import AppDetail from './app-detail'

export interface DeveloperAppModalMappedProps {
  allScopes: ScopeModel[]
  appDetailState: AppDetailState
  submitRevisionState: SubmitRevisionState
}

export interface DeveloperAppModalMappedActions {
  submitRevision: (id: string, revision: CreateAppRevisionModel) => void
  submitRevisionSetFormState: (formState: FormState) => void
}

export type DeveloperAppInnerProps = DeveloperAppModalMappedProps & DeveloperAppModalMappedActions & {}
export type DeveloperAppModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {}

export const renderScopesCheckbox = (scopes: ScopeModel[] = []) =>
  scopes.map((item: ScopeModel) => (
    <Checkbox name={`scopes.${item.name}`} labelText={item.description || ''} id={item.name || ''} />
  ))

export const DeveloperAppModalInner: React.FunctionComponent<DeveloperAppInnerProps> = ({
  allScopes,
  appDetailState,
  submitRevision,
  submitRevisionSetFormState,
  submitRevisionState
}) => {
  const { formState } = submitRevisionState

  const isLoading = formState === 'SUBMITTING'
  const isSucceeded = formState === 'SUCCESS'

  React.useEffect(() => {
    return () => {
      submitRevisionSetFormState('PENDING')
    }
  }, [])

  const [isEditDetail, setIsEditDetail] = React.useState(false)

  React.useEffect(() => {
    if (isSucceeded) {
      setIsEditDetail(false)
    }
  }, [isSucceeded])

  if (appDetailState.loading) {
    return <Loader />
  }

  if (appDetailState.error) {
    return <Alert type="danger" message="Failed to fetch. Please try later." />
  }

  if (!appDetailState.appDetailData) {
    return null
  }

  const {
    id,
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
    pendingRevisions,
    scopes: appScopes
  } = appDetailState.appDetailData.data

  const icon = (media || []).filter(({ order }) => order === 0)[0]
  const images = (media || [])
    .filter(({ order }) => order !== 0)
    .reduce((a, c) => ({ ...a, [`screen${c.order}ImageData`]: c.uri }), {})
  const iconImageData = icon ? icon.uri : ''

  return (
    <>
      <div className={isEditDetail ? bulma.isHidden : ''} data-test="app-detail-modal">
        <div className="flex justify-end">
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsEditDetail(true)}
            disabled={pendingRevisions}
            dataTest="detail-modal-edit-button"
          >
            {pendingRevisions ? 'Pending Revision' : 'Edit Detail'}
          </Button>
        </div>
        <AppDetail data={appDetailState.appDetailData.data} />
      </div>

      {isEditDetail && (
        <>
          <h3 className={`${bulma.title} ${bulma.is3}`}>Edit App Detail</h3>
          <Formik
            initialValues={{
              name,
              description,
              developerId,
              homePage,
              telephone,
              supportEmail,
              summary,
              launchUri,
              iconImageData,
              isListed,
              scopes: transformDotNotationToObject(appScopes),
              ...images
            }}
            validate={validate}
            onSubmit={revision => {
              if (!id) {
                return
              }
              submitRevision(id, revision)
            }}
            render={() => {
              return (
                <Form>
                  <Input dataTest="submit-revision-name" type="text" labelText="Name" id="name" name="name" />
                  <Input
                    dataTest="submit-revision-support-email"
                    type="text"
                    labelText="Support Email"
                    id="supportEmail"
                    name="supportEmail"
                  />
                  <Input
                    dataTest="submit-revision-telephone"
                    type="text"
                    labelText="Telephone"
                    id="telephone"
                    name="telephone"
                  />
                  <Input
                    dataTest="submit-revision-launchUri"
                    type="text"
                    labelText="Launch URI"
                    id="launchUri"
                    name="launchUri"
                  />
                  <Input
                    dataTest="submit-revision-homepage"
                    type="text"
                    labelText="Homepage"
                    id="homePage"
                    name="homePage"
                  />
                  <TextArea
                    id="description"
                    dataTest="submit-revision-description"
                    labelText="Description"
                    name="description"
                  />
                  <TextArea id="summary" dataTest="submit-revision-summary" labelText="Sumary" name="summary" />
                  {renderScopesCheckbox(allScopes)}
                  <ImageInput
                    id="iconImageData"
                    dataTest="submit-app-iconImageData"
                    labelText="Icon"
                    name="iconImageData"
                  />

                  <ImageInput
                    id="screenshot1"
                    dataTest="submit-app-screenshoot1"
                    labelText="Screenshot 1"
                    name="screen1ImageData"
                  />

                  <ImageInput
                    id="screenshot2"
                    dataTest="submit-app-screenshoot2"
                    labelText="Screenshot 2"
                    name="screen2ImageData"
                    allowClear
                  />

                  <ImageInput
                    id="screenshot3"
                    dataTest="submit-app-screenshoot3"
                    labelText="Screenshot 3"
                    name="screen3ImageData"
                    allowClear
                  />

                  <ImageInput
                    id="screenshot4"
                    dataTest="submit-app-screenshoot4"
                    labelText="Screenshot 4"
                    name="screen4ImageData"
                    allowClear
                  />

                  <ImageInput
                    id="screenshot5"
                    dataTest="submit-app-screenshoot5"
                    labelText="Screenshot 5"
                    name="screen5ImageData"
                    allowClear
                  />

                  <Checkbox id="isListed" dataTest="submit-revision-isListed" labelText="Is listed" name="isListed" />

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      className="mr-2"
                      variant="secondary"
                      disabled={Boolean(isLoading)}
                      dataTest="submit-revision-modal-cancel-button"
                      onClick={() => setIsEditDetail(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      loading={Boolean(isLoading)}
                      disabled={Boolean(isLoading)}
                      dataTest="submit-revision-modal-edit-button"
                    >
                      Submit revision
                    </Button>
                  </div>
                </Form>
              )
            }}
          />
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: ReduxState): DeveloperAppModalMappedProps => ({
  allScopes: (state.developer.developerData && state.developer.developerData.scopes) || [],
  appDetailState: state.appDetail,
  submitRevisionState: state.submitRevision
})

const mapDispatchToProps = (dispatch: any): DeveloperAppModalMappedActions => ({
  submitRevision: (id, revision) => {
    const scopes = transformObjectToDotNotation(revision.scopes as ScopeObject)
    dispatch(submitRevision({ ...revision, id, scopes }))
  },
  submitRevisionSetFormState: formState => dispatch(submitRevisionSetFormState(formState))
})

const DeveloperAppInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeveloperAppModalInner)

export const DeveloperAppModal: React.FunctionComponent<DeveloperAppModalProps> = ({ visible = true, afterClose }) => {
  return (
    <Modal visible={visible} afterClose={afterClose}>
      <DeveloperAppInnerWithConnect />
    </Modal>
  )
}

export default DeveloperAppModal
