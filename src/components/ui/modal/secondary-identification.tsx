import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Identification, { IDENTIFICATION_FORM_DEFAULT_VALUES } from '@/components/ui/forms/identification'
import { checkListDetailShowModal, checkListDetailSecondaryIdUpdateData } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'
import { ReduxState } from '@/types/core'
import {
  selectCheckListDetailContact,
  selectCheckListDetailSecondaryId,
  selectCheckListDetailIsSubmitting,
  selectCheckListDetailSecondaryIdUrl
} from '@/selectors/checklist-detail'
import { IdentityDocumentModel } from '@/types/contact-api-schema'
import { checkIsDesktopMode } from '@/selectors/auth'

export const SecondaryIdentification = ({
  contactModel,
  initFormValues,
  loading,
  updateIdentification,
  onNextHandler,
  onPrevHandler,
  isDesktopMode
}) => (
  <Identification
    isDesktopMode={isDesktopMode}
    loading={loading}
    initFormValues={initFormValues}
    contactModel={contactModel}
    onSaveHandler={updateIdentification}
    onNextHandler={onNextHandler}
    onPrevHandler={onPrevHandler}
  />
)

export const mapStateToProps = (state: ReduxState) => {
  const isSubmitting = selectCheckListDetailIsSubmitting(state)
  const contactModel = selectCheckListDetailContact(state)
  const secondaryIdDocument = selectCheckListDetailSecondaryId(state)
  const secondaryIdUrl = selectCheckListDetailSecondaryIdUrl(state)
  const isDesktopMode = checkIsDesktopMode(state)

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
    contactModel,
    initFormValues,
    isDesktopMode
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateIdentification: (formValues: IdentityDocumentModel) =>
    dispatch(checkListDetailSecondaryIdUpdateData(formValues)),
  onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.PRIMARY_IDENTIFICATION)),
  onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.ADDRESS_INFORMATION))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryIdentification)
