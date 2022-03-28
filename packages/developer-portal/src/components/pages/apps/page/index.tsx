import React, { FC } from 'react'
import { useHistory } from 'react-router'
import ErrorBoundary from '../../../hocs/error-boundary'
import Routes from '../../../../constants/routes'
import {
  elFadeIn,
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
import { cx } from '@linaria/core'
import { AppPipeline } from '../pipeline/app-pipeline'
import { selectLoginIdentity } from '@/selector/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const AppsPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const { appsDataState, appId } = useAppState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const { apps, appsLoading } = appsDataState
  const { isAppsList, isAppsNew, isAppsWelcome, isAppsEdit, isAppsDetail, isAppsInstallations, isAppPipelines } =
    getCurrentPage(pathname)

  const loginIdentity = selectLoginIdentity(connectSession)

  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        {appsLoading || !apps ? (
          <>
            <SecondaryNavContainer>
              <Title>Apps</Title>
            </SecondaryNavContainer>
            <PageContainer className={elHFull}>
              <Loader />
            </PageContainer>
          </>
        ) : !apps.totalCount && !isAppsWelcome && isAppsList ? (
          <Redirect to={Routes.APPS_WELCOME} />
        ) : (
          <>
            {Boolean(apps.totalCount) && (
              <SecondaryNavContainer>
                <Title>Apps</Title>
                <SecondaryNav className={cx(elMb8, elFadeIn)}>
                  <SecondaryNavItem onClick={navigate(history, Routes.APPS)} active={isAppsList}>
                    My Apps
                  </SecondaryNavItem>
                  {(isAppsEdit || isAppsDetail || isAppsInstallations || isAppPipelines) && (
                    <>
                      <SecondaryNavItem onClick={navigate(history, `${Routes.APPS}/${appId}`)} active={isAppsDetail}>
                        App Details
                      </SecondaryNavItem>
                      <SecondaryNavItem onClick={navigate(history, `${Routes.APPS}/${appId}/edit`)} active={isAppsEdit}>
                        Edit App
                      </SecondaryNavItem>
                      {loginIdentity.developerId &&
                        window.reapit.config.pipelineWhitelist.includes(loginIdentity.developerId) && (
                          <SecondaryNavItem
                            onClick={navigate(history, `${Routes.APPS}/${appId}/pipeline`)}
                            active={isAppPipelines}
                          >
                            Pipelines
                          </SecondaryNavItem>
                        )}
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
            )}
            <PageContainer className={elHFull}>
              <Switch>
                <Route path={Routes.APPS} exact component={AppsListPage} />
                <Route path={Routes.APPS_NEW} exact component={AppsNewPage} />
                <Route path={Routes.APPS_WELCOME} exact component={AppsWelcomePage} />
                <Route path={Routes.APP_INSTALLATIONS} exact component={AppInstallationsPage} />
                <Route path={Routes.APPS_EDIT} component={AppEditPage} />
                {loginIdentity.developerId &&
                  window.reapit.config.pipelineWhitelist.includes(loginIdentity.developerId) && (
                    <Route path={Routes.APP_PIPELINE} component={AppPipeline} />
                  )}
                <Route path={Routes.APP_DETAIL} component={AppsDetailPage} />
              </Switch>
            </PageContainer>
          </>
        )}
      </FlexContainer>
    </ErrorBoundary>
  )
}
