import * as React from 'react'
import routes from '@/constants/routes'
import dayjs from 'dayjs'
import { Dispatch } from 'redux'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { appInstallationsRequestData } from '@/actions/app-installations'
import { Button, DATE_TIME_FORMAT, Section } from '@reapit/elements'
import ConfirmUninstall from './app-uninstall-modal/confirm-uninstall'
import { handleUninstall, handleAfterClose } from './app-uninstall-modal/app-uninstall-modal'
import { PagedResultInstallationModel_, InstallationModel, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { useSelector, useDispatch } from 'react-redux'
import { selectInstallationAppData } from '@/selector/installations'
import { Modal } from '@reapit/elements'
import { DeveloperAppDetailState } from '@/reducers/developer'
import {
  ListingPreviewSection,
  AuthenticationSection,
  SummarySection,
  InstallationsTableSection,
  PermissionsSection,
} from './app-sections'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getDeveloperIdFromConnectSession } from '@/utils/session'

export type AppContentProps = {
  appDetailState: DeveloperAppDetailState
}

export type CustomUninstallCell = React.FC<{ onClick: () => void }>

interface HandleUninstallSuccessParams {
  handleAfterClose: any
  setUninstallApp: React.Dispatch<React.SetStateAction<InstallationModel | undefined>>
  developerId: string
  appId: string
  dispatch: Dispatch
}

export const handleUninstallSuccess = ({
  handleAfterClose,
  setUninstallApp,
  developerId,
  appId,
  dispatch,
}: HandleUninstallSuccessParams) => () => {
  handleAfterClose({ setUninstallApp })
  dispatch(
    appInstallationsRequestData({
      appId: [appId],
      pageNumber: 1,
      pageSize: GET_ALL_PAGE_SIZE,
      isInstalled: true,
      developerId: [developerId],
    }),
  )
}

export const handleOpenAppPreview = (appId: string, appDetailState: AppDetailModel) => () => {
  const url = routes.APP_PREVIEW.replace(':appId', appId)
  localStorage.setItem('developer-preview-app', JSON.stringify(appDetailState))
  window.open(url, '_blank')
}

export const CustomUninstallCell: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <a onClick={onClick}>Uninstall</a>
)

export const generateInstallationTableColumns = (
  onUninstall: (app: InstallationModel) => () => void,
  CustomUninstallCell?: CustomUninstallCell,
) => () => {
  const UninstallCell = ({ row }) => {
    if (CustomUninstallCell) {
      return <CustomUninstallCell onClick={onUninstall(row.original)} />
    }

    return (
      <Button type="button" variant="primary" onClick={onUninstall(row.original)}>
        Uninstall
      </Button>
    )
  }

  return [
    {
      Header: 'Client',
      accessor: 'client',
    },
    {
      Header: 'Date Installed',
      accessor: d => dayjs(d.created).format(DATE_TIME_FORMAT.DATE_FORMAT),
    },
    {
      Header: 'Uninstall',
      Cell: UninstallCell,
    },
  ]
}

const AppContent: React.FC<AppContentProps> = ({ appDetailState }) => {
  const appDetailData = appDetailState.data || {}
  const { summary = '', authFlow = '', externalId = '', id = '', name = '', scopes = [] } = appDetailData
  const installationsData = useSelector(selectInstallationAppData) as PagedResultInstallationModel_
  const { data = [] } = installationsData
  const dispatch = useDispatch()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = getDeveloperIdFromConnectSession(connectSession)

  const [uninstallApp, setUninstallApp] = React.useState<InstallationModel>()
  const installationTableColumns = generateInstallationTableColumns(
    handleUninstall(setUninstallApp),
    CustomUninstallCell,
  )()
  const isVisibleUninstallModal = Boolean(uninstallApp)

  return (
    <Section isFlex isFlexColumn hasPadding={false} hasMargin={false}>
      {isVisibleUninstallModal && (
        <Modal renderChildren visible={isVisibleUninstallModal} afterClose={handleAfterClose({ setUninstallApp })}>
          <ConfirmUninstall
            isSetAppDetailStaleAfterUninstallSuccess={false}
            appName={name}
            installationDetail={uninstallApp}
            afterClose={handleAfterClose({ setUninstallApp })}
            onUninstallSuccess={handleUninstallSuccess({
              handleAfterClose,
              setUninstallApp,
              developerId,
              appId: id,
              dispatch,
            })}
          />
        </Modal>
      )}
      <SummarySection summary={summary} />
      <ListingPreviewSection onClick={handleOpenAppPreview(id, appDetailData)} />
      <AuthenticationSection id={id} authFlow={authFlow} externalId={externalId} />
      <PermissionsSection permissions={scopes} />
      <InstallationsTableSection columns={installationTableColumns} data={data} />
    </Section>
  )
}

export default AppContent
