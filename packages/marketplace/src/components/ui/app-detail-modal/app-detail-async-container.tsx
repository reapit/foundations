import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import AsyncContainer from '@/components/ui/async-container'

export const mapStateToProps = (state: ReduxState) => {
  const { loading, error, appDetailData } = state.appDetail

  return {
    loading,
    error,
    data: appDetailData
  }
}

const DetailAsyncContainer = connect(mapStateToProps)(AsyncContainer)

export default DetailAsyncContainer
