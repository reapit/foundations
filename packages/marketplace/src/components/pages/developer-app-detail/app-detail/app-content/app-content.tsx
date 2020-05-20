import * as React from 'react'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { appInstallationsRequestData } from '@/actions/app-installations'
import { selectDeveloperId } from '@/selector'
import developerAppDetailStyles from '@/styles/pages/developer-app-detail.scss?mod'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { H5 } from '@reapit/elements'
import appDetailStyles from '@/styles/blocks/app-detail.scss?mod'
import ConfirmUninstall from '@/components/ui/app-installations/confirm-uninstall'
import { PagedResultInstallationModel_, InstallationModel } from '@reapit/foundations-ts-definitions'
import { handleUninstall, handleAfterClose } from '@/components/ui/app-installations/app-installations-modal'
import AuthFlow from '@/constants/app-auth-flow'
import '@/styles/vendor/slick.scss'
import { useSelector, useDispatch } from 'react-redux'
import { selectInstallationAppData } from '@/selector/installations'
import { Table, Modal } from '@reapit/elements'
import { generateColumns } from '@/components/ui/app-installations/installations'
import clientAppDetailStyles from '@/styles/pages/client-app-detail.scss?mod'
import { RenderWithHeader } from '../render-with-header'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import AppAuthenticationDetail from '@/components/ui/app-authentication-detail'

export type AppContentProps = {
  appDetailData: AppDetailDataNotNull
}

interface RenderAuthenticationParams {
  authFlow: string
  id: string
  externalId: string
}
export const renderAuthentication = ({ authFlow, id, externalId }: RenderAuthenticationParams) => {
  if (authFlow === AuthFlow.CLIENT_SECRET) {
    return <AppAuthenticationDetail withCustomHeader={true} appId={id} />
  }

  return (
    <div data-test="authentication-client-id">
      <p>Client ID:</p>
      <p>{externalId}</p>
    </div>
  )
}

interface RenderInstallationsTableParams {
  data: InstallationModel[]
  columns: any[]
}
export const renderInstallationsTable = ({ data, columns }: RenderInstallationsTableParams) => {
  if (data.length === 0) {
    return (
      <RenderWithHeader dataTest="render-installations-table-empty-text" header="Installations">
        <p>Currently, there are no installations for your app</p>
      </RenderWithHeader>
    )
  }

  return (
    <RenderWithHeader dataTest="render-installations-table" header="Installations">
      <Table data={data} columns={columns} loading={false} />
    </RenderWithHeader>
  )
}

export const handleUninstallSuccess = ({ handleAfterClose, setUninstallApp, developerId, appId, dispatch }) => () => {
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

const AppContent: React.FC<AppContentProps> = ({ appDetailData }) => {
  const { summary = '', authFlow = '', externalId = '', id = '', name = '' } = appDetailData
  const installationsData = useSelector(selectInstallationAppData) as PagedResultInstallationModel_
  const { data = [] } = installationsData
  const dispatch = useDispatch()
  const developerId = useSelector(selectDeveloperId) || ''

  const [uninstallApp, setUninstallApp] = React.useState<InstallationModel>()
  const columns = generateColumns(handleUninstall(setUninstallApp))()
  const isVisibleUninstallModal = Boolean(uninstallApp)

  /**
   * 0 = icon
   * 1 = featured media
   * 2 -> nth: extra media
   */

  return (
    <div className={clientAppDetailStyles.appContentContainer}>
      <Modal visible={isVisibleUninstallModal}>
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

      <div className={clientAppDetailStyles.gutter}>{summary}</div>
      <div className={appDetailStyles.gutter}>
        <H5 className="flex items-center">
          <span className="mr-1">See listing preview</span>{' '}
          <FaExternalLinkAlt className={developerAppDetailStyles.listPreviewIcon} />
        </H5>
        <p>The listing preview will display your app as it would appear in the Marketplace</p>
      </div>

      <RenderWithHeader header="Authentication">{renderAuthentication({ authFlow, externalId, id })}</RenderWithHeader>
      <div className={clientAppDetailStyles.gutter}>
        {renderInstallationsTable({
          data,
          columns,
        })}
      </div>
    </div>
  )
}

export default AppContent
