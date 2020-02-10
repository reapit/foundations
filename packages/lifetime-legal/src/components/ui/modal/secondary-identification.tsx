import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, compose } from 'redux'
import { ContactModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'
import Identification, {
  IdentificationFormValues,
  IDENTIFICATION_FORM_DEFAULT_VALUES,
} from '@/components/ui/forms/identification'
import { checkListDetailSecondaryIdUpdateData } from '@/actions/checklist-detail'
import { ReduxState } from '@/types/core'
import { selectContact, selectSecondaryId, selectIsSubmitting, selectIdentityCheck } from '@/selectors/checklist-detail'
import { isCompletedPrimaryID } from '@reapit/elements'

export type SecondaryIdentificationProps = DispatchProps & {
  contactModel: ContactModel
  identityCheck: IdentityCheckModel
  initFormValues: any
  loading: boolean
}

export const SecondaryIdentification: React.FC<SecondaryIdentificationProps> = ({
  contactModel,
  identityCheck,
  initFormValues,
  loading,
  updateIdentification,
}: SecondaryIdentificationProps) => {
  const isDisabled = !isCompletedPrimaryID(identityCheck)
  return (
    <Identification
      loading={loading}
      initFormValues={initFormValues}
      contactModel={contactModel}
      onSaveHandler={updateIdentification}
      disabled={isDisabled}
    />
  )
}

export const mapStateToProps = (state: ReduxState) => {
  const isSubmitting = selectIsSubmitting(state)
  const contactModel = selectContact(state)
  const secondaryIdDocument = selectSecondaryId(state)
  const identityCheck = selectIdentityCheck(state)

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES

  if (secondaryIdDocument) {
    const { typeId, expiry, details, documentId } = secondaryIdDocument

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
    identityCheck,
    initFormValues,
  }
}

export type DispatchProps = {
  updateIdentification: (formValues: IdentificationFormValues) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateIdentification: (formValues: IdentificationFormValues) =>
    dispatch(checkListDetailSecondaryIdUpdateData(formValues)),
})

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export default compose(withRedux)(SecondaryIdentification)
