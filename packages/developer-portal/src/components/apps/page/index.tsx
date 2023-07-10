import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import ErrorBoundary from '../../../core/error-boundary'
import RoutePaths from '../../../constants/routes'
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
} from '@reapit/elements'
import { navigateRoute } from '../../../utils/navigation'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
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
import { checkShouldRenderConsents } from '../utils/consents'
import { PusherEventWrapper } from './pusher-event-wrapper'

export const AppsPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const { appsDataState, appId, appEditState } = useAppState()
  const { globalDataState } = useGlobalState()
  const { currentDeveloper } = globalDataState
  const { appLatestRevision, appHasInstallations } = appEditState

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
    process.env.pipelineWhitelist.includes(currentDeveloper.id) &&
    appDetail?.authFlow !== 'clientCredentials'

  const shouldRenderConsents = checkShouldRenderConsents(appDetail, appLatestRevision, appHasInstallations)

  return (
    <ErrorBoundary>
      <PusherEventWrapper>
        <FlexContainer isFlexAuto>
          {appsLoading || !apps ? (
            <>
              <PageContainer className={elHFull}>
                <Loader />
              </PageContainer>
            </>
          ) : !apps.totalCount && !isAppsWelcome && isAppsList ? (
            <Navigate to={RoutePaths.APPS_WELCOME} />
          ) : (
            <>
              {Boolean(apps.totalCount) && (
                <SecondaryNavContainer>
                  <SecondaryNav className={cx(elMb8, elFadeIn)}>
                    <SecondaryNavItem onClick={navigateRoute(navigate, RoutePaths.APPS)} active={isAppsList}>
                      My Apps
                    </SecondaryNavItem>
                    {(isAppsEdit || isAppsDetail || isAppsInstallations || isAppPipelines || isAppConsents) && (
                      <>
                        <SecondaryNavItem
                          onClick={navigateRoute(navigate, `${RoutePaths.APPS}/${appId}`)}
                          active={isAppsDetail}
                        >
                          App Details
                        </SecondaryNavItem>
                        <SecondaryNavItem
                          onClick={navigateRoute(navigate, `${RoutePaths.APPS}/${appId}/edit/general`)}
                          active={isAppsEdit}
                        >
                          Edit App
                        </SecondaryNavItem>
                        <SecondaryNavItem
                          onClick={navigateRoute(navigate, `${RoutePaths.APPS}/${appId}/installations`)}
                          active={isAppsInstallations}
                        >
                          Installations
                        </SecondaryNavItem>
                        {hasPipelines && (
                          <SecondaryNavItem
                            onClick={navigateRoute(navigate, `${RoutePaths.APPS}/${appId}/pipeline`)}
                            active={isAppPipelines}
                          >
                            Pipeline
                          </SecondaryNavItem>
                        )}
                        {shouldRenderConsents && (
                          <SecondaryNavItem
                            onClick={navigateRoute(navigate, `${RoutePaths.APPS}/${appId}/consents`)}
                            active={isAppConsents}
                          >
                            App Consents
                          </SecondaryNavItem>
                        )}
                      </>
                    )}
                    <SecondaryNavItem onClick={navigateRoute(navigate, RoutePaths.APPS_NEW)} active={isAppsNew}>
                      New App
                    </SecondaryNavItem>
                  </SecondaryNav>
                  <Helper />
                </SecondaryNavContainer>
              )}
              <PageContainer className={elHFull}>
                <ErrorBoundary>
                  <Routes>
                    <Route index element={<AppsListPage />} />
                    <Route path={RoutePaths.APPS_NEW.replace('/apps/', '')} element={<AppsNewPage />} />
                    <Route path={RoutePaths.APPS_WELCOME.replace('/apps/', '')} element={<AppsWelcomePage />} />
                    <Route
                      path={RoutePaths.APP_INSTALLATIONS.replace('/apps/', '')}
                      element={<AppInstallationsPage />}
                    />
                    <Route path={`${RoutePaths.APPS_EDIT.replace('/apps/', '')}/*`} element={<AppEditPage />} />
                    <Route path={RoutePaths.APPS_CONSENTS.replace('/apps/', '')} element={<AppConsentsPage />} />
                    {hasPipelines && (
                      <Route
                        path={`${RoutePaths.APP_PIPELINE.replace('/apps/', '')}/*`}
                        element={<AppPipelinePage />}
                      />
                    )}
                    <Route path={RoutePaths.APP_DETAIL.replace('/apps/', '')} element={<AppsDetailPage />} />
                  </Routes>
                </ErrorBoundary>
              </PageContainer>
            </>
          )}
        </FlexContainer>
      </PusherEventWrapper>
    </ErrorBoundary>
  )
}
