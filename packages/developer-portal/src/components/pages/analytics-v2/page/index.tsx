import React, { FC } from 'react'
import { useHistory } from 'react-router'
import ErrorBoundary from '../../../hocs/error-boundary'
import Routes from '../../../../constants/routes'
import {
  elFadeIn,
  elHFull,
  elMb8,
  FlexContainer,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Title,
} from '@reapit/elements'
import { navigate } from '../../../../utils/navigation'
import { Route, Switch, useLocation } from 'react-router-dom'
import AnalyticsCostsPage from '../costs'
import AnalyticsCalculatorPage from '../calculator'
import AnalyticsInstallationsPage from '../installations'
import AnalyticsCallsPage from '../calls'
import { Controls } from './controls'
import { cx } from '@linaria/core'
import { selectIsCustomer } from '../../../../selector/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'

export const AnalyticsPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { pathname } = location
  const isCustomer = selectIsCustomer(connectSession)

  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <Title>Analytics</Title>
          <SecondaryNav className={cx(elMb8, elFadeIn)}>
            <SecondaryNavItem
              onClick={navigate(history, Routes.ANALYTICS_V2_API_CALLS)}
              active={pathname === Routes.ANALYTICS_V2_API_CALLS}
            >
              API Usage
            </SecondaryNavItem>
            <SecondaryNavItem
              onClick={navigate(history, Routes.ANALYTICS_V2_COSTS)}
              active={pathname === Routes.ANALYTICS_V2_COSTS}
            >
              Costs
            </SecondaryNavItem>
            <SecondaryNavItem
              onClick={navigate(history, Routes.ANALYTICS_V2_INSTALLATIONS)}
              active={pathname === Routes.ANALYTICS_V2_INSTALLATIONS}
            >
              Installations
            </SecondaryNavItem>
            {isCustomer && (
              <SecondaryNavItem
                onClick={navigate(history, Routes.ANALYTICS_V2_COST_CALCULATOR)}
                active={pathname === Routes.ANALYTICS_V2_COST_CALCULATOR}
              >
                Cost Calculator
              </SecondaryNavItem>
            )}
          </SecondaryNav>
          <Controls />
        </SecondaryNavContainer>
        <PageContainer className={elHFull}>
          <Switch>
            <Route path={Routes.ANALYTICS_V2_API_CALLS} exact component={AnalyticsCallsPage} />
            <Route path={Routes.ANALYTICS_V2_COSTS} exact component={AnalyticsCostsPage} />
            <Route path={Routes.ANALYTICS_V2_INSTALLATIONS} exact component={AnalyticsInstallationsPage} />
            <Route path={Routes.ANALYTICS_V2_COST_CALCULATOR} exact component={AnalyticsCalculatorPage} />
          </Switch>
        </PageContainer>
      </FlexContainer>
    </ErrorBoundary>
  )
}
