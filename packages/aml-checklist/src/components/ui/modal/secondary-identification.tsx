import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Identification, {
  IDENTIFICATION_FORM_DEFAULT_VALUES,
  IdentityDocumentForm,
} from '@/components/ui/forms/identification'
import { checklistDetailShowModal, checklistDetailSecondaryIdUpdateData } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'
import { ReduxState } from '@/types/core'
import {
  selectCheckListDetailContact,
  selectCheckListDetailSecondaryId,
  selectCheckListDetailIsSubmitting,
  selectCheckListDetailIdCheck,
} from '@/selectors/checklist-detail'
import { IdentityDocumentModel, ContactModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'
import { isCompletedPrimaryID } from '@reapit/elements-legacy'
import dayjs from 'dayjs'

export const SecondaryIdentification = ({
  contact,
  idCheck,
  initFormValues,
  loading,
  updateIdentification,
  onNextHandler,
  onPrevHandler,
}) => {
  const isDisabled = !isCompletedPrimaryID(idCheck)
  return (
    <Identification
      loading={loading}
      initFormValues={initFormValues}
      contact={contact}
      onSaveHandler={updateIdentification}
      onNextHandler={onNextHandler}
      onPrevHandler={onPrevHandler}
      disabled={isDisabled}
    />
  )
}

export type StateProps = {
  loading: boolean
  contact: ContactModel | null
  initFormValues: IdentityDocumentModel
  idCheck: IdentityCheckModel | null
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  const isSubmitting = selectCheckListDetailIsSubmitting(state)
  const contact = selectCheckListDetailContact(state)
  const secondaryIdDocument = selectCheckListDetailSecondaryId(state)
  const idCheck = selectCheckListDetailIdCheck(state)

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES
  const DEFAULT_TYPE = ''

  if (secondaryIdDocument) {
    const { typeId, expiry, details, documentId } = secondaryIdDocument

    initFormValues = {
      typeId: typeId || DEFAULT_TYPE,
      expiry: expiry ? dayjs(expiry).format('YYYY-MM-DD') : '',
      details: details || '',
      documentId: documentId || '',
    } as IdentityDocumentForm
  }

  return {
    loading: isSubmitting,
    contact,
    idCheck,
    initFormValues,
  }
}

export type DispatchProps = {
  updateIdentification: (formValues: IdentityDocumentForm) => void
  onPrevHandler: () => void
  onNextHandler: (values: any) => () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateIdentification: (values: IdentityDocumentForm) =>
    dispatch(checklistDetailSecondaryIdUpdateData({ identityChecks: values })),
  onPrevHandler: () => dispatch(checklistDetailShowModal(STEPS.PRIMARY_IDENTIFICATION)),
  onNextHandler: (values: any) => () =>
    dispatch(
      dispatch(
        checklistDetailSecondaryIdUpdateData({ nextSection: STEPS.ADDRESS_INFORMATION, identityChecks: values }),
      ),
    ),
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryIdentification)
