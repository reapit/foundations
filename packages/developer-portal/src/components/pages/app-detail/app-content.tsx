import * as React from 'react'
import routes from '@/constants/routes'
import dayjs from 'dayjs'
import { Dispatch } from 'redux'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { Button, DATE_TIME_FORMAT, Section } from '@reapit/elements'
import ConfirmUninstall from './app-uninstall-modal/confirm-uninstall'
import { handleUninstall, handleAfterClose } from './app-uninstall-modal/app-uninstall-modal'
import { InstallationModel, AppDetailModel } from '@reapit/foundations-ts-definitions'
import { useSelector, useDispatch } from 'react-redux'
import { selectInstallationsListData } from '@/selector/installations'
import { Modal } from '@reapit/elements'
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
import { AppDetailState } from '@/reducers/apps/app-detail'
import { fetchInstallationsList } from '@/actions/installations'

export type AppContentProps = {
  appDetailState: AppDetailState
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
    fetchInstallationsList({
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
      Header: 'Company Name',
      accessor: 'customerName',
    },
    {
      Header: 'Company Address',
      accessor: ({ customerAddress = {} }: { customerAddress: InstallationModel['customerAddress'] }) => {
        const {
          buildingName = '',
          buildingNumber = '',
          line1 = '',
          line2 = '',
          line3 = '',
          line4 = '',
          postcode = '',
          countryId = '',
        } = customerAddress

        return `${buildingName} ${buildingNumber} ${line1} ${line2} ${line3} ${line4} ${postcode} ${countryId}`
      },
    },
    {
      Header: 'Date Installed',
      accessor: (d) => dayjs(d.created).format(DATE_TIME_FORMAT.DATE_FORMAT),
    },
    {
      Header: 'Installed By',
      accessor: 'installedBy',
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
  const installationsData = useSelector(selectInstallationsListData)
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
      <InstallationsTableSection columns={installationTableColumns} data={installationsData} />
    </Section>
  )
}

export default AppContent
