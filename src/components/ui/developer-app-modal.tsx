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
import { CreateAppRevisionModel } from '@/types/marketplace-api-schema'
import Button from '../form/button'
import Input from '../form/input'
import TextArea from '../form/textarea'
import { Form, Formik } from 'formik'
import { validate } from '@/utils/form/submit-revision'
import AppDetail from './app-detail'
import ImageInput from '../form/image-input'
import Checkbox from '../form/checkbox'

export interface DeveloperAppModalMappedProps {
  appDetailState: AppDetailState
  submitRevisionState: SubmitRevisionState
}

export interface DeveloperAppModalMappedActions {
  submitRevision: (id: string, revision: CreateAppRevisionModel) => void
  submitRevisionSetFormState: (formState: FormState) => void
}

export type DeveloperAppInnerProps = DeveloperAppModalMappedProps & DeveloperAppModalMappedActions & {}
export type DeveloperAppModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & {}

export const DeveloperAppModalInner: React.FunctionComponent<DeveloperAppInnerProps> = ({
  appDetailState,
  submitRevision,
  submitRevisionSetFormState,
  submitRevisionState
}) => {
  React.useEffect(() => {
    return () => {
      submitRevisionSetFormState('PENDING')
    }
  }, [])

  const [isEditDetail, setIsEditDetail] = React.useState(false)

  if (appDetailState.loading) {
    return <Loader />
  }

  if (appDetailState.error) {
    return <Alert type="danger" message="Failed to fetch. Please try later." />
  }

  if (!appDetailState.appDetailData) {
    return null
  }

  const { formState } = submitRevisionState

  const isLoading = formState === 'SUBMITTING'
  const isSuccessed = formState === 'SUCCESS'

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
    isListed
  } = appDetailState.appDetailData.data

  const icon = (media || []).filter(({ type }) => type === 'icon')[0]
  const images = (media || [])
    .filter(({ type }) => type !== 'icon')
    .reduce((a, c, i) => ({ ...a, [`screen${i + 1}ImageData`]: c.uri }), {})
  const iconImageData = icon ? icon.uri : ''

  return (
    <>
      <div className={isEditDetail ? bulma.isHidden : ''}>
        <AppDetail data={appDetailState.appDetailData.data} />
        <div className="mt-5">
          <Button type="button" variant="primary" onClick={() => setIsEditDetail(true)}>
            Edit Detail
          </Button>
        </div>
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
              ...images
            }}
            validate={validate}
            onSubmit={revision => {
              if (!id) {
                return
              }
              const data = { ...revision }

              if (iconImageData === data.iconImageData) {
                delete data.iconImageData
              }

              Object.keys(images).forEach(key => {
                if (images[key] === data[key]) {
                  delete data[key]
                }
              })

              submitRevision(id, data)
            }}
            render={({ errors }) => {
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
                  />

                  <ImageInput
                    id="screenshot3"
                    dataTest="submit-app-screenshoot3"
                    labelText="Screenshot 3"
                    name="screen3ImageData"
                  />

                  <ImageInput
                    id="screenshot4"
                    dataTest="submit-app-screenshoot4"
                    labelText="Screenshot 4"
                    name="screen4ImageData"
                  />

                  <ImageInput
                    id="screenshot5"
                    dataTest="submit-app-screenshoot5"
                    labelText="Screenshot 5"
                    name="screen5ImageData"
                  />

                  <Checkbox id="isListed" dataTest="submit-revision-isListed" labelText="Is listed" name="isListed" />

                  <Button type="submit" variant="primary" loading={Boolean(isLoading)} disabled={Boolean(isLoading)}>
                    Submit revision
                  </Button>

                  <Button
                    type="button"
                    className="ml-2"
                    variant="secondary"
                    disabled={Boolean(isLoading)}
                    onClick={() => setIsEditDetail(false)}
                  >
                    Cancel
                  </Button>

                  {isSuccessed && (
                    <Alert
                      className="mt-5"
                      message="Revision was sent successfully"
                      type="success"
                      dataTest="submit-revision-success-message"
                    />
                  )}
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
  appDetailState: state.appDetail,
  submitRevisionState: state.submitRevision
})

const mapDispatchToProps = (dispatch: any): DeveloperAppModalMappedActions => ({
  submitRevision: (id, revision) => dispatch(submitRevision({ ...revision, id })),
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
