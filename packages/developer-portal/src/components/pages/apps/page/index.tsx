import React, { FC } from 'react'
import { useHistory } from 'react-router'
import ErrorBoundary from '../../../hocs/error-boundary'
import Routes from '../../../../constants/routes'
import {
  elHFull,
  elMb8,
  FlexContainer,
  Loader,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Title,
} from '@reapit/elements'
import { navigate } from '../../../../utils/navigation'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import AppsWelcomePage from '../welcome'
import AppsListPage from '../list'
import AppsNewPage from '../new'
import AppsDetailPage from '../detail'
import AppEditPage from '../edit'
import AppInstallationsPage from '../installations'
import { useAppState } from '../state/use-app-state'
import { getCurrentPage } from '../utils/get-current-page'
import { Helper } from './helper'

export const AppsPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const { appsDataState, appId } = useAppState()

  const { apps, appsLoading } = appsDataState
  const { isAppsList, isAppsNew, isAppsWelcome, isAppsEdit, isAppsDetail, isAppsInstallations } =
    getCurrentPage(pathname)

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
                {(isAppsEdit || isAppsDetail || isAppsInstallations) && (
                  <>
                    <SecondaryNavItem onClick={navigate(history, `${Routes.APPS}/${appId}`)} active={isAppsDetail}>
                      App Details
                    </SecondaryNavItem>
                    <SecondaryNavItem onClick={navigate(history, `${Routes.APPS}/${appId}/edit`)} active={isAppsEdit}>
                      Edit Details
                    </SecondaryNavItem>
                    <SecondaryNavItem
                      onClick={navigate(history, `${Routes.APPS}/${appId}/installations`)}
                      active={isAppsInstallations}
                    >
                      Installations
                    </SecondaryNavItem>
                  </>
                )}
                <SecondaryNavItem onClick={navigate(history, Routes.APPS_NEW)} active={isAppsNew}>
                  New App
                </SecondaryNavItem>
              </SecondaryNav>
              <Helper />
            </SecondaryNavContainer>
            <PageContainer className={elHFull}>
              <Switch>
                <Route path={Routes.APPS} exact component={AppsListPage} />
                <Route path={Routes.APPS_NEW} exact component={AppsNewPage} />
                <Route path={Routes.APPS_WELCOME} exact component={AppsWelcomePage} />
                <Route path={Routes.APP_INSTALLATIONS} exact component={AppInstallationsPage} />
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
