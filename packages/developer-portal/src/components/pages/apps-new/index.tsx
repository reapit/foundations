import {
  Button,
  elMb5,
  elMb9,
  FlexContainer,
  Icon,
  Loader,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  SmallText,
  Subtitle,
  Title,
} from '@reapit/elements'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { GetActionNames, getActions } from '@reapit/utils-common'
import Routes from '../../../constants/routes'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { navigate, openNewPage, ExternalPages } from '../../../utils/navigation'
import { AppsNew } from './apps-new'
import { AppWizardProvider } from './use-app-wizard'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'

export const AppsNewPage: FC = () => {
  const location = useLocation()
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const [apps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId },
    fetchWhenTrue: [developerId],
  })

  const { pathname } = location

  return (
    <AppWizardProvider>
      <FlexContainer isFlexAuto>
        {appsLoading ? (
          <Loader />
        ) : (
          <>
            {apps?.data?.length ? (
              <SecondaryNavContainer>
                <Title>Apps</Title>
                <SecondaryNav className={elMb9}>
                  <SecondaryNavItem onClick={navigate(history, Routes.APPS)} active={pathname === Routes.APPS}>
                    My Apps
                  </SecondaryNavItem>
                  <SecondaryNavItem onClick={navigate(history, Routes.APPS_NEW)} active={pathname === Routes.APPS_NEW}>
                    New App
                  </SecondaryNavItem>
                </SecondaryNav>
                <Icon className={elMb5} icon="myAppsInfographic" iconSize="large" />
                <Subtitle>App Docs</Subtitle>
                <SmallText hasGreyText>
                  Apps are the first step for building applications on the Reapit Foundations platform. Before getting
                  started, please take the time to read the documentation carefully.
                </SmallText>
                <Button intent="neutral" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
                  View Docs
                </Button>
              </SecondaryNavContainer>
            ) : null}
            <PageContainer>
              <AppsNew />
            </PageContainer>
          </>
        )}
      </FlexContainer>
    </AppWizardProvider>
  )
}

export default AppsNewPage
