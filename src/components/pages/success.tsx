import * as React from 'react'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Button, FlexContainerResponsive, H3 } from '@reapit/elements'
import { FaCheck } from 'react-icons/fa'
import styles from '@/styles/pages/success.scss?mod'
import { ReduxState, FormState } from '@/types/core'
import { connect } from 'react-redux'
import { submitComplete, submitCompleteSetFormState } from '@/actions/success'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import Routes from '@/constants/routes'
import { ContactModel } from '@/types/contact-api-schema'
import { oc } from 'ts-optchain'

export interface SuccessMappedActions {
  submitComplete: () => void
  resetSubmitCompleteFormState: () => void
}

export interface SuccessMappedProps {
  submitCompleteFormState: FormState
  contact: ContactModel
}

export type SuccessProps = SuccessMappedActions & SuccessMappedProps & RouteComponentProps<{ id?: any }>

export const SuccessPage = ({
  submitComplete,
  submitCompleteFormState,
  resetSubmitCompleteFormState,
  contact,
  match: {
    params: { id }
  }
}: SuccessProps) => {
  const isRPS = true

  React.useEffect(() => {
    resetSubmitCompleteFormState()
  }, [])

  if ((submitCompleteFormState === 'SUCCESS' && isRPS) || id === undefined || id !== contact.id) {
    return <Redirect to={Routes.RESULTS} />
  }

  if (submitCompleteFormState === 'SUCCESS' && !isRPS) {
    // code to redirect to "Contact Record" in RPS
  }

  return (
    <ErrorBoundary>
      <FlexContainerResponsive flexColumn className={styles.successWrapper}>
        <H3>
          Referral Complete
          <span className={styles.successIcon}>
            <FaCheck />
          </span>
        </H3>
        <div className={styles.successContent}>
          <p>
            Thank you for your referral. Our dedicated team will now process the information you have submitted, and we
            will be in contact with you in due course.
          </p>
          <p className="my-5">Please ‘Complete Submission’ in order to continue.</p>
          <p>Should you have any queries in the meantime, please do not hesitate to contact our team.</p>
        </div>
        <div className={styles.successButton}>
          <Button
            variant="primary"
            type="button"
            loading={submitCompleteFormState === 'SUBMITTING'}
            onClick={() => submitComplete()}
          >
            Complete Submission
          </Button>
        </div>
      </FlexContainerResponsive>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): SuccessMappedProps => ({
  submitCompleteFormState: state.success.submitCompleteFormState,
  contact: oc(state).checklistDetail.checklistDetailData.contact({})
})

const mapDispatchToProps = (dispatch: any): SuccessMappedActions => ({
  submitComplete: () => dispatch(submitComplete()),
  resetSubmitCompleteFormState: () => dispatch(submitCompleteSetFormState('PENDING'))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SuccessPage)
)
