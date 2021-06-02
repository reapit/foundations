import * as React from 'react'
import { Alert, ModalBody } from '@reapit/elements'
import { Loader } from '@reapit/elements/v3'

export interface AsyncContainerProps {
  loading: boolean
  error: boolean
  data: any
}

const AsyncContainer: React.FunctionComponent<AsyncContainerProps> = ({ loading, error, data, children }) => {
  if (loading) {
    return <ModalBody body={<Loader label="Loading" />} />
  }

  if (error) {
    return <ModalBody body={<Alert type="danger" message="Failed to fetch. Please try later." />} />
  }

  if (!data) {
    return <ModalBody body={<Alert type="danger" message="No data" />} />
  }

  return <>{children}</>
}

export default AsyncContainer
