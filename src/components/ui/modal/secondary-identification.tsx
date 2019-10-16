import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Identification, { IdentificationFormValues } from '@/components/ui/forms/identification'
import { checkListDetailSecondaryIdUpdateData } from '@/actions/checklist-detail'
import { ReduxState } from '@/types/core'
import { selectCheckListDetailContact, selectCheckListDetailSecondaryId } from '@/selectors/checklist-detail'
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
  const { isSubmitting } = state.checklistDetail
  const contactModel = selectCheckListDetailContact(state)
  const secondaryId = selectCheckListDetailSecondaryId(state)
  const isDesktopMode = oc(state).auth.refreshSession.mode() === 'DESKTOP'

  const initFormValues = {
    typeId: secondaryId.typeId,
    expiry: secondaryId.expiry ? new Date(secondaryId.expiry) : null,
    details: secondaryId.details,
    fileUrl: secondaryId.fileUrl
  } as IdentificationFormValues

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
