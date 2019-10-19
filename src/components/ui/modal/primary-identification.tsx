import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import Identification, { IDENTIFICATION_FORM_DEFAULT_VALUES } from '@/components/ui/forms/identification'
import { STEPS } from '@/components/ui/modal/modal'
import { checkListDetailShowModal, checkListDetailPrimaryIdUpdateData } from '@/actions/checklist-detail'
import {
  selectCheckListDetailContact,
  selectCheckListDetailPrimaryId,
  selectCheckListDetailIsSubmitting
} from '@/selectors/checklist-detail'
import { checkIsDesktopMode } from '@/selectors/auth'
import { IdentityDocumentModel } from '@/types/contact-api-schema'
import { selectCheckListDetailPrimaryIdUrl } from '../../../selectors/checklist-detail'

export const PrimaryIdentification = ({
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
  const primaryIdDocument = selectCheckListDetailPrimaryId(state)
  const primaryIdUrl = selectCheckListDetailPrimaryIdUrl(state)

  const isDesktopMode = checkIsDesktopMode(state)

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES
  const DEFAULT_TYPE = ''
  if (primaryIdDocument) {
    const { typeId, expiry, details } = primaryIdDocument

    initFormValues = {
      typeId: typeId || DEFAULT_TYPE,
      expiry: expiry ? new Date(expiry) : undefined,
      details: details,
      fileUrl: primaryIdUrl
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
  updateIdentification: (formValues: IdentityDocumentModel) => dispatch(checkListDetailPrimaryIdUpdateData(formValues)),
  onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.PROFILE)),
  onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.SECONDARY_IDENTIFICATION))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryIdentification)
