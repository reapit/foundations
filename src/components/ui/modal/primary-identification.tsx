import * as React from 'react'
import { connect } from 'react-redux'
import Identification from '@/components/ui/forms/identification'
import { CreateIdentityDocumentModel } from '@/types/contact-api-schema'

export const PrimaryIdentification = ({ data, loading, updateIdentification, onNextHandler, onPrevHandler }) => (
  <Identification
    title="Primary ID"
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

export const mapDispatchToProps = () => ({
  updateIdentification: values => console.log(values)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimaryIdentification)
