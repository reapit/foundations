import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { DynamicLinkParams, AcButton, EntityType, Formik, Form, RadioSelect } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { checkListDetailIdentityCheckUpdateData } from '@/actions/checklist-detail'
import { ContactModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'
import { selectCheckListDetailContact, selectCheckListDetailStatus } from '@/selectors/checklist-detail'
import Routes from '@/constants/routes'
import { SectionsStatus } from '@/reducers/checklist-detail'
import { calculateProgress } from '../aml-progressbar'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type UpdateStatusProps = StateProps & DispatchProps

const initialProps = {
  name: 'status',
  labelText: 'Identity Check Status',
  id: 'status',
  options: [
    { label: 'Passed', value: 'pass' },
    { label: 'Fail', value: 'fail' },
    { label: 'Pending', value: 'pending' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Warnings', value: 'warnings' },
    { label: 'Unchecked', value: 'unchecked' },
  ],
}

export const UpdateStatus: React.FC<UpdateStatusProps> = ({
  contact,
  status,
  isSubmitting,
  updateIdentityCheckStatus,
  idCheckStatus,
}) => {
  const { id, title, forename, surname } = contact || {}

  const name = React.useMemo(() => `${title} ${forename} ${surname}`.trim(), [contact])
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const loginMode = connectIsDesktop ? 'DESKTOP' : 'WEB'

  const progress = React.useMemo(() => calculateProgress(status), [status])

  return (
    <>
      <p className="mb-4">
        You have completed {progress.completed} out of {progress.total} sections for contact {name}. Please now select
        one of the following options in order to continue
      </p>
      <Formik
        initialValues={{ [initialProps.name]: idCheckStatus }}
        onSubmit={(values) => {
          updateIdentityCheckStatus(
            { status: values.status },
            {
              entityType: EntityType.CONTACT,
              entityCode: id,
              appMode: loginMode,
              webRoute: `${Routes.CHECKLIST_DETAIL_WITHOUT_ID}/${id}`,
            },
          )
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <RadioSelect
              isHorizontal
              setFieldValue={setFieldValue}
              state={values[initialProps.name]}
              {...initialProps}
            />
            <AcButton
              dynamicLinkParams={{
                entityType: EntityType.CONTACT,
                entityCode: id,
                appMode: loginMode,
              }}
              buttonProps={{
                type: 'submit',
                variant: 'primary',
                loading: isSubmitting,
                disabled: !values.status,
              }}
            >
              ID Check Successful
            </AcButton>
          </Form>
        )}
      </Formik>
    </>
  )
}

export type StateProps = {
  isSubmitting: boolean
  contact: ContactModel | null
  status: SectionsStatus
  idCheckStatus: string
}

export const mapStateToProps = (state: ReduxState) => {
  return {
    contact: selectCheckListDetailContact(state),
    status: selectCheckListDetailStatus(state),
    isSubmitting: state?.checklistDetail?.isSubmitting || false,
    idCheckStatus: state?.checklistDetail?.checklistDetailData?.idCheck?.status || 'unchecked',
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
