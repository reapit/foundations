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
  selectCheckListDetailIsSubmitting,
  selectCheckListDetailPrimaryIdUrl
} from '@/selectors/checklist-detail'
import { checkIsDesktopMode } from '@/selectors/auth'

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
  const primaryIdDocument = selectCheckListDetailPrimaryId(state)
  const primaryIdUrl = selectCheckListDetailPrimaryIdUrl(state)

  const isDesktopMode = checkIsDesktopMode(state)

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES

  if (primaryIdDocument) {
    const { typeId, expiry, details } = primaryIdDocument

    initFormValues = {
      typeId: typeId || '',
      expiry: expiry ? new Date(expiry) : null,
      details: details,
      fileUrl: primaryIdUrl
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
