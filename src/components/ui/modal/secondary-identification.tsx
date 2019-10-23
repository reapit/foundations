import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Identification, { IDENTIFICATION_FORM_DEFAULT_VALUES } from '@/components/ui/forms/identification'
import { checklistDetailShowModal, checklistDetailSecondaryIdUpdateData } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'
import { ReduxState } from '@/types/core'
import {
  selectCheckListDetailContact,
  selectCheckListDetailSecondaryId,
  selectCheckListDetailIsSubmitting,
  selectCheckListDetailSecondaryIdUrl,
  selectCheckListDetailIdCheck
} from '@/selectors/checklist-detail'
import { IdentityDocumentModel, ContactModel, IdentityCheckModel } from '@/types/contact-api-schema'
import { checkIsDesktopMode } from '@/selectors/auth'
import { isCompletedPrimaryID } from '@reapit/elements'

export const SecondaryIdentification = ({
  contact,
  idCheck,
  initFormValues,
  loading,
  updateIdentification,
  onNextHandler,
  onPrevHandler,
  isDesktopMode
}) => {
  const isDisabled = !isCompletedPrimaryID(idCheck)
  return (
    <Identification
      isDesktopMode={isDesktopMode}
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
  isDesktopMode: boolean
  idCheck: IdentityCheckModel | null
}

export const mapStateToProps = (state: ReduxState): StateProps => {
  const isSubmitting = selectCheckListDetailIsSubmitting(state)
  const contact = selectCheckListDetailContact(state)
  const secondaryIdDocument = selectCheckListDetailSecondaryId(state)
  const secondaryIdUrl = selectCheckListDetailSecondaryIdUrl(state)
  const isDesktopMode = checkIsDesktopMode(state)
  const idCheck = selectCheckListDetailIdCheck(state)

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES
  const DEFAULT_TYPE = ''

  if (secondaryIdDocument) {
    const { typeId, expiry, details } = secondaryIdDocument

    initFormValues = {
      typeId: typeId || DEFAULT_TYPE,
      expiry: expiry ? new Date(expiry) : undefined,
      details: details,
      fileUrl: secondaryIdUrl
    } as IdentityDocumentModel
  }

  return {
    loading: isSubmitting,
    contact,
    idCheck,
    initFormValues,
    isDesktopMode
  }
}

export type DispatchProps = {
  updateIdentification: (formValues: IdentityDocumentModel) => void
  onPrevHandler: () => void
  onNextHandler: (values: any) => () => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateIdentification: (values: IdentityDocumentModel) =>
    dispatch(checklistDetailSecondaryIdUpdateData({ identityChecks: values })),
  onPrevHandler: () => dispatch(checklistDetailShowModal(STEPS.PRIMARY_IDENTIFICATION)),
  onNextHandler: (values: any) => () =>
    dispatch(
      dispatch(checklistDetailSecondaryIdUpdateData({ nextSection: STEPS.ADDRESS_INFORMATION, identityChecks: values }))
    )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryIdentification)
