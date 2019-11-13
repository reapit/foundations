import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { RejectRevisionModel } from '@/types/marketplace-api-schema'
import { Button, TextArea, Modal, ModalProps, ModalFooter, ModalBody } from '@reapit/elements'
import { Form, Formik } from 'formik'
import { validate } from '@/utils/form/reject-revision'
import { declineRevision, RevisionDeclineRequestParams } from '@/actions/revision-detail'
import { RevisionDetailState } from '@/reducers/revision-detail'
import CallToAction from './call-to-action'

interface DeclineRevisionInnerWithConnectOwnProps {
  closeModal?: () => void
  onDeclineSuccess: () => void
  visible: boolean
}

export interface DeclineRevisionModalMappedProps extends DeclineRevisionInnerWithConnectOwnProps {
  revisionDetail: RevisionDetailState
  name: string
  email: string
}

export interface DeclineRevisionModalMappedActions {
  submitDeclineRevision: (params: RevisionDeclineRequestParams) => void
}

const mapStateToProps = (
  state: ReduxState,
  ownProps: DeclineRevisionInnerWithConnectOwnProps
): DeclineRevisionModalMappedProps => ({
  revisionDetail: state.revisionDetail,
  email: state?.auth?.loginSession?.loginIdentity?.email || '',
  name: state?.auth?.loginSession?.loginIdentity?.name || '',
  closeModal: ownProps.closeModal,
  onDeclineSuccess: ownProps.onDeclineSuccess,
  visible: ownProps.visible
})

const mapDispatchToProps = (dispatch: any): DeclineRevisionModalMappedActions => ({
  submitDeclineRevision: params => dispatch(declineRevision(params))
})

export type DeclineRevisionModalProps = Pick<ModalProps, 'visible' | 'afterClose'> &
  DeclineRevisionModalMappedProps &
  DeclineRevisionModalMappedActions

export const handleAfterClose = ({ isSuccessed, onDeclineSuccess, isLoading, afterClose }) => () => {
  if (isSuccessed) {
    onDeclineSuccess()
  } else if (!isLoading && afterClose) {
    afterClose()
  }
}

export const handleOnSubmit = ({ appId, appRevisionId, setRejectionReason, submitDeclineRevision }) => (
  formValues: RejectRevisionModel
) => {
  if (appId && appRevisionId) {
    setRejectionReason(formValues.rejectionReason || '')
    submitDeclineRevision({ appId, appRevisionId, ...formValues })
  }
}

export const DeclineRevisionModal: React.FunctionComponent<DeclineRevisionModalProps> = ({
  visible,
  submitDeclineRevision,
  afterClose,
  revisionDetail,
  onDeclineSuccess,
  name,
  email
}) => {
  const { declineFormState } = revisionDetail
  const { appId, id: appRevisionId } = revisionDetail?.revisionDetailData?.data || {}
  const [rejectionReason, setRejectionReason] = React.useState('')

  const isLoading = declineFormState === 'SUBMITTING'
  const isSuccessed = declineFormState === 'SUCCESS'

  return (
    <Modal
      visible={visible}
      renderChildren
      afterClose={handleAfterClose({ isSuccessed, onDeclineSuccess, isLoading, afterClose })}
    >
      <Formik
        initialValues={{ email, name, rejectionReason } as RejectRevisionModel}
        data-test="revision-decline-form"
        validate={validate}
        onSubmit={handleOnSubmit({ appId, appRevisionId, setRejectionReason, submitDeclineRevision })}
        render={() => {
          return isSuccessed ? (
            <ModalBody
              body={
                <CallToAction
                  title="Rejected!"
                  buttonText="Back to List"
                  dataTest="decline-revision-success-message"
                  onButtonClick={() => {
                    onDeclineSuccess()
                  }}
                  isCenter
                >
                  Revision has been declined successfully.
                </CallToAction>
              }
            />
          ) : (
            <Form>
              <ModalBody
                body={
                  <TextArea
                    name="rejectionReason"
                    id="rejectionReason"
                    labelText="Rejection reason"
                    dataTest="revision-rejection-reason"
                  />
                }
              />
              <ModalFooter
                footerItems={
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      className="mr-2"
                      disabled={Boolean(isLoading)}
                      onClick={() => afterClose && afterClose()}
                      dataTest="revision-decline-cancel"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="danger"
                      loading={Boolean(isLoading)}
                      disabled={Boolean(isLoading)}
                      dataTest="revision-decline-submit"
                    >
                      Decline
                    </Button>
                  </>
                }
              />
            </Form>
          )
        }}
      />
    </Modal>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DeclineRevisionModal)
