import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectAppDetailState, selectAppDetailData, selectAppDetailLoading } from '@/selector/developer-app-detail'
import { selectLoginType } from '@/selector/auth'
import { LoginType } from '@reapit/cognito-auth'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import AppHeader from '@/components/ui/app-detail/app-header'
import AppContent from '@/components/ui/app-detail/app-content'
import DeveloperAppDetailButtonGroup from '@/components/ui/developer-app-detail/developer-app-detail-button-group'

import { Loader } from '@reapit/elements'
import { AppDetailState } from '@/reducers/app-detail'
import styles from '@/styles/pages/developer-app-detail.scss?mod'

export type DeveloperAppDetailProps = {}
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

const DeveloperAppDetail: React.FC<DeveloperAppDetailProps> = () => {
  const { appDetailState, appDetailData, isLoadingAppDetail, loginType } = mapState(useSelector)

  if (!appDetailData.id || isLoadingAppDetail) {
    return <Loader />
  }

  return (
    <div className={styles.appDetailContainer}>
      <AppHeader
        appDetailData={appDetailData}
        buttonGroup={<DeveloperAppDetailButtonGroup appDetailState={appDetailState} />}
      />
      <AppContent appDetailData={appDetailData} loginType={loginType} />
    </div>
  )
}

export default DeveloperAppDetail
