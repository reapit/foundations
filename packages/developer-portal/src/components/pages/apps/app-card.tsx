import React, { FC, MouseEvent, useEffect } from 'react'
import { useHistory } from 'react-router'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import Routes from '../../../constants/routes'
import { Card, elFadeIn } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { updateActions, UpdateActionNames } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { navigate } from '../../../utils/navigation'
import defaultAppIcon from '../../../assets/images/default-app-icon.jpg'

export const handleDeleteApp = (deleteApp: SendFunction<void, boolean>) => (event?: MouseEvent) => {
  event?.stopPropagation()
  deleteApp()
}

export const handleRefreshApps = (refreshApps: () => void, appDeleted?: boolean) => () => {
  if (appDeleted) {
    refreshApps()
  }
}

export interface AppCardProps {
  app: AppSummaryModel
  refreshApps: () => void
}

export const AppCard: FC<AppCardProps> = ({ app, refreshApps }) => {
  const history = useHistory()

  const { id, name, isDirectApi, developer, iconUri, summary } = app

  const [, , deleteApp, appDeleted] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deleteApp],
    method: 'DELETE',
    uriParams: {
      appId: id,
    },
  })

  useEffect(handleRefreshApps(refreshApps, appDeleted), [appDeleted])

  return (
    <Card
      className={elFadeIn}
      onClick={navigate(history, `${Routes.APPS}/${id}`)}
      hasMainCard
      mainContextMenuItems={[
        {
          icon: 'editSystem',
          onClick: navigate(history, `${Routes.APPS}/${id}/edit`),
        },
        {
          icon: 'trashSystem',
          onClick: handleDeleteApp(deleteApp),
          intent: 'danger',
        },
      ]}
      mainCardHeading={name}
      mainCardSubHeading={developer}
      mainCardSubHeadingAdditional={isDirectApi ? 'Integration' : ''}
      mainCardBody={summary}
      mainCardImgUrl={iconUri ?? defaultAppIcon}
    />
  )
}
