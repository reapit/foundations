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

export const handleRefreshApps =
  (
    appsRefresh: () => void,
    setAppId: Dispatch<SetStateAction<string | null>>,
    closeModal: () => void,
    appDeleted?: boolean,
  ) =>
  () => {
    if (appDeleted) {
      appsRefresh()
      setAppId(null)
      closeModal()
    }
  }

export const handleOpenModal =
  (openModal: () => void, setAppId: Dispatch<SetStateAction<string | null>>, appId?: string) => () => {
    if (appId) {
      setAppId(appId)
      openModal()
    }
  }

export const AppsTable: FC<AppsTableProps> = ({ apps, appsRefresh }) => {
  const { Modal, openModal, closeModal } = useModal()
  const [appId, setAppId] = useState<string | null>(null)
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)

  const [, , deleteApp, appDeleted] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deleteApp],
    method: 'DELETE',
    uriParams: {
      appId,
    },
  })

  useEffect(handleRefreshApps(appsRefresh, setAppId, closeModal, appDeleted), [appDeleted])

  return apps?.data?.length ? (
    <div className={elMb11}>
      <Subtitle>Total Apps</Subtitle>
      <BodyText hasGreyText>{apps.totalCount}</BodyText>
      <Table
        indexExpandedRow={indexExpandedRow}
        setIndexExpandedRow={setIndexExpandedRow}
        rows={apps.data.map(({ name, id, summary, developer, isListed, isDirectApi, created, developerId }) => ({
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
              label: 'Created',
              value: toLocalTime(created) ?? '',
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
                  <Button type="button" intent="danger" onClick={handleOpenModal(openModal, setAppId, id)}>
                    Delete
                  </Button>
                  <CreateSubscriptionsButton
                    appId={id}
                    developerId={developerId}
                    subscriptionType="applicationListing"
                  />
                </ButtonGroup>
                <Modal title={`Confirm ${name} Deletion`}>
                  <BodyText>
                    Are your sure you want to remove the app &lsquo;{name}&rsquo;? By clicking &lsquo;delete&rsquo; it
                    will remove all app data including all revisions and listings.
                  </BodyText>
                  <ButtonGroup alignment="center">
                    <Button fixedWidth intent="secondary" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button fixedWidth intent="danger" onClick={handleDeleteApp(deleteApp, setIndexExpandedRow, appId)}>
                      Confirm
                    </Button>
                  </ButtonGroup>
                </Modal>
              </>
            ),
          },
        }))}
      />
    </div>
  ) : (
    <div className={elMb11}>
      <PersistentNotification isExpanded isFullWidth isInline intent="secondary">
        No results found for your selected filters
      </PersistentNotification>
    </div>
  )
}
