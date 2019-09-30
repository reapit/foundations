import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Identification from '@/components/ui/forms/identification'
import { CreateIdentityDocumentModel } from '@/types/contact-api-schema'
import { STEPS } from '@/components/ui/modal/modal'
import { checkListDetailShowModal } from '@/actions/checklist-detail'

export const PrimaryIdentification = ({ data, loading, updateIdentification, onNextHandler, onPrevHandler }) => (
  <Identification
    loading={loading}
    data={data}
    onSaveHandler={updateIdentification}
    onNextHandler={onNextHandler}
    onPrevHandler={onPrevHandler}
  />
)

export const mapStateToProps = () => ({
  loading: false,
  data: {} as CreateIdentityDocumentModel
})

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateIdentification: (values: any) => console.log(values),
  onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.PROFILE)),
  onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.SECONDARY_IDENTIFICATION))
})

export const PrimaryIdentificationWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryIdentification)

PrimaryIdentificationWithRedux.displayName = 'PrimaryIdentificationWithRedux'

export default PrimaryIdentificationWithRedux
