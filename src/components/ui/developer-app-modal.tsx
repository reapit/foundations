import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState, FormState } from '@/types/core'
import { AppDetailState } from '@/reducers/app-detail'
import { submitRevisionSetFormState, submitRevision } from '@/actions/submit-revision'
import { SubmitRevisionState } from '@/reducers/submit-revision'
import { CreateAppRevisionModel, ScopeModel } from '@/types/marketplace-api-schema'
import {
  Input,
  Button,
  ImageInput,
  Checkbox,
  TextArea,
  Modal,
  ModalProps,
  Loader,
  Alert,
  ModalBody,
  ModalHeader,
  FormSection,
  FormHeading,
  FormSubHeading,
  GridItem,
  Grid,
  LevelRight
} from '@reapit/elements'
import { Form, Formik } from 'formik'
import { validate } from '@/utils/form/submit-revision'
import { transformDotNotationToObject, ScopeObject, transformObjectToDotNotation } from '@/utils/common'
import AppDetail from './app-detail'
import { setDeveloperAppModalStateEditDetail, setDeveloperAppModalStateViewDetail } from '@/actions/developer-app-modal'
import AppDelete from '@/components/ui/app-delete'

export interface DeveloperAppModalMappedProps {
  allScopes: ScopeModel[]
  appDetailState: AppDetailState
  submitRevisionState: SubmitRevisionState
  closeParentModal?: () => void
}

export interface DeveloperAppModalMappedActions {
  submitRevision: (id: string, revision: CreateAppRevisionModel) => void
  submitRevisionSetFormState: (formState: FormState) => void
  setDeveloperAppModalStateEditDetail: () => void
  setDeveloperAppModalStateViewDetail: () => void
}

export type DeveloperAppInnerProps = DeveloperAppModalMappedProps & DeveloperAppModalMappedActions & {}
export type DeveloperAppModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {}

export const CheckboxElement: React.SFC<{ scopes?: ScopeModel[] }> = ({ scopes = [] }) => {
  const oddCheckboxes: JSX.Element[] = []
  const evenCheckboxes: JSX.Element[] = []

  scopes.forEach((item: ScopeModel, index: number) => {
    const currentCheckbox = (
      <Checkbox name={`scopes.${item.name}`} labelText={item.description || ''} id={item.name || ''} />
    )
    // TODO - short term hack to remove temporary scopes from API response
    if (
      item.name !== 'Marketplace/developers.read' &&
      item.name !== 'Marketplace/developers.write' &&
      item.name !== 'TestResourceServer/test.scope'
    ) {
      // Sorting evens and odds so they can go in separate grid columns
      if (index % 2) {
        evenCheckboxes.push(currentCheckbox)
      } else {
        oddCheckboxes.push(currentCheckbox)
      }
    }
  })

  return (
    <>
      <GridItem>
        {oddCheckboxes.map((checkbox: JSX.Element, index: number) => (
          <span key={index}>{checkbox}</span>
        ))}
      </GridItem>
      <GridItem>
        {evenCheckboxes.map((checkbox: JSX.Element, index: number) => (
          <span key={index}>{checkbox}</span>
        ))}
      </GridItem>
    </>
  )
}

