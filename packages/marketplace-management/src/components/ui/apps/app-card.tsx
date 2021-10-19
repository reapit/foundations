import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { AppSummaryModel, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import defaultAppIcon from '../../../assets/images/default-app-icon.jpg'
import Routes from '../../../constants/routes'
import { history } from '../../../core/router'
import { URLS } from '../../../constants/api'
import useSWR from 'swr'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import {
  getClientIdFirstPart,
  getInstallationsForOfficeGroups,
  getInstallationsForWholeOrg,
} from './app-installation-manager'
import { Card } from '@reapit/elements'

export interface AppCardProps {
  app: AppSummaryModel
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = defaultAppIcon)

export const handleNavigation = (appId: string) => () => {
  history.push(`${Routes.MARKETPLACE}/${appId}`)
}

export const handleInstallationsStringEffect =
  (
    setInstallationString: Dispatch<SetStateAction<string | null>>,
    installations: InstallationModelPagedResult | undefined,
    clientId?: string | null,
  ) =>
  () => {
    if (installations?.data && clientId) {
      const clientIdFirstPart = getClientIdFirstPart(clientId)
      const orgInstallations = getInstallationsForWholeOrg(installations, clientIdFirstPart)
      const groupInstallations = getInstallationsForOfficeGroups(installations, clientIdFirstPart)

      if (orgInstallations.length) return setInstallationString(`Installed for organisation ${clientIdFirstPart}`)
      if (groupInstallations.length)
        return setInstallationString(
          `Installed for ${groupInstallations.length} office group${groupInstallations.length > 1 ? 's' : ''}`,
        )
      return setInstallationString('Not installed')
    }
  }

export const AppCard: FC<AppCardProps> = ({ app }: AppCardProps) => {
  const [installationString, setInstallationString] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { data: installations } = useSWR<InstallationModelPagedResult>(
    `${URLS.INSTALLATIONS}/?AppId=${app.id}&IsInstalled=true&pageSize=999`,
  )
  const clientId = connectSession?.loginIdentity.clientId

  useEffect(handleInstallationsStringEffect(setInstallationString, installations, clientId), [installations, clientId])

  return (
    <Card
      onClick={handleNavigation(app.id as string)}
      hasMainCard
      hasListCard
      mainCardHeading={app.name}
      mainCardSubHeading={app.developer}
      mainCardSubHeadingAdditional={app.isDirectApi ? 'Integration' : ''}
      mainCardBody={app.summary}
      mainCardImgUrl={app.iconUri || defaultAppIcon}
      listCardHeading="Installation and Visibiliy"
      listCardItems={[
        {
          listCardItemHeading: 'Installation Status',
          listCardItemSubHeading:
            installationString && installationString !== 'Not installed'
              ? installationString
              : installationString ?? '',
          listCardItemIcon: 'customerInfographic',
        },
        {
          listCardItemHeading: 'Marketplace Visibility',
          listCardItemSubHeading: app.isHidden ? 'Marketplace visible' : 'Marketplace hidden',
          listCardItemIcon: 'agencyCloudInfographic',
        },
      ]}
    />
  )
}

export default AppCard
