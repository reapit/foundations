import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Identification, {
  IdentificationFormValues,
  IDENTIFICATION_FORM_DEFAULT_VALUES
} from '@/components/ui/forms/identification'
import { checkListDetailSecondaryIdUpdateData } from '@/actions/checklist-detail'
import { ReduxState } from '@/types/core'
import {
  selectCheckListDetailContact,
  selectCheckListDetailSecondaryId,
  selectCheckListDetailIsSubmitting
} from '@/selectors/checklist-detail'
import { IdentityDocumentModel } from '@/types/contact-api-schema'
import { oc } from 'ts-optchain'

export const SecondaryIdentification = ({
  contactModel,
  initFormValues,
  loading,
  updateIdentification,
  isDesktopMode
}) => (
  <Identification
    isDesktopMode={isDesktopMode}
    loading={loading}
    initFormValues={initFormValues}
    contactModel={contactModel}
    onSaveHandler={updateIdentification}
  />
)

export const mapStateToProps = (state: ReduxState) => {
  const isSubmitting = selectCheckListDetailIsSubmitting(state)
  const contactModel = selectCheckListDetailContact(state)
  const secondaryId = selectCheckListDetailSecondaryId(state) as IdentityDocumentModel
  const isDesktopMode = oc(state).auth.refreshSession.mode() === 'DESKTOP'

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES

  if (secondaryId) {
    const { typeId, expiry, details, fileUrl } = secondaryId

    initFormValues = {
      typeId: typeId,
      expiry: expiry ? new Date(expiry) : null,
      details: details,
      fileUrl: fileUrl
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
    dispatch(checkListDetailSecondaryIdUpdateData(formValues))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryIdentification)
