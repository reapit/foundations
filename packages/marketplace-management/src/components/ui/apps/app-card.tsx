import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AppSummaryModel, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Tile } from '@reapit/elements'
import defaultAppIcon from '../../../assets/images/default-app-icon.jpg'
import { directAPI } from '../__styles__'
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
import { FaCheck, FaTimes } from 'react-icons/fa'
import { cx } from 'linaria'
import { installed, installString, uninstalled } from './__styled__/app-styles'

export interface AppCardProps {
  app: AppSummaryModel
}

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) =>
  (event.currentTarget.src = defaultAppIcon)

export const handleNavigation = (appId: string) => () => {
  history.push(`${Routes.MARKETPLACE}/${appId}`)
}

export const handleInstallationsStringEffect = (
  setInstallationString: Dispatch<SetStateAction<string | null>>,
  installations: InstallationModelPagedResult | undefined,
  clientId?: string | null,
) => () => {
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

const AppCard: React.FC<AppCardProps> = ({ app }: AppCardProps) => {
  const [installationString, setInstallationString] = useState<string | null>(null)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { data: installations } = useSWR<InstallationModelPagedResult>(
    `${URLS.INSTALLATIONS}/?AppId=${app.id}&IsInstalled=true&pageSize=999`,
  )
  const clientId = connectSession?.loginIdentity.clientId

  useEffect(handleInstallationsStringEffect(setInstallationString, installations, clientId), [installations, clientId])

  return (
    <Tile
      heading={app.name || ''}
      onClick={handleNavigation(app.id as string)}
      subHeading={
        <>
          {app.developer || ''}
          {app.isDirectApi ? <span className={directAPI}>(Integration)</span> : ''}
        </>
      }
      image={<img className="image" src={app.iconUri || defaultAppIcon} alt={app.name} onError={onImageError} />}
    >
      {installationString && installationString !== 'Not installed' ? (
        <span className={cx(installString, installed)}>
          <FaCheck />
          {installationString}
        </span>
      ) : installationString ? (
        <span className={cx(installString, uninstalled)}>
          <FaTimes />
          {installationString}
        </span>
      ) : null}

      {!app.isHidden ? (
        <span className={cx(installString, installed)}>
          <FaCheck />
          Marketplace visible
        </span>
      ) : app.isHidden ? (
        <span className={cx(installString, uninstalled)}>
          <FaTimes />
          Marketplace hidden
        </span>
      ) : null}
    </Tile>
  )
}

export default AppCard
