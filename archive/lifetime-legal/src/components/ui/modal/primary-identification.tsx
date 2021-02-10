import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, compose } from 'redux'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import { ReduxState } from '@/types/core'
import Identification, {
  IdentificationFormValues,
  IDENTIFICATION_FORM_DEFAULT_VALUES,
} from '@/components/ui/forms/identification'
import { checkListDetailPrimaryIdUpdateData } from '@/actions/checklist-detail'
import { selectContact, selectPrimaryId, selectIsSubmitting } from '@/selectors/checklist-detail'

export type PrimaryIdentificationProps = DispatchProps & {
  contactModel: ContactModel
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
  const isSubmitting = selectIsSubmitting(state)
  const contactModel = selectContact(state)
  const primaryIdDocument = selectPrimaryId(state)

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES

  if (primaryIdDocument) {
    const { typeId, expiry, details, documentId } = primaryIdDocument

    initFormValues = {
      typeId: typeId || '',
      expiry: expiry ? new Date(expiry) : null,
      details: details || '',
      documentId: documentId || '',
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

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export default compose(withRedux)(PrimaryIdentification)
