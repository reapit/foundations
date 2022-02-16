import React, { FC } from 'react'
import { useHistory } from 'react-router'
import ErrorBoundary from '../../../hocs/error-boundary'
import Routes from '../../../../constants/routes'
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
import { navigate, openNewPage, ExternalPages } from '../../../../utils/navigation'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import AppsWelcomePage from '../welcome'
import AppsListPage from '../list'
import AppsNewPage from '../new'
import AppsDetailPage from '../detail'
import AppEditPage from '../edit'
import { useAppState } from '../state/use-app-state'

export const getCurrentPage = (pathname: string) => {
  const isAppsList = pathname === Routes.APPS
  const isAppsNew = pathname === Routes.APPS_NEW
  const isAppsWelcome = pathname === Routes.APPS_WELCOME
  const isAppsEdit = /^\/apps\/[a-z0-9-]+\/edit/.test(pathname)
  const isAppsDetail = /^\/apps\/[a-z0-9-]+/.test(pathname) && !isAppsEdit && !isAppsNew

  return {
    isAppsList,
    isAppsNew,
    isAppsWelcome,
    isAppsEdit,
    isAppsDetail,
  }
}

export const AppsPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const { appsDataState, appId } = useAppState()

  const { apps, appsLoading } = appsDataState
  const { isAppsList, isAppsNew, isAppsWelcome, isAppsEdit, isAppsDetail } = getCurrentPage(pathname)

  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        {appsLoading ? (
          <Loader fullPage />
        ) : apps && !apps?.totalCount && !isAppsWelcome ? (
          <Redirect to={Routes.APPS_WELCOME} />
        ) : apps ? (
          <>
            <SecondaryNavContainer>
              <Title>Apps</Title>
              <SecondaryNav className={elMb8}>
                <SecondaryNavItem onClick={navigate(history, Routes.APPS)} active={isAppsList}>
                  My Apps
                </SecondaryNavItem>
                {(isAppsEdit || isAppsDetail) && (
                  <>
                    <SecondaryNavItem onClick={navigate(history, `${Routes.APPS}/${appId}`)} active={isAppsDetail}>
                      App Details
                    </SecondaryNavItem>
                    <SecondaryNavItem onClick={navigate(history, `${Routes.APPS}/${appId}/edit`)} active={isAppsEdit}>
                      Edit Details
                    </SecondaryNavItem>
                  </>
                )}
                <SecondaryNavItem onClick={navigate(history, Routes.APPS_NEW)} active={isAppsNew}>
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
                <Route path={Routes.APPS} exact component={AppsListPage} />
                <Route path={Routes.APPS_NEW} exact component={AppsNewPage} />
                <Route path={Routes.APPS_WELCOME} exact component={AppsWelcomePage} />
                <Route path={Routes.APPS_EDIT} component={AppEditPage} />
                <Route path={Routes.APP_DETAIL} component={AppsDetailPage} />
              </Switch>
            </PageContainer>
          </>
        ) : null}
      </FlexContainer>
    </ErrorBoundary>
  )
}
