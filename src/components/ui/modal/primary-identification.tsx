import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import Identification from '@/components/ui/forms/identification'
import { STEPS } from '@/components/ui/modal/modal'
import { checkListDetailShowModal } from '@/actions/checklist-detail'
import { selectCheckListDetailContact } from '@/selectors/checklist-detail'
import { IdentityCheckModel } from '@/types/contact-api-schema'

export const PrimaryIdentification = ({ data, loading, updateIdentification, onNextHandler, onPrevHandler }) => (
  <Identification
    loading={loading}
    data={data}
    onSaveHandler={updateIdentification}
    onNextHandler={onNextHandler}
    onPrevHandler={onPrevHandler}
  />
)

export const mapStateToProps = (state: ReduxState) => {
  const { isSubmitting } = state.checklistDetail
  const data = selectCheckListDetailContact(state)

  return {
    loading: isSubmitting,
    data
  }
}

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateIdentification: (values: IdentityCheckModel) => console.log({ values }),
  onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.PROFILE)),
  onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.SECONDARY_IDENTIFICATION))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryIdentification)
