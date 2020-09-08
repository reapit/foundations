import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DynamicLinkParams, AcButton, EntityType } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { checkListDetailIdentityCheckUpdateData } from '@/actions/checklist-detail'
import { ContactModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'
import { selectCheckListDetailContact, selectCheckListDetailStatus } from '@/selectors/checklist-detail'
import Routes from '@/constants/routes'
import { SectionsStatus } from '@/reducers/checklist-detail'
import { calculateProgress } from '../aml-progressbar'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type UpdateStatusProps = StateProps & DispatchProps

export const UpdateStatus: React.FC<UpdateStatusProps> = ({
  contact,
  status,
  isSubmitting,
  updateIdentityCheckStatus,
}) => {
  const { id, title, forename, surname } = contact || {}

  const name = React.useMemo(() => `${title} ${forename} ${surname}`.trim(), [contact])
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const loginMode = connectIsDesktop ? 'DESKTOP' : 'WEB'

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
            appMode: loginMode,
          }}
          buttonProps={{
            className: styles.idCheckSucessBtn,
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
                  webRoute: `${Routes.CHECKLIST_DETAIL_WITHOUT_ID}/${id}`,
                },
              ),
          }}
        >
          ID Check Successful
        </AcButton>
      </div>
    </>
  )
}

export type StateProps = {
  isSubmitting: boolean
  contact: ContactModel | null
  status: SectionsStatus
}

export const mapStateToProps = (state: ReduxState) => {
  return {
    contact: selectCheckListDetailContact(state),
    status: selectCheckListDetailStatus(state),
    isSubmitting: state?.checklistDetail?.isSubmitting || false,
  }
}

export type DispatchProps = {
  updateIdentityCheckStatus: (idCheck: IdentityCheckModel, dynamicLinkParams: DynamicLinkParams) => void
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateIdentityCheckStatus: (idCheck: IdentityCheckModel, dynamicLinkParams: DynamicLinkParams) =>
      dispatch(checkListDetailIdentityCheckUpdateData({ idCheck, dynamicLinkParams })),
  }
}

const UpdateStatusWithRedux = connect(mapStateToProps, mapDispatchToProps)(UpdateStatus)

UpdateStatusWithRedux.displayName = 'UpdateStatusWithRedux'

export default UpdateStatusWithRedux
