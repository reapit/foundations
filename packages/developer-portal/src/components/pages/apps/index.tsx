import React, { FC, lazy } from 'react'
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
  ButtonGroup,
  useMediaQuery,
} from '@reapit/elements'
import { navigate, openNewPage, ExternalPages } from '../../../utils/navigation'
import { Route, useLocation } from 'react-router-dom'
import { catchChunkError, useReapitGet } from '@reapit/utils-react'
import { useReapitConnect } from '@reapit/connect-session'
import { getActions, GetActionNames } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { NoAppsLandingPage } from './no-apps-landing-page'

const AppsPage = lazy(() => catchChunkError(() => import('./apps')))
const AppsNewPage = lazy(() => catchChunkError(() => import('../apps-new')))
const AppsDetailPage = lazy(() => catchChunkError(() => import('../app-detail')))
const AppsEditPage = lazy(() => catchChunkError(() => import('../edit-app')))

export const handleOnChange = (history: History) => (page: number) => history.push(`${Routes.APPS}?page=${page}`)

export const Apps: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { isMobile } = useMediaQuery()
  const { pathname } = location
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const [apps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 1 },
    fetchWhenTrue: [developerId],
  })

  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        {appsLoading ? (
          <Loader fullPage />
        ) : apps?.totalCount ? (
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
              <FlexContainer isFlexJustifyBetween>
                <Title>My Apps</Title>
                {isMobile && (
                  <ButtonGroup alignment="right">
                    <Button intent="low" onClick={openNewPage(ExternalPages.developerPortalDocs)}>
                      Docs
                    </Button>
                  </ButtonGroup>
                )}
              </FlexContainer>
              <Route path={Routes.APPS} exact component={AppsPage} />
              <Route path={Routes.APPS_NEW} exact component={AppsNewPage} />
              <Route path={Routes.APPS_EDIT} exact component={AppsEditPage} />
              <Route path={Routes.APP_DETAIL} exact component={AppsDetailPage} />
            </PageContainer>
          </>
        ) : (
          <PageContainer>
            {pathname !== Routes.APPS_NEW && <NoAppsLandingPage />}
            <Route path={Routes.APPS_NEW} exact component={AppsNewPage} />
          </PageContainer>
        )}
      </FlexContainer>
    </ErrorBoundary>
  )
}

export default Apps
