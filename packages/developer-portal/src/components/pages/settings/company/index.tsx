import React, { FC } from 'react'
import { Loader, Title } from '@reapit/elements'
import { useReapitGet } from '@reapit/utils-react'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { CompanyForm } from './company-form'

export const SettingsCompanyPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId

  const [developer, developerLoading, , refreshDeveloper] = useReapitGet<DeveloperModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloper],
    uriParams: { developerId },
    fetchWhenTrue: [developerId],
  })

  return (
    <>
      <Title>Company</Title>
      {developerLoading && <Loader />}
      {developer && <CompanyForm developer={developer} refreshDeveloper={refreshDeveloper} />}
    </>
  )
}

export default SettingsCompanyPage
