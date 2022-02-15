import React, { FC } from 'react'
import { useHistory } from 'react-router'
import { History } from 'history'
import ErrorBoundary from '../../hocs/error-boundary'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import Routes from '../../../constants/routes'
import {
  SmallText,
  Button,
  elHFull,
  elMb3,
  elMb8,
  FlexContainer,
  Icon,
  Loader,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Subtitle,
  Title,
} from '@reapit/elements'
import { navigate, openNewPage, ExternalPages } from '../../../utils/navigation'
import { Route, Switch, useLocation } from 'react-router-dom'
import { useReapitGet } from '@reapit/utils-react'
import { useReapitConnect } from '@reapit/connect-session'
import { getActions, GetActionNames } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { NoAppsLandingPage } from './no-apps-landing-page'
import AppsPage from './apps'
import AppsNewPage from '../apps-new'
import AppsDetailPage from '../app-detail'
import AppsEditPage from '../edit-app'
import PrivateRoute from '../../../core/private-route'

export const handleOnChange = (history: History) => (page: number) => history.push(`${Routes.APPS}?page=${page}`)

export const Apps: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const [apps, appsLoading, , refreshApps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 25 },
    fetchWhenTrue: [developerId],
  })

  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        {appsLoading ? (
          <Loader fullPage />
        ) : apps && !apps?.totalCount ? (
          <PageContainer>
            {pathname !== Routes.APPS_NEW && <NoAppsLandingPage />}
            <Route path={Routes.APPS_NEW} exact component={AppsNewPage} />
          </PageContainer>
        ) : apps ? (
          <>
            <SecondaryNavContainer>
              <Title>Apps</Title>
              <SecondaryNav className={elMb8}>
                <SecondaryNavItem
                  onClick={navigate(history, Routes.APPS)}
                  active={pathname.includes(Routes.APPS) && !pathname.includes(Routes.APPS_NEW)}
                >
                  My Apps
                </SecondaryNavItem>
                <SecondaryNavItem onClick={navigate(history, Routes.APPS_NEW)} active={pathname === Routes.APPS_NEW}>
                  New App
                </SecondaryNavItem>
              </SecondaryNav>
              <Icon className={elMb3} icon="myAppsInfographic" iconSize="large" />
              <Subtitle>Apps Documentation</Subtitle>
              <SmallText hasGreyText>
                This is the dashboard for your applications created using the Reapit Foundations platform. If you have
                not created an app before or you need help, please take the time to view our getting started guide.
              </SmallText>
              <Button className={elMb3} intent="neutral" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
                View Docs
              </Button>
            </SecondaryNavContainer>
            <PageContainer className={elHFull}>
              <Switch>
                <Route path={Routes.APPS} exact component={() => <AppsPage apps={apps} refreshApps={refreshApps} />} />
                <Route path={Routes.APPS_NEW} exact component={AppsNewPage} />
                <PrivateRoute path={Routes.APPS_EDIT} exact fetcher component={AppsEditPage} />
                <PrivateRoute path={Routes.APP_DETAIL} exact fetcher component={AppsDetailPage} />
              </Switch>
            </PageContainer>
          </>
        ) : null}
      </FlexContainer>
    </ErrorBoundary>
  )
}

export default Apps
