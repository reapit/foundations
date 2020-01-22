import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ContactModel, ContactIdentityCheckModel } from '@reapit/foundations-ts-definitions'
import Identification, {
  IdentificationFormValues,
  IDENTIFICATION_FORM_DEFAULT_VALUES,
} from '@/components/ui/forms/identification'
import { checkListDetailSecondaryIdUpdateData } from '@/actions/checklist-detail'
import { ReduxState } from '@/types/core'
import {
  selectCheckListDetailContact,
  selectCheckListDetailSecondaryId,
  selectCheckListDetailIsSubmitting,
  selectCheckListDetailSecondaryIdUrl,
  selectCheckListDetailIdCheck,
} from '@/selectors/checklist-detail'
import { isCompletedPrimaryID } from '@reapit/elements'

export type SecondaryIdentificationProps = DispatchProps & {
  contactModel: ContactModel
  idCheck: ContactIdentityCheckModel
  initFormValues: any
  loading: boolean
}

export const SecondaryIdentification: React.FC<SecondaryIdentificationProps> = ({
  contactModel,
  idCheck,
  initFormValues,
  loading,
  updateIdentification,
}: SecondaryIdentificationProps) => {
  const isDisabled = !isCompletedPrimaryID(idCheck)
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
  const isSubmitting = selectCheckListDetailIsSubmitting(state)
  const contactModel = selectCheckListDetailContact(state)
  const secondaryIdDocument = selectCheckListDetailSecondaryId(state)
  const secondaryIdUrl = selectCheckListDetailSecondaryIdUrl(state)
  const idCheck = selectCheckListDetailIdCheck(state)

  let initFormValues = IDENTIFICATION_FORM_DEFAULT_VALUES

  if (secondaryIdDocument) {
    const { typeId, expiry, details } = secondaryIdDocument

    initFormValues = {
      typeId: typeId || '',
      expiry: expiry ? new Date(expiry) : undefined,
      details: details,
      fileUrl: secondaryIdUrl,
    } as IdentificationFormValues
  }

  return {
    loading: isSubmitting,
    contactModel,
    idCheck,
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

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryIdentification)
