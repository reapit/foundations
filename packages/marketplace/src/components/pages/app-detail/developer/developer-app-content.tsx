import * as React from 'react'
import { Dispatch } from 'redux'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { appInstallationsRequestData } from '@/actions/app-installations'
import { selectDeveloperId } from '@/selector'
import { FlexContainerBasic } from '@reapit/elements'
import ConfirmUninstall from '@/components/ui/app-installations/confirm-uninstall'
import { PagedResultInstallationModel_, InstallationModel } from '@reapit/foundations-ts-definitions'
import { handleUninstall, handleAfterClose } from '@/components/ui/app-installations/app-installations-modal'
import { useSelector, useDispatch } from 'react-redux'
import { selectInstallationAppData } from '@/selector/installations'
import { Modal } from '@reapit/elements'
import { generateColumns } from '@/components/ui/app-installations/installations'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { DeveloperAppDetailState } from '@/reducers/developer'
import {
  ListingPreviewSection,
  AuthenticationSection,
  SummarySection,
  InstallationsTableSection,
  PermissionsSection,
} from '../common/ui-sections'

export type AppContentProps = {
  appDetailState: DeveloperAppDetailState
}

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

export const handleOpenAppPreview = (appId: string) => () => {
  const url = `developer/apps/${appId}/preview`
  window.open(url, '_blank')
}

export const CustomUninstallCell: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <a onClick={onClick}>Uninstall</a>
)

const AppContent: React.FC<AppContentProps> = ({ appDetailState }) => {
  const appDetailData = appDetailState.data as AppDetailDataNotNull
  const { summary = '', authFlow = '', externalId = '', id = '', name = '', scopes = [] } = appDetailData
  const installationsData = useSelector(selectInstallationAppData) as PagedResultInstallationModel_
  const { data = [] } = installationsData
  const dispatch = useDispatch()
  const developerId = useSelector(selectDeveloperId) || ''

  const [uninstallApp, setUninstallApp] = React.useState<InstallationModel>()
  const columns = generateColumns(handleUninstall(setUninstallApp), CustomUninstallCell)()
  const isVisibleUninstallModal = Boolean(uninstallApp)

  return (
    <FlexContainerBasic flexColumn>
      {isVisibleUninstallModal && (
        <Modal renderChildren visible={isVisibleUninstallModal}>
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
      <ListingPreviewSection onClick={handleOpenAppPreview(id)} />
      <AuthenticationSection id={id} authFlow={authFlow} externalId={externalId} />
      <PermissionsSection permissions={scopes} />
      <InstallationsTableSection columns={columns} data={data} />
    </FlexContainerBasic>
  )
}

export default AppContent
