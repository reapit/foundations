import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Identification from '@/components/ui/forms/identification'
import { IdentityCheckModel } from '@/types/contact-api-schema'
import { checkListDetailShowModal } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'
import { ReduxState } from '@/types/core'
import { selectCheckListDetailContact } from '@/selectors/checklist-detail'

export const SecondaryIdentification = ({ data, loading, updateIdentification, onNextHandler, onPrevHandler }) => (
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
  onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.PRIMARY_IDENTIFICATION)),
  onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.ADDRESS_INFORMATION))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryIdentification)
