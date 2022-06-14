import React, { FC } from 'react'
import { useHistory } from 'react-router'
import ErrorBoundary from '../../../core/error-boundary'
import Routes from '../../../constants/routes'
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
import { navigate } from '../../../utils/navigation'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import AppsWelcomePage from '../welcome'
import AppsListPage from '../list'
import AppsNewPage from '../new'
import AppsDetailPage from '../detail'
import AppEditPage from '../edit'
import AppPipelinePage from '../pipeline'
import AppInstallationsPage from '../installations'
import { useAppState } from '../state/use-app-state'
import { getCurrentPage } from '../utils/get-current-page'
import { Helper } from './helper'
import { cx } from '@linaria/core'
import { useGlobalState } from '../../../core/use-global-state'
import AppConsentsPage from '../consents'

export const AppsPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const { appsDataState, appId, appEditState } = useAppState()
  const { globalDataState } = useGlobalState()
  const { currentDeveloper } = globalDataState
  const { appConsents } = appEditState

  const { apps, appsLoading, appDetail } = appsDataState
  const {
    isAppsList,
    isAppsNew,
    isAppsWelcome,
    isAppsEdit,
    isAppsDetail,
    isAppsInstallations,
    isAppPipelines,
    isAppConsents,
  } = getCurrentPage(pathname)

  const hasPipelines =
    currentDeveloper?.id &&
    window.reapit.config.pipelineWhitelist.includes(currentDeveloper.id) &&
    appDetail?.authFlow !== 'clientCredentials'

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
                  {(isAppsEdit || isAppsDetail || isAppsInstallations || isAppPipelines || isAppConsents) && (
                    <>
                      <SecondaryNavItem onClick={navigate(history, `${Routes.APPS}/${appId}`)} active={isAppsDetail}>
                        App Details
                      </SecondaryNavItem>
                      <SecondaryNavItem
                        onClick={navigate(history, `${Routes.APPS}/${appId}/edit/general`)}
                        active={isAppsEdit}
                      >
                        Edit App
                      </SecondaryNavItem>
                      <SecondaryNavItem
                        onClick={navigate(history, `${Routes.APPS}/${appId}/installations`)}
                        active={isAppsInstallations}
                      >
                        Installations
                      </SecondaryNavItem>
                      {hasPipelines && (
                        <SecondaryNavItem
                          onClick={navigate(history, `${Routes.APPS}/${appId}/pipeline`)}
                          active={isAppPipelines}
                        >
                          Pipeline
                        </SecondaryNavItem>
                      )}
                      {appConsents && (
                        <SecondaryNavItem
                          onClick={navigate(history, `${Routes.APPS}/${appId}/consents`)}
                          active={isAppConsents}
                        >
                          App Consents
                        </SecondaryNavItem>
                      )}
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
              <ErrorBoundary>
                <Switch>
                  <Route path={Routes.APPS} exact component={AppsListPage} />
                  <Route path={Routes.APPS_NEW} exact component={AppsNewPage} />
                  <Route path={Routes.APPS_WELCOME} exact component={AppsWelcomePage} />
                  <Route path={Routes.APP_INSTALLATIONS} exact component={AppInstallationsPage} />
                  <Route path={Routes.APPS_EDIT} component={AppEditPage} />
                  <Route path={Routes.APPS_CONSENTS} component={AppConsentsPage} />
                  {hasPipelines && <Route path={Routes.APP_PIPELINE} component={AppPipelinePage} />}
                  <Route path={Routes.APP_DETAIL} component={AppsDetailPage} />
                </Switch>
              </ErrorBoundary>
            </PageContainer>
          </>
        )}
      </FlexContainer>
    </ErrorBoundary>
  )
}
