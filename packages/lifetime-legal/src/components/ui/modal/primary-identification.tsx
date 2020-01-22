import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ContactModel, ContactIdentityCheckModel } from '@reapit/foundations-ts-definitions'
import { ReduxState } from '@/types/core'
import Identification, {
  IdentificationFormValues,
  IDENTIFICATION_FORM_DEFAULT_VALUES,
} from '@/components/ui/forms/identification'
import { checkListDetailPrimaryIdUpdateData } from '@/actions/checklist-detail'
import {
  selectCheckListDetailContact,
  selectCheckListDetailPrimaryId,
  selectCheckListDetailIsSubmitting,
  selectCheckListDetailPrimaryIdUrl,
} from '@/selectors/checklist-detail'

export type PrimaryIdentificationProps = DispatchProps & {
  contactModel: ContactModel
  idCheck: ContactIdentityCheckModel
  initFormValues: any
  loading: boolean
}

export const PrimaryIdentification = ({
  contactModel,
  initFormValues,
  loading,
  updateIdentification,
}: PrimaryIdentificationProps) => (
  <Identification
    loading={loading}
    initFormValues={initFormValues}
    contactModel={contactModel}
    onSaveHandler={updateIdentification}
  />
)

export const mapStateToProps = (state: ReduxState) => {
  const isSubmitting = selectCheckListDetailIsSubmitting(state)
  const contactModel = selectCheckListDetailContact(state)
  const primaryIdDocument = selectCheckListDetailPrimaryId(state)
  const primaryIdUrl = selectCheckListDetailPrimaryIdUrl(state)

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES

  if (primaryIdDocument) {
    const { typeId, expiry, details } = primaryIdDocument

    initFormValues = {
      typeId: typeId || '',
      expiry: expiry ? new Date(expiry) : null,
      details: details,
      fileUrl: primaryIdUrl,
    } as IdentificationFormValues
  }

  return {
    loading: isSubmitting,
    contactModel,
    initFormValues,
  }
}

export type DispatchProps = {
  updateIdentification: (formValues: IdentificationFormValues) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateIdentification: (formValues: IdentificationFormValues) =>
    dispatch(checkListDetailPrimaryIdUpdateData(formValues)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryIdentification)
