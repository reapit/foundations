import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
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
import { toLocalTime, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { openNewPage } from '../../utils/navigation'
import { CheckAWSButton } from './check-aws-button'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { CreateSubscriptionsButton } from '../subscriptions/create-subscriptions'

export interface AppsTableProps {
  apps: AppSummaryModelPagedResult | null
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

export const handleRefreshAppsFeatured =
  (appsRefresh: () => void, setAppIdFeatured: Dispatch<SetStateAction<string | null>>, shouldRefresh?: boolean) =>
  () => {
    if (shouldRefresh) {
      appsRefresh()
      setAppIdFeatured(null)
    }
  }

export const handleOpenModal =
  (openModal: () => void, setAppIdDelete: Dispatch<SetStateAction<string | null>>, appIdDelete?: string) => () => {
    if (appIdDelete) {
      setAppIdDelete(appIdDelete)
      openModal()
    }
  }

export const handleToggleFeatured =
  (
    featureApp: SendFunction<void, boolean>,
    unFeatureApp: SendFunction<void, boolean>,
    apps: AppSummaryModelPagedResult | null,
    appIdFeatured: string | null,
  ) =>
  () => {
    if (appIdFeatured) {
      const isFeatured = apps?.data?.find((app) => app.id === appIdFeatured)?.isFeatured
      const updateFeatured = isFeatured ? unFeatureApp : featureApp

      updateFeatured()
    }
  }

export const handleAppIdFeatured =
  (setAppIdFeatured: Dispatch<SetStateAction<string | null>>, appId?: string) => () => {
    if (appId) {
      setAppIdFeatured(appId)
    }
  }

export const AppsTable: FC<AppsTableProps> = ({ apps, appsRefresh }) => {
  const { Modal, openModal, closeModal } = useModal()
  const [appIdDelete, setAppIdDelete] = useState<string | null>(null)
  const [appIdFeatured, setAppIdFeatured] = useState<string | null>(null)
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const appName = apps?.data?.find((app) => app.id === appIdDelete)?.name

  const [, , deleteApp, appDeleted] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deleteApp],
    method: 'DELETE',
    uriParams: {
      appId: appIdDelete,
    },
  })

  const [, , featureApp, appFeatured] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.featureApp],
    method: 'PUT',
    uriParams: {
      appId: appIdFeatured,
    },
  })

  const [, , unFeatureApp, appUnfeatured] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.unFeatureApp],
    method: 'DELETE',
    uriParams: {
      appId: appIdFeatured,
    },
  })

  useEffect(handleRefreshAppsDelete(appsRefresh, setAppIdDelete, closeModal, appDeleted), [appDeleted])
  useEffect(handleToggleFeatured(featureApp, unFeatureApp, apps, appIdFeatured), [apps, appIdFeatured])
  useEffect(handleRefreshAppsFeatured(appsRefresh, setAppIdFeatured, appFeatured || appUnfeatured), [
    appFeatured,
    appUnfeatured,
  ])

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
                value: <Icon icon={isListed ? 'checkSystem' : 'closeSystem'} />,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Integration',
                value: <Icon icon={isDirectApi ? 'checkSystem' : 'closeSystem'} />,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Featured',
                value: <Icon icon={isFeatured ? 'checkSystem' : 'closeSystem'} />,
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
            ],
            expandableContent: {
              content: (
                <>
                  <ButtonGroup alignment="center">
                    <Button
                      intent="secondary"
                      onClick={openNewPage(`${window.reapit.config.developerPortalUri}/apps/${id}`)}
                    >
                      Preview
                    </Button>
                    <CheckAWSButton appId={id ?? ''} />
                    <Button type="button" intent="danger" onClick={handleOpenModal(openModal, setAppIdDelete, id)}>
                      Delete
                    </Button>
                    <CreateSubscriptionsButton
                      appId={id}
                      developerId={developerId}
                      subscriptionType="applicationListing"
                    />
                    <Button intent="primary" onClick={handleAppIdFeatured(setAppIdFeatured, id)}>
                      Togggle Featured
                    </Button>
                  </ButtonGroup>
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
          <Button fixedWidth intent="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button fixedWidth intent="danger" onClick={handleDeleteApp(deleteApp, setIndexExpandedRow, appIdDelete)}>
            Confirm
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  ) : (
    <div className={elMb11}>
      <PersistentNotification isExpanded isFullWidth isInline intent="secondary">
        No results found for your selected filters
      </PersistentNotification>
    </div>
  )
}
