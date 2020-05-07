import * as React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { selectAppDetailData, selectAppDetailLoading } from '@/selector/developer-app-detail'
import { selectClientId } from '@/selector/client'
import { selectLoginType } from '@/selector/auth'
import { LoginType } from '@reapit/cognito-auth'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import AppHeader from '@/components/ui/app-detail/app-header'
import AppContent from '@/components/ui/app-detail/app-content'

import { Loader, Button } from '@reapit/elements'
import styles from '@/styles/pages/developer-app-detail.scss?mod'
import Routes from '@/constants/routes'
import ClientAppDetailButtonGroup from '@/components/ui/client-app-detail/client-app-detail-button-group'

export type ClientAppDetailProps = {}
export type MapState = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  isLoadingAppDetail: boolean
  loginType: LoginType
  clientId: string
}

export const mapState = (useSelector): MapState => {
  return {
    appDetailData: useSelector(selectAppDetailData),
    isLoadingAppDetail: useSelector(selectAppDetailLoading),
    loginType: useSelector(selectLoginType),
    clientId: useSelector(selectClientId),
  }
}

const ClientAppDetail: React.FC<ClientAppDetailProps> = () => {
  const match = useRouteMatch()
  const { path } = match
  const { appDetailData, isLoadingAppDetail, loginType } = mapState(useSelector)

  if (!appDetailData.id || isLoadingAppDetail) {
    return <Loader />
  }

  return (
    <div className={styles.appDetailContainer}>
      <AppHeader
        appDetailData={appDetailData}
        buttonGroup={<ClientAppDetailButtonGroup appDetailData={appDetailData} />}
      />
      <AppContent appDetailData={appDetailData} loginType={loginType} />
    </div>
  )
}

export default ClientAppDetail
