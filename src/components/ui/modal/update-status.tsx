import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Button, DynamicLinkParams, AcButton, EntityType } from '@reapit/elements'
import { LoginMode } from '@reapit/cognito-auth'
import { ReduxState } from '@/types/core'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { checkListDetailIdentityCheckUpdateData } from '@/actions/checklist-detail'
import { ContactModel, ContactIdentityCheckModel } from '@reapit/types'
import { selectCheckListDetailContact, selectCheckListDetailStatus } from '@/selectors/checklist-detail'
import { selectLoginMode } from '@/selectors/auth'
import Routes from '@/constants/routes'
import { SectionsStatus } from '@/reducers/checklist-detail'
import { calculateProgress } from '../aml-progressbar'

export type UpdateStatusProps = StateProps & DispatchProps

export const UpdateStatus: React.FC<UpdateStatusProps> = ({
  contact,
  status,
  loginMode,
  isSubmitting,
  updateIdentityCheckStatus
}) => {
  const { id, title, forename, surname } = contact || {}

  const name = React.useMemo(() => `${title} ${forename} ${surname}`.trim(), [contact])

  const progress = React.useMemo(() => calculateProgress(status), [status])

  return (
    <>
      <p>
        You have completed {progress.completed} out of {progress.total} sections for contact {name}. Please now select
        one of the following options in order to continue
      </p>
      <div className={styles.footerBtn}>
        <AcButton
          dynamicLinkParams={{
            entityType: EntityType.CONTACT,
            entityCode: id,
            appMode: loginMode
          }}
          buttonProps={{
            type: 'button',
            variant: 'primary',
            loading: isSubmitting,
            onClick: () =>
              updateIdentityCheckStatus(
                { status: 'pass' },
                {
                  entityType: EntityType.CONTACT,
                  entityCode: id,
                  appMode: loginMode,
                  webRoute: `${Routes.CHECKLIST_DETAIL_WITHOUT_ID}/${id}`
                }
              )
          }}
        >
          ID Check Successful
        </AcButton>
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            window.location.href = `https://dev.lifetime-legal-app.reapit.com/profile/${id}`
          }}
        >
          Refer to Lifetime Legal
        </Button>
      </div>
    </>
  )
}

export type StateProps = {
  isSubmitting: boolean
  contact: ContactModel | null
  loginMode: LoginMode
  status: SectionsStatus
}

export const mapStateToProps = (state: ReduxState) => {
  return {
    contact: selectCheckListDetailContact(state),
    loginMode: selectLoginMode(state),
    status: selectCheckListDetailStatus(state),
    isSubmitting: state?.checklistDetail?.isSubmitting || false
  }
}

export type DispatchProps = {
  updateIdentityCheckStatus: (idCheck: ContactIdentityCheckModel, dynamicLinkParams: DynamicLinkParams) => void
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateIdentityCheckStatus: (idCheck: ContactIdentityCheckModel, dynamicLinkParams: DynamicLinkParams) =>
      dispatch(checkListDetailIdentityCheckUpdateData({ idCheck, dynamicLinkParams }))
  }
}

const UpdateStatusWithRedux = connect(mapStateToProps, mapDispatchToProps)(UpdateStatus)

UpdateStatusWithRedux.displayName = 'UpdateStatusWithRedux'

export default UpdateStatusWithRedux
