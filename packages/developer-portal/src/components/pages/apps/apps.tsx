import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { History } from 'history'
import { AppSummaryModel, AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import Routes from '../../../constants/routes'
import { Card, Loader } from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { useReapitGet } from '@reapit/utils-react'
import { getActions, GetActionNames } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { navigate } from '../../../utils/navigation'
import defaultAppIcon from '../../../assets/images/default-app-icon.jpg'

export const handleOnCardClick = (history: History) => (app: AppSummaryModel) => {
  history.push(`${Routes.APPS}/${app.id}`)
}

export const handleOnChange = (history: History) => (page: number) => history.push(`${Routes.APPS}?page=${page}`)

export const AppsPage: FC = () => {
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity?.developerId
  const [apps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId },
    fetchWhenTrue: [developerId],
  })

  return (
    <>
      {appsLoading ? (
        <Loader fullPage />
      ) : (
        apps?.data?.map(({ id, name, isDirectApi, developer, iconUri, summary }) => (
          <Card
            onClick={navigate(history, `${Routes.APPS}/${id}`)}
            key={id}
            hasMainCard
            mainContextMenuItems={[
              {
                icon: 'editSystem',
                onClick: navigate(history, `${Routes.APPS}/${id}/edit`),
              },
              {
                icon: 'trashSystem',
                onClick: () => console.log('Deleting'),
                intent: 'danger',
              },
            ]}
            mainCardHeading={name}
            mainCardSubHeading={developer}
            mainCardSubHeadingAdditional={isDirectApi ? 'Integration' : ''}
            mainCardBody={summary}
            mainCardImgUrl={iconUri ?? defaultAppIcon}
          />
        ))
      )}
    </>
  )
}

export default AppsPage
