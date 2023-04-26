import React, { FC, MouseEvent, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import Routes from '../../../constants/routes'
import { BodyText, Button, ButtonGroup, Card, elFadeIn, useModal } from '@reapit/elements'
import { SendFunction, useReapitUpdate, updateActions, UpdateActionNames } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { navigateRoute } from '../../../utils/navigation'
import defaultAppIcon from '../../../assets/images/default-app-icon.jpg'
import { useAppState } from '../state/use-app-state'
import { cx } from '@linaria/core'
import { cardCursor } from './__styles__'
import { Link } from 'react-router-dom'
import { selectIsDeveloperAdmin } from '../../../utils/auth'
import { useReapitConnect } from '@reapit/connect-session'

export const handleDeleteApp = (deleteApp: SendFunction<void, boolean>) => (event?: MouseEvent) => {
  event?.stopPropagation()
  deleteApp()
}

export const handleRefreshApps = (appsRefresh: () => void, appDeleted?: boolean) => () => {
  if (appDeleted) {
    appsRefresh()
  }
}

export const handleOpenModal = (openModal: () => void) => (event?: MouseEvent) => {
  event?.stopPropagation()
  openModal()
}

export interface AppCardProps {
  app: AppSummaryModel
}

export const AppCard: FC<AppCardProps> = ({ app }) => {
  const navigate = useNavigate()
  const { appsDataState } = useAppState()
  const { Modal, openModal, closeModal } = useModal()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isDeveloperAdmin = selectIsDeveloperAdmin(connectSession)

  const { appsRefresh } = appsDataState
  const { id, name, isDirectApi, developer, iconUri, summary, deletionProtection } = app

  const [, , deleteApp, appDeleted] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteApp],
    method: 'DELETE',
    uriParams: {
      appId: id,
    },
  })

  useEffect(handleRefreshApps(appsRefresh, appDeleted), [appDeleted])

  return (
    <>
      <Card
        className={cx(elFadeIn, cardCursor)}
        onClick={navigateRoute(navigate, `${Routes.APPS}/${id}`)}
        hasMainCard
        mainContextMenuItems={[
          {
            icon: 'editSystem',
            onClick: navigateRoute(navigate, `${Routes.APPS}/${id}/edit/general`),
            intent: 'primary',
          },
          {
            icon: 'trashSystem',
            onClick: handleOpenModal(openModal),
            intent: 'danger',
          },
        ]}
        mainCardHeading={name}
        mainCardSubHeading={developer}
        mainCardSubHeadingAdditional={isDirectApi ? 'Integration' : ''}
        mainCardBody={summary}
        mainCardImgUrl={iconUri ?? defaultAppIcon}
      />
      <Modal title={`Confirm ${name} Deletion`}>
        {!isDeveloperAdmin ? (
          <BodyText>
            Unfortunately, your user account does not have the correct permissions to delete this app. Only an Admin of
            your developer organisation can delete apps.
          </BodyText>
        ) : deletionProtection ? (
          <BodyText>
            &lsquo;{name}&rsquo; has been set to&lsquo;delete protected&rsquo; to avoid accidental data loss. If you
            really want to delete the app, visit <Link to={`${Routes.APPS}/${id}/edit/app-listing`}>this page </Link>,
            uncheck the delete protection checkbox and save the revision.
          </BodyText>
        ) : (
          <BodyText>
            Are your sure you want to remove the app &lsquo;{name}&rsquo;? By clicking &lsquo;delete&rsquo; it will
            remove all app data including all revisions and listings.
          </BodyText>
        )}
        <ButtonGroup alignment="center">
          <Button fixedWidth intent="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            fixedWidth
            intent="danger"
            disabled={deletionProtection || !isDeveloperAdmin}
            onClick={handleDeleteApp(deleteApp)}
          >
            Confirm
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