export const DeveloperAppModalInner: React.FunctionComponent<DeveloperAppInnerProps> = ({
  allScopes,
  appDetailState,
  submitRevision,
  submitRevisionSetFormState,
  submitRevisionState,
  setDeveloperAppModalStateEditDetail,
  setDeveloperAppModalStateViewDetail,
  closeParentModal
}) => {
  const { formState } = submitRevisionState

  const isLoading = formState === 'SUBMITTING'
  const isSucceeded = formState === 'SUCCESS'

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isEditDetail, setIsEditDetail] = React.useState(false)

  React.useEffect(() => {
    return () => {
      submitRevisionSetFormState('PENDING')
    }
  }, [])

  React.useEffect(() => {
    if (isSucceeded) {
      setDeveloperAppModalStateViewDetail()
      closeParentModal && closeParentModal()
    }
  }, [isSucceeded])

  if (appDetailState.loading) {
    return <ModalBody body={<Loader />} />
  }

  if (appDetailState.error) {
    return <ModalBody body={<Alert type="danger" message="Failed to fetch. Please try later." />} />
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

  if (!isEditDetail) {
    return (
      <>
        <AppDetail
          data={appDetailState.appDetailData.data}
          afterClose={closeParentModal as () => void}
          data-test="app-detail-modal"
          footerItems={
            <>
              <Button
                type="button"
                variant="secondary"
                dataTest="detail-modal-delete-button"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Delete App
              </Button>
              <Button
                type="button"
                variant="primary"
                dataTest="detail-modal-edit-button"
                onClick={() => {
                  setIsEditDetail(true)
                }}
                disabled={pendingRevisions}
              >
                {pendingRevisions ? 'Pending Revision' : 'Edit Detail'}
              </Button>
            </>
          }
        />

        <AppDelete
          afterClose={() => setIsDeleteModalOpen(false)}
          visible={isDeleteModalOpen}
          onDeleteSuccess={() => {
            closeParentModal && closeParentModal()
            setIsDeleteModalOpen(false)
          }}
        />
      </>
    )
  }

  if (isEditDetail) {
    return (
      <>
        <ModalHeader
          title={`Edit ${name} detail`}
          afterClose={closeParentModal as () => void}
          data-test="app-detail-modal"
        />
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
              <ModalBody
                body={
                  <Form>
                    <FormSection>
                      <FormHeading>App Listing</FormHeading>
                      <FormSubHeading>
                        These fields refer to the name and icon of your application as they will appear to a user in the
                        Marketplace and in their installed apps. The "Is Listed" checkbox determines if the app appears
                        as a public listing on the marketplace, available for client installation.
                      </FormSubHeading>
                      <Input dataTest="submit-revision-name" type="text" labelText="Name" id="name" name="name" />
                      <div className="control mb-4">
                        <label className="label">Icon</label>
                        <ImageInput
                          id="iconImageData"
                          dataTest="submit-app-iconImageData"
                          labelText="Icon"
                          name="iconImageData"
                          allowClear
                        />
                      </div>
                      <div className="control">
                        <label className="label">Is Listed</label>
                        <Checkbox id="isListed" dataTest="submit-revision-isListed" labelText="" name="isListed" />
                      </div>
                    </FormSection>
                    <FormSection>
                      <FormHeading>App Details</FormHeading>
                      <FormSubHeading>
                        Information that will be the user facing listing for your app. "Summary" will be the short app
                        strapline whereas "description", will be more detailed. These fields have a min/max charset of
                        50/150 and 150/1000 respectively.
                      </FormSubHeading>
                      <TextArea id="summary" dataTest="submit-revision-summary" labelText="Sumary" name="summary" />
                      <TextArea
                        id="description"
                        dataTest="submit-revision-description"
                        labelText="Description"
                        name="description"
                      />
                    </FormSection>
                    <FormSection>
                      <FormHeading>Contact Details</FormHeading>
                      <FormSubHeading>
                        Should one of our developers need to get in touch about your app listing.
                      </FormSubHeading>
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
                    </FormSection>
                    <FormSection>
                      <FormHeading>Websites</FormHeading>
                      <FormSubHeading>
                        Homepage refers to your company's corporate site. The launch URI is default homepage for your
                        listed application.
                      </FormSubHeading>
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
                    </FormSection>
                    <FormSection>
                      <FormHeading>Screenshots</FormHeading>
                      <FormSubHeading>
                        You can select a minimum of one and up to four screenshots of your application, that will appear
                        in a carousel in the details view of your app listing.
                      </FormSubHeading>

                      <div className="control mb-4">
                        <label className="label">Screenshot 1</label>
                        <ImageInput
                          id="screenshot1"
                          dataTest="submit-app-screenshoot1"
                          labelText="Upload Image"
                          name="screen1ImageData"
                          allowClear
                        />
                      </div>
                      <div className="control mb-4">
                        <label className="label">Screenshot 2</label>
                        <ImageInput
                          id="screenshot2"
                          dataTest="submit-app-screenshoot2"
                          labelText="Upload Image"
                          name="screen2ImageData"
                          allowClear
                        />
                      </div>

                      <div className="control mb-4">
                        <label className="label">Screenshot 3</label>
                        <ImageInput
                          id="screenshot3"
                          dataTest="submit-app-screenshoot3"
                          labelText="Upload Image"
                          name="screen3ImageData"
                          allowClear
                        />
                      </div>
                      <div className="control mb-4">
                        <label className="label">Screenshot 4</label>
                        <ImageInput
                          id="screenshot4"
                          dataTest="submit-app-screenshoot4"
                          labelText="Upload Image"
                          name="screen4ImageData"
                          allowClear
                        />
                      </div>
                    </FormSection>
                    <FormSection>
                      <FormHeading>Permssions</FormHeading>
                      <FormSubHeading>
                        To access a client's data, you will need to specify the entities you need access to on a read or
                        write basis. You should be familar with these entities from the sandbox. When the user installs
                        your application, they will have to consent to your usage based on these permissions. If you do
                        not have the correct permissions on an entity basis, your app will receive a 403 error.
                      </FormSubHeading>
                      <Grid>
                        <CheckboxElement scopes={allScopes} />
                      </Grid>
                    </FormSection>
                    <FormSection>
                      <LevelRight>
                        <Button
                          type="button"
                          className="mr-2"
                          variant="secondary"
                          disabled={Boolean(isLoading)}
                          onClick={() => {
                            setIsEditDetail(false)
                          }}
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
                      </LevelRight>
                    </FormSection>
                  </Form>
                }
              />
            )
          }}
        />
      </>
    )
  }

  return <div />
}

interface DeveloperAppModalOwnProps {
  closeParentModal?: () => void
}

const mapStateToProps = (state: ReduxState, ownState: DeveloperAppModalOwnProps): DeveloperAppModalMappedProps => ({
  allScopes: (state.developer.developerData && state.developer.developerData.scopes) || [],
  appDetailState: state.appDetail,
  submitRevisionState: state.submitRevision,
  closeParentModal: ownState.closeParentModal
})

const mapDispatchToProps = (dispatch: any): DeveloperAppModalMappedActions => ({
  submitRevision: (id, revision) => {
    const scopes = transformObjectToDotNotation(revision.scopes as ScopeObject)
    dispatch(submitRevision({ ...revision, id, scopes }))
  },
  submitRevisionSetFormState: formState => dispatch(submitRevisionSetFormState(formState)),
  setDeveloperAppModalStateEditDetail: () => dispatch(setDeveloperAppModalStateEditDetail()),
  setDeveloperAppModalStateViewDetail: () => dispatch(setDeveloperAppModalStateViewDetail())
})

const DeveloperAppInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeveloperAppModalInner)

export const DeveloperAppModal: React.FunctionComponent<DeveloperAppModalProps> = ({ visible = true, afterClose }) => {
  return (
    <Modal visible={visible} afterClose={afterClose} deps={[]} renderChildren>
      <DeveloperAppInnerWithConnect closeParentModal={afterClose} />
    </Modal>
  )
}

export default DeveloperAppModal
