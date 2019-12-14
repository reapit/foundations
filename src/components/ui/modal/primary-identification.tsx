import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import Identification, { IDENTIFICATION_FORM_DEFAULT_VALUES } from '@/components/ui/forms/identification'
import { STEPS } from '@/components/ui/modal/modal'
import { checklistDetailShowModal, checklistDetailPrimaryIdUpdateData } from '@/actions/checklist-detail'
import {
  selectCheckListDetailContact,
  selectCheckListDetailPrimaryId,
  selectCheckListDetailIsSubmitting
} from '@/selectors/checklist-detail'
import { ContactIdentityDocumentModel, ContactModel } from '@reapit/types'
import { selectCheckListDetailPrimaryIdUrl } from '../../../selectors/checklist-detail'

export type PrimaryIdentiticationProps = DispatchProps & StateProps

export const PrimaryIdentification: React.FC<PrimaryIdentiticationProps> = ({
  contact,
  initFormValues,
  loading,
  updateIdentification,
  onNextHandler,
  onPrevHandler
}) => (
  <Identification
    loading={loading}
    initFormValues={initFormValues}
    contact={contact}
    onSaveHandler={updateIdentification}
    onNextHandler={onNextHandler}
    onPrevHandler={onPrevHandler}
  />
)

export type StateProps = {
  loading: boolean
  contact: ContactModel | null
  initFormValues: ContactIdentityDocumentModel
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  const isSubmitting = selectCheckListDetailIsSubmitting(state)
  const contact = selectCheckListDetailContact(state)
  const primaryIdDocument = selectCheckListDetailPrimaryId(state)
  const primaryIdUrl = selectCheckListDetailPrimaryIdUrl(state)

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES
  const DEFAULT_TYPE = ''
  if (primaryIdDocument) {
    const { typeId, expiry, details } = primaryIdDocument

    initFormValues = {
      typeId: typeId || DEFAULT_TYPE,
      expiry: expiry ? new Date(expiry) : '',
      details: details,
      fileUrl: primaryIdUrl
    } as ContactIdentityDocumentModel
  }

  return {
    loading: isSubmitting,
    contact,
    initFormValues
  }
}

export type DispatchProps = {
  updateIdentification: (formValues: ContactIdentityDocumentModel) => void
  onPrevHandler: () => void
  onNextHandler: (values: any) => () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateIdentification: (values: ContactIdentityDocumentModel) =>
    dispatch(checklistDetailPrimaryIdUpdateData({ identityChecks: values })),
  onPrevHandler: () => dispatch(checklistDetailShowModal(STEPS.PROFILE)),
  onNextHandler: (values: any) => () =>
    dispatch(
      dispatch(
        checklistDetailPrimaryIdUpdateData({ nextSection: STEPS.SECONDARY_IDENTIFICATION, identityChecks: values })
      )
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryIdentification)
