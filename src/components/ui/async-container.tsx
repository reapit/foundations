import * as React from 'react'
import Loader from '@/components/ui/loader'
import Alert from '@/components/ui/alert'

export interface AsyncContainerProps {
  loading: boolean
  error: boolean
  data: any
}

const AsyncContainer: React.FunctionComponent<AsyncContainerProps> = ({ loading, error, data, children }) => {
  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Alert type="danger" message="Failed to fetch. Please try later." />
  }

  if (!data) {
    return <Alert type="danger" message="No data" />
  }

  return <>{children}</>
}

export default AsyncContainer
