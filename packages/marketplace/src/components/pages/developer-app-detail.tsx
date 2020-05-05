import * as React from 'react'
import { Dispatch } from 'redux'
import { ReduxState } from '@/types/core'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { appDetailRequestData } from '@/actions/app-detail'
import { selectAppDetailData, selectAppDetailLoading } from '@/selector/developer-app-detail'
import { selectLoginType } from '@/selector/auth'
import { LoginType } from '@reapit/cognito-auth'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import AppHeader from '../ui/developer-app-detail/app-header'
import AppContent from '../ui/developer-app-detail/app-content'
import { Loader } from '@reapit/elements'
import styles from '@/styles/pages/developer-app-detail.scss?mod'

export type DeveloperAppDetailProps = {} & RouteComponentProps<{ id: string }>
export type MapState = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  isLoadingAppDetail: boolean
  loginType: LoginType
}

export const mapState = (state: ReduxState): MapState => {
  return {
    appDetailData: selectAppDetailData(state),
    isLoadingAppDetail: selectAppDetailLoading(state),
    loginType: selectLoginType(state),
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
  React.useEffect(fetchDeveloperAppDetail(dispatch, appId), [dispatch, appId])
  const { appDetailData, isLoadingAppDetail, loginType } = useSelector(mapState)
  const { developer, media, name } = appDetailData
  const appIcon = media?.filter(({ type }) => type === 'icon')[0]

  if (isLoadingAppDetail) {
    return <Loader />
  }

  return (
    <div className={styles.appDetailContainer}>
      <AppHeader appIcon={appIcon} appName={name} developer={developer} />
      <AppContent appDetailData={appDetailData} loginType={loginType} />
    </div>
  )
}

export default DeveloperAppDetail
