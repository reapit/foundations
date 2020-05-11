import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectAppDetailState, selectAppDetailData, selectAppDetailLoading } from '@/selector/developer-app-detail'
import { selectLoginType } from '@/selector/auth'
import AppHeader from '@/components/ui/app-detail/app-header'
import AppContent from '@/components/ui/app-detail/app-content'
import DeveloperAppDetailButtonGroup from '@/components/ui/developer-app-detail/developer-app-detail-button-group'

import { Loader } from '@reapit/elements'
import styles from '@/styles/pages/developer-app-detail.scss?mod'

export type DeveloperAppDetailProps = {}

const DeveloperAppDetail: React.FC<DeveloperAppDetailProps> = () => {
  const appDetailState = useSelector(selectAppDetailState)
  const appDetailData = useSelector(selectAppDetailData)
  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const loginType = useSelector(selectLoginType)

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
