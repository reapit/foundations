import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { appDetailRequestData } from '@/actions/app-detail'
import { selectAppDetailState, selectAppDetailData, selectAppDetailLoading } from '@/selector/developer-app-detail'
import { selectLoginType } from '@/selector/auth'
import { LoginType } from '@reapit/cognito-auth'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import AppHeader from '@/components/ui/app-detail/app-header'
import AppContent from '@/components/ui/app-detail/app-content'

import { Loader } from '@reapit/elements'
import { AppDetailState } from '@/reducers/app-detail'
import styles from '@/styles/pages/developer-app-detail.scss?mod'

export type DeveloperAppDetailProps = {} & RouteComponentProps<{ id: string }>
export type MapState = {
  appDetailState: AppDetailState
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  isLoadingAppDetail: boolean
  loginType: LoginType
}

export const mapState = (useSelector): MapState => {
  return {
    appDetailState: useSelector(selectAppDetailState),
    appDetailData: useSelector(selectAppDetailData),
    isLoadingAppDetail: useSelector(selectAppDetailLoading),
    loginType: useSelector(selectLoginType),
  }
}

export const fetchDeveloperAppDetail = (dispatch: Dispatch<any>, appId: string) => {
  return () => {
    dispatch(
      appDetailRequestData({
        id: appId,
      }),
    )
  }
}

const DeveloperAppDetail: React.FC<DeveloperAppDetailProps> = props => {
  const dispatch = useDispatch()

  const {
    match: { params },
  } = props
  const { id: appId } = params
  const { appDetailState, appDetailData, isLoadingAppDetail, loginType } = mapState(useSelector)

  React.useEffect(fetchDeveloperAppDetail(dispatch, appId), [dispatch, appId])

  if (isLoadingAppDetail) {
    return <Loader />
  }

  return (
    <div className={styles.appDetailContainer}>
      <AppHeader appDetailState={appDetailState} />
      <AppContent appDetailData={appDetailData} loginType={loginType} />
    </div>
  )
}

export default DeveloperAppDetail
