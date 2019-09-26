import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Identification from '@/components/ui/forms/identification'
import { CreateIdentityDocumentModel } from '@/types/contact-api-schema'
import { checkListDetailShowModal } from '@/actions/checklist-detail'
import { STEPS } from '@/components/ui/modal/modal'

export const SecondaryIdentification = ({ data, loading, updateIdentification, onNextHandler, onPrevHandler }) => (
  <Identification
    title="Secondary ID"
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
  onPrevHandler: () => dispatch(checkListDetailShowModal(STEPS.PRIMARY_IDENTIFICATION)),
  onNextHandler: () => dispatch(checkListDetailShowModal(STEPS.ADDRESS_INFORMATION))
})

export const SecondaryIdentificationWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryIdentification)
SecondaryIdentificationWithRedux.displayName = 'SecondaryIdentificationWithRedux'

export default SecondaryIdentificationWithRedux
