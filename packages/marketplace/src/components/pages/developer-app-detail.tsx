import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, RouteComponentProps } from 'react-router'
import { appDetailRequestData, removeAuthenticationCode } from '@/actions/app-detail'
import { selectAppDetailState, selectAppDetailData, selectAppDetailLoading } from '@/selector/developer-app-detail'
import { selectLoginType } from '@/selector/auth'
import { LoginType } from '@reapit/cognito-auth'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import AppHeader from '../ui/developer-app-detail/app-header'
import AppContent from '../ui/developer-app-detail/app-content'
import AppDelete from '@/components/ui/app-delete'
import AppInstallations from '@/components/ui/app-installations/app-installations-modal'
import DeveloperAppRevisionModal from '@/components/ui/developer-app-revision-modal'

import { Loader } from '@reapit/elements'
import routes from '@/constants/routes'
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

export const handleEditDetailButtonClick = (history, dispatch: Dispatch<any>, id?: string) => {
  return () => {
    if (id) {
      dispatch(removeAuthenticationCode())
      history.push(`${routes.DEVELOPER_MY_APPS}/${id}/edit`)
    }
  }
}

export const handlenDeleteAppButtonClick = (setIsDeleteModalOpen: (isModalOpen: boolean) => void) => {
  return () => {
    setIsDeleteModalOpen(true)
  }
}

export const handlePendingRevisionButtonClick = (
  setIsAppRevisionComparisionModalOpen: (isModalOpen: boolean) => void,
) => {
  return () => {
    setIsAppRevisionComparisionModalOpen(true)
  }
}

export const handleInstallationButtonClick = (setIsInstallationsModalOpen: (isModalOpen: boolean) => void) => {
  return () => {
    setIsInstallationsModalOpen(true)
  }
}

const DeveloperAppDetail: React.FC<DeveloperAppDetailProps> = props => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isInstallationsModalOpen, setIsInstallationsModalOpen] = React.useState(false)
  const [isAppRevisionComparisionModalOpen, setIsAppRevisionComparisionModalOpen] = React.useState(false)

  const {
    match: { params },
  } = props
  const { id: appId } = params
  const { appDetailState, appDetailData, isLoadingAppDetail, loginType } = mapState(useSelector)

  React.useEffect(fetchDeveloperAppDetail(dispatch, appId), [dispatch, appId])

  const onInstallationButtonClick = React.useCallback(handleInstallationButtonClick(setIsInstallationsModalOpen), [])
  const onPendingRevisionButtonClick = React.useCallback(
    handlePendingRevisionButtonClick(setIsAppRevisionComparisionModalOpen),
    [],
  )
  const onEditDetailButtonClick = React.useCallback(
    handleEditDetailButtonClick(history, dispatch, appDetailData.id),
    [],
  )
  const onDeleteAppButtonClick = React.useCallback(handlenDeleteAppButtonClick(setIsDeleteModalOpen), [])

  if (isLoadingAppDetail) {
    return <Loader />
  }

  return (
    <div className={styles.appDetailContainer}>
      <AppHeader
        appDetailState={appDetailState}
        onInstallationButtonClick={onInstallationButtonClick}
        onPendingRevisionButtonClick={onPendingRevisionButtonClick}
        onEditDetailButtonClick={onEditDetailButtonClick}
        onDeleteAppButtonClick={onDeleteAppButtonClick}
      />
      <AppContent appDetailData={appDetailData} loginType={loginType} />

      <AppDelete
        appId={appDetailData.id || ''}
        appName={appDetailData.name || ''}
        afterClose={() => setIsDeleteModalOpen(false)}
        visible={isDeleteModalOpen}
        onDeleteSuccess={() => {
          setIsDeleteModalOpen(false)
        }}
      />

      <AppInstallations
        appId={appDetailData.id || ''}
        appName={appDetailData.name || ''}
        visible={isInstallationsModalOpen}
        afterClose={() => setIsInstallationsModalOpen(false)}
        onUninstallSuccess={() => {
          setIsInstallationsModalOpen(false)
        }}
      />

      <DeveloperAppRevisionModal
        visible={isAppRevisionComparisionModalOpen}
        appId={appDetailData.id || ''}
        appDetailState={appDetailState}
        afterClose={() => setIsAppRevisionComparisionModalOpen(false)}
      />
    </div>
  )
}

export default DeveloperAppDetail
