import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { AppSummaryModel, InstallationModel, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import defaultAppIcon from '../../../assets/images/default-app-icon.jpg'
import Routes from '../../../constants/routes'
import { URLS } from '../../../constants/api'
import useSWR from 'swr'
import { ReapitConnectSession } from '@reapit/connect-session'
import {
  getClientIdFirstPart,
  getInstallationsForOfficeGroups,
  getInstallationsForWholeOrg,
} from './app-installation-manager'
import { Card, elFadeIn } from '@reapit/elements'
import { useOrgId } from '../../../utils/use-org-id'
import { navigateRoute } from '../nav/nav'
import { useNavigate } from 'react-router'

export interface AppCardProps {
  app: AppSummaryModel
  connectSession: ReapitConnectSession
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = defaultAppIcon)

export const handleInstallationsStringEffect =
  (
    setInstallationString: Dispatch<SetStateAction<string | null>>,
    installations: InstallationModel[],
    email: string,
    clientId?: string | null,
  ) =>
  () => {
    if (clientId) {
      const clientIdFirstPart = getClientIdFirstPart(clientId)
      const orgInstallations = getInstallationsForWholeOrg(installations, clientIdFirstPart, email)
      const groupInstallations = getInstallationsForOfficeGroups(installations, clientIdFirstPart)

      if (orgInstallations.length) return setInstallationString(`Installed for organisation ${clientIdFirstPart}`)
      if (groupInstallations.length)
        return setInstallationString(
          `Installed for ${groupInstallations.length} office group${groupInstallations.length > 1 ? 's' : ''}`,
        )
      return setInstallationString('Not installed')
    }
  }

export const AppCard: FC<AppCardProps> = ({ app, connectSession }: AppCardProps) => {
  const [installationString, setInstallationString] = useState<string | null>(null)
  const navigate = useNavigate()
  const {
    orgIdState: { orgClientId },
  } = useOrgId()

  const { data } = useSWR<InstallationModelPagedResult>(
    !connectSession || !orgClientId ? null : `${URLS.INSTALLATIONS}/?AppId=${app.id}&IsInstalled=true&pageSize=999`,
  )

  const installations = data?.data ?? []
  const email = connectSession?.loginIdentity.email ?? ''

  useEffect(handleInstallationsStringEffect(setInstallationString, installations, email, orgClientId), [
    installations,
    connectSession,
    orgClientId,
  ])

  return (
    <Card
      className={elFadeIn}
      onClick={navigateRoute(navigate, `${Routes.MARKETPLACE}/${app.id}`)}
      hasMainCard
      hasListCard
      mainCardHeading={app.name}
      mainCardSubHeading={app.developer}
      mainCardSubHeadingAdditional={app.isDirectApi ? 'Integration' : ''}
      mainCardBody={app.summary}
      mainCardImgUrl={app.iconUri || defaultAppIcon}
      listCardHeading="Installation and Visibility"
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
          listCardItemSubHeading: app.isHidden ? 'Marketplace hidden' : 'Marketplace visible',
          listCardItemIcon: 'agencyCloudInfographic',
        },
      ]}
    />
  )
}

export default AppCard
