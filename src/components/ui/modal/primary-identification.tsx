import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import Identification, {
  IdentificationFormValues,
  IDENTIFICATION_FORM_DEFAULT_VALUES
} from '@/components/ui/forms/identification'
import { checkListDetailPrimaryIdUpdateData } from '@/actions/checklist-detail'
import {
  selectCheckListDetailContact,
  selectCheckListDetailPrimaryId,
  selectCheckListDetailIsSubmitting
} from '@/selectors/checklist-detail'
import { IdentityDocumentModel } from '@/types/contact-api-schema'
import { oc } from 'ts-optchain'

export const PrimaryIdentification = ({
  contactModel,
  initFormValues,
  loading,
  updateIdentification,
  isDesktopMode
}) => (
  <Identification
    loading={loading}
    initFormValues={initFormValues}
    contactModel={contactModel}
    onSaveHandler={updateIdentification}
    isDesktopMode={isDesktopMode}
  />
)

export const mapStateToProps = (state: ReduxState) => {
  const isSubmitting = selectCheckListDetailIsSubmitting(state)
  const contactModel = selectCheckListDetailContact(state)
  const primaryId = selectCheckListDetailPrimaryId(state) as IdentityDocumentModel
  const isDesktopMode = oc(state).auth.refreshSession.mode() === 'DESKTOP'

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES
  const DEFAULT_TYPE = ''
  if (primaryId) {
    initFormValues = {
      typeId: primaryId.typeId || DEFAULT_TYPE,
      expiry: primaryId.expiry ? new Date(primaryId.expiry) : null,
      details: primaryId.details,
      fileUrl: primaryId.fileUrl
    } as IdentificationFormValues
  }

  return {
    loading: isSubmitting,
    contactModel,
    initFormValues,
    isDesktopMode
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateIdentification: (formValues: IdentificationFormValues) =>
    dispatch(checkListDetailPrimaryIdUpdateData(formValues))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryIdentification)
