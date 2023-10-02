import React, { FC } from 'react'
import ErrorBoundary from '../../../core/error-boundary'
import RoutePaths from '../../../constants/routes'
import {
  elFadeIn,
  elHFull,
  FlexContainer,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
} from '@reapit/elements'
import { navigateRoute } from '../../../utils/navigation'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import AnalyticsCostsPage from '../costs'
import AnalyticsCalculatorPage from '../calculator'
import AnalyticsInstallationsPage from '../installations'
import AnalyticsCallsPage from '../calls'
import { Controls } from './controls'
import { selectIsCustomer } from '../../../utils/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

export const AnalyticsPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { pathname } = location
  const isCustomer = selectIsCustomer(connectSession)

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <SecondaryNav className={elFadeIn}>
          <SecondaryNavItem
            onClick={navigateRoute(navigate, RoutePaths.ANALYTICS_API_CALLS)}
            active={pathname === RoutePaths.ANALYTICS_API_CALLS}
          >
            API Usage
          </SecondaryNavItem>
          <SecondaryNavItem
            onClick={navigateRoute(navigate, RoutePaths.ANALYTICS_COSTS)}
            active={pathname === RoutePaths.ANALYTICS_COSTS}
          >
            Costs
          </SecondaryNavItem>
          <SecondaryNavItem
            onClick={navigateRoute(navigate, RoutePaths.ANALYTICS_INSTALLATIONS)}
            active={pathname === RoutePaths.ANALYTICS_INSTALLATIONS}
          >
            Installations
          </SecondaryNavItem>
          {isCustomer && (
            <SecondaryNavItem
              onClick={navigateRoute(navigate, RoutePaths.ANALYTICS_COST_CALCULATOR)}
              active={pathname === RoutePaths.ANALYTICS_COST_CALCULATOR}
            >
              Cost Calculator
            </SecondaryNavItem>
          )}
        </SecondaryNav>
        <Controls />
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <ErrorBoundary>
          <Routes>
            <Route path={RoutePaths.ANALYTICS_API_CALLS.replace('/analytics/', '')} element={<AnalyticsCallsPage />} />
            <Route path={RoutePaths.ANALYTICS_COSTS.replace('/analytics/', '')} element={<AnalyticsCostsPage />} />
            <Route
              path={RoutePaths.ANALYTICS_INSTALLATIONS.replace('/analytics/', '')}
              element={<AnalyticsInstallationsPage />}
            />
            <Route
              path={RoutePaths.ANALYTICS_COST_CALCULATOR.replace('/analytics/', '')}
              element={<AnalyticsCalculatorPage />}
            />
          </Routes>
        </ErrorBoundary>
      </PageContainer>
    </FlexContainer>
  )
}
