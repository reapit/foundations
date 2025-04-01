import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import {
  PersistentNotification,
  Table,
  Subtitle,
  BodyText,
  ButtonGroup,
  Icon,
  elMb11,
  Button,
  useModal,
} from '@reapit/elements'
import { toLocalTime } from '@reapit/utils-common'
import { openNewPage } from '../../utils/navigation'
import { CheckAWSButton } from './check-aws-button'
import { SendFunction, useReapitUpdate, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { CreateSubscriptions } from '../subscriptions/create-subscriptions'
import { usePermissionsState } from '../../core/use-permissions-state'
import { ToggleFeatured } from './toggle-featured'
import { ToggleConsumption } from './toggle-consumption'
import { ToggleSupportNotification } from './toggle-support-notification'

export interface AppsTableProps {
  apps: Marketplace.AppSummaryModelPagedResult | null
  appsRefresh: () => void
}

export const handleDeleteApp =
  (
    deleteApp: SendFunction<void, boolean>,
    setIndexExpandedRow: Dispatch<SetStateAction<number | null>>,
    appId: string | null,
  ) =>
  () => {
    if (appId) {
      deleteApp()
      setIndexExpandedRow(null)
    }
  }

export const handleRefreshAppsDelete =
  (
    appsRefresh: () => void,
    setAppIdDelete: Dispatch<SetStateAction<string | null>>,
    closeModal: () => void,
    appDeleted?: boolean,
  ) =>
  () => {
    if (appDeleted) {
      appsRefresh()
      setAppIdDelete(null)
      closeModal()
    }
  }

export const handleOpenModal =
  (openModal: () => void, setAppIdDelete: Dispatch<SetStateAction<string | null>>, appIdDelete?: string) => () => {
    if (appIdDelete) {
      setAppIdDelete(appIdDelete)
      openModal()
    }
  }

export const handleAppIdFeatured =
  (
    setAppIdFeatured: Dispatch<SetStateAction<string | null>>,
    setAppIdSubs: Dispatch<SetStateAction<string | null>>,
    setAppIdConsumption: Dispatch<SetStateAction<string | null>>,
    appId?: string,
  ) =>
  () => {
    if (appId) {
      setAppIdFeatured(appId)
      setAppIdSubs(null)
      setAppIdConsumption(null)
    }
  }

export const handleAppIdSubs =
  (
    setAppIdSubs: Dispatch<SetStateAction<string | null>>,
    setAppIdFeatured: Dispatch<SetStateAction<string | null>>,
    setAppIdConsumption: Dispatch<SetStateAction<string | null>>,
    appId?: string,
  ) =>
  () => {
    if (appId) {
      setAppIdSubs(appId)
      setAppIdFeatured(null)
      setAppIdConsumption(null)
    }
  }

export const handleAppIdConsumption =
  (
    setAppIdConsumption: Dispatch<SetStateAction<string | null>>,
    setAppIdSubs: Dispatch<SetStateAction<string | null>>,
    setAppIdFeatured: Dispatch<SetStateAction<string | null>>,
    appId?: string,
  ) =>
  () => {
    if (appId) {
      setAppIdConsumption(appId)
      setAppIdSubs(null)
      setAppIdFeatured(null)
    }
  }

export const AppsTable: FC<AppsTableProps> = ({ apps, appsRefresh }) => {
  const { Modal, openModal, closeModal } = useModal()
  const { hasReadAccess } = usePermissionsState()
  const [appIdDelete, setAppIdDelete] = useState<string | null>(null)
  const [appIdFeatured, setAppIdFeatured] = useState<string | null>(null)
  const [appIdConsumption, setAppIdConsumption] = useState<string | null>(null)
  const [appIdSubs, setAppIdSubs] = useState<string | null>(null)
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const appName = apps?.data?.find((app) => app.id === appIdDelete)?.name

  const [, , deleteApp, appDeleted] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteApp],
    method: 'DELETE',
    uriParams: {
      appId: appIdDelete,
    },
  })

  useEffect(handleRefreshAppsDelete(appsRefresh, setAppIdDelete, closeModal, appDeleted), [appDeleted])

  return apps?.data?.length ? (
    <div className={elMb11}>
      <Subtitle>Total Apps</Subtitle>
      <BodyText hasGreyText>{apps.totalCount}</BodyText>
      <Table
        indexExpandedRow={indexExpandedRow}
        setIndexExpandedRow={setIndexExpandedRow}
        rows={apps.data.map(
          ({
            name,
            id,
            summary,
            developer,
            isListed,
            isDirectApi,
            isFeatured,
            created,
            developerId,
            publicListedDate,
            limitToClientIds,
            sendInternalInstallNotification,
          }) => ({
            cells: [
              {
                label: 'App Name',
                value: name ?? '',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'AppId',
                value: id ?? '',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Summary',
                value: summary ?? '',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Developer Name',
                value: developer ?? '',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Listed',
                value: <Icon icon={isListed ? 'check' : 'close'} intent={isListed ? 'success' : 'danger'} />,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Integration',
                value: <Icon icon={isDirectApi ? 'check' : 'close'} intent={isDirectApi ? 'success' : 'danger'} />,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Featured',
                value: <Icon icon={isFeatured ? 'check' : 'close'} intent={isFeatured ? 'success' : 'danger'} />,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Created',
                value: toLocalTime(created) ?? '',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Publicly Listed',
                value: publicListedDate ? toLocalTime(publicListedDate) : '-',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Public',
                value: (
                  <Icon
                    icon={Array.isArray(limitToClientIds) && limitToClientIds.length > 0 ? 'close' : 'check'}
                    intent={Array.isArray(limitToClientIds) && limitToClientIds.length > 0 ? 'danger' : 'success'}
                  />
                ),
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            expandableContent: {
              content: (
                <>
                  <ButtonGroup alignment="center">
                    <Button intent="default" onClick={openNewPage(`${process.env.appMarketUri}/apps/${id}`)}>
                      View in AppMarket
                    </Button>
                    <Button
                      intent="default"
                      disabled={hasReadAccess}
                      onClick={openNewPage(`${process.env.developerPortalUri}/apps/${id}`)}
                    >
                      View in DevPortal
                    </Button>
                    <CheckAWSButton appId={id ?? ''} />
                    <Button
                      onClick={handleAppIdSubs(setAppIdSubs, setAppIdFeatured, setAppIdConsumption, id)}
                      intent="primary"
                      disabled={hasReadAccess}
                    >
                      Toggle Subscription
                    </Button>
                    <Button
                      intent="primary"
                      disabled={hasReadAccess}
                      onClick={handleAppIdFeatured(setAppIdFeatured, setAppIdSubs, setAppIdConsumption, id)}
                    >
                      Togggle Featured
                    </Button>
                    <Button
                      intent="primary"
                      disabled={hasReadAccess}
                      onClick={handleAppIdConsumption(setAppIdConsumption, setAppIdSubs, setAppIdFeatured, id)}
                    >
                      Togggle API Consumption
                    </Button>
                    <Button
                      type="button"
                      intent="danger"
                      disabled={hasReadAccess}
                      onClick={handleOpenModal(openModal, setAppIdDelete, id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                  {appIdFeatured && appIdFeatured === id && (
                    <ToggleFeatured appIdFeatured={appIdFeatured} apps={apps} appsRefresh={appsRefresh} />
                  )}
                  {appIdSubs && appIdSubs === id && (
                    <CreateSubscriptions appId={id} developerId={developerId} subscriptionType="applicationListing" />
                  )}
                  {appIdConsumption && appIdConsumption === id && (
                    <ToggleConsumption appIdConsumption={appIdConsumption} apps={apps} appsRefresh={appsRefresh} />
                  )}
                  {!hasReadAccess && (
                    <ToggleSupportNotification
                      appId={id as string}
                      sendInternalInstallNotification={sendInternalInstallNotification || false}
                    />
                  )}
                </>
              ),
            },
          }),
        )}
      />
      <Modal title={`Confirm ${appName} Deletion`}>
        <BodyText>
          Are your sure you want to remove the app &lsquo;{appName}&rsquo;? By clicking &lsquo;delete&rsquo; it will
          remove all app data including all revisions and listings.
        </BodyText>
        <ButtonGroup alignment="center">
          <Button intent="primary" onClick={closeModal}>
            Cancel
          </Button>
          <Button intent="danger" onClick={handleDeleteApp(deleteApp, setIndexExpandedRow, appIdDelete)}>
            Confirm
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  ) : (
    <div className={elMb11}>
      <PersistentNotification isExpanded isFullWidth isInline intent="primary">
        No results found for your selected filters
      </PersistentNotification>
    </div>
  )
}
