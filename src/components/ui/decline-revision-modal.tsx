import * as React from 'react'
import Modal, { ModalProps } from '@/components/ui/modal'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { RejectRevisionModel } from '@/types/marketplace-api-schema'
import { Button, TextArea } from '@reapit/elements'
import { Form, Formik } from 'formik'
import { validate } from '@/utils/form/reject-revision'
import { declineRevision, RevisionDeclineRequestParams } from '@/actions/revision-detail'
import { RevisionDetailState } from '@/reducers/revision-detail'
import { oc } from 'ts-optchain'
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
  email: state.auth.loginSession!.loginIdentity.email,
  name: state.auth.loginSession!.loginIdentity.name,
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
  const { appId, id: appRevisionId } = oc<RevisionDetailState>(revisionDetail).revisionDetailData.data({})
  const [rejectionReason, setRejectionReason] = React.useState('')

  const isLoading = declineFormState === 'SUBMITTING'
  const isSuccessed = declineFormState === 'SUCCESS'

  return (
    <Modal
      visible={visible}
      size="small"
      afterClose={() => {
        if (isSuccessed) {
          onDeclineSuccess()
        } else if (!isLoading && afterClose) {
          afterClose()
        }
      }}
    >
      <Formik
        initialValues={{ email, name, rejectionReason } as RejectRevisionModel}
        data-test="revision-decline-form"
        validate={validate}
        onSubmit={(formValues: RejectRevisionModel) => {
          if (appId && appRevisionId) {
            setRejectionReason(formValues.rejectionReason || '')
            submitDeclineRevision({ appId, appRevisionId, ...formValues })
          }
        }}
        render={() => {
          return isSuccessed ? (
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
          ) : (
            <Form>
              <TextArea
                name="rejectionReason"
                id="rejectionReason"
                labelText="Rejection reason"
                dataTest="revision-rejection-reason"
              />
              <div className="flex justify-end">
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
              </div>
            </Form>
          )
        }}
      />
    </Modal>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeclineRevisionModal)
