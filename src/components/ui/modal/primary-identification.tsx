import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import Identification, { IdentificationFormValues } from '@/components/ui/forms/identification'
import { checkListDetailPrimaryIdUpdateData } from '@/actions/checklist-detail'
import { selectCheckListDetailContact, selectCheckListDetailPrimaryId } from '@/selectors/checklist-detail'
import { IdentityDocumentModel } from '@/types/contact-api-schema'

export const PrimaryIdentification = ({ contactModel, initFormValues, loading, updateIdentification }) => (
  <Identification
    loading={loading}
    initFormValues={initFormValues}
    contactModel={contactModel}
    onSaveHandler={updateIdentification}
  />
)

export const mapStateToProps = (state: ReduxState) => {
  const { isSubmitting } = state.checklistDetail
  const contactModel = selectCheckListDetailContact(state)
  const primaryId = selectCheckListDetailPrimaryId(state) as IdentityDocumentModel

  const initFormValues = {
    typeId: primaryId.typeId,
    expiry: primaryId.expiry ? new Date(primaryId.expiry) : null,
    details: primaryId.details,
    fileUrl: primaryId.fileUrl
  } as IdentificationFormValues

  return {
    loading: isSubmitting,
    contactModel,
    initFormValues
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
