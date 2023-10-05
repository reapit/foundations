import React, { FC } from 'react'
import { useNavigate } from 'react-router'
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
import { Route, Routes, useLocation } from 'react-router-dom'
import SettingsPasswordPage from '../password'
import SettingsCompanyPage from '../company'
import SettingsMembersPage from '../members'
import SettingsProfilePage from '../profile'
import SettingsSubscriptionsPage from '../subscriptions'
import { Controls } from './controls'
import { useGlobalState } from '../../../core/use-global-state'

export const SettingsPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { globalDataState } = useGlobalState()
  const { currentMember } = globalDataState

  const { pathname } = location

  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <SecondaryNav className={elFadeIn}>
            <SecondaryNavItem
              onClick={navigateRoute(navigate, RoutePaths.SETTINGS_PROFILE)}
              active={pathname === RoutePaths.SETTINGS_PROFILE}
            >
              Profile
            </SecondaryNavItem>
            <SecondaryNavItem
              onClick={navigateRoute(navigate, RoutePaths.SETTINGS_PASSWORD)}
              active={pathname === RoutePaths.SETTINGS_PASSWORD}
            >
              Password
            </SecondaryNavItem>
            {currentMember?.role === 'admin' && (
              <>
                <SecondaryNavItem
                  onClick={navigateRoute(navigate, RoutePaths.SETTINGS_MEMBERS)}
                  active={pathname === RoutePaths.SETTINGS_MEMBERS}
                >
                  Members
                </SecondaryNavItem>
                <SecondaryNavItem
                  onClick={navigateRoute(navigate, RoutePaths.SETTINGS_COMPANY)}
                  active={pathname === RoutePaths.SETTINGS_COMPANY}
                >
                  Company
                </SecondaryNavItem>
                <SecondaryNavItem
                  onClick={navigateRoute(navigate, RoutePaths.SETTINGS_SUBSCRIPTIONS)}
                  active={pathname === RoutePaths.SETTINGS_SUBSCRIPTIONS}
                >
                  Subscriptions
                </SecondaryNavItem>
              </>
            )}
          </SecondaryNav>
          <Controls />
        </SecondaryNavContainer>
        <PageContainer className={elHFull}>
          <Routes>
            <Route path={RoutePaths.SETTINGS_PROFILE.replace('/settings/', '')} element={<SettingsProfilePage />} />
            <Route path={RoutePaths.SETTINGS_PASSWORD.replace('/settings/', '')} element={<SettingsPasswordPage />} />
            <Route path={RoutePaths.SETTINGS_MEMBERS.replace('/settings/', '')} element={<SettingsMembersPage />} />
            <Route path={RoutePaths.SETTINGS_COMPANY.replace('/settings/', '')} element={<SettingsCompanyPage />} />
            <Route
              path={RoutePaths.SETTINGS_SUBSCRIPTIONS.replace('/settings/', '')}
              element={<SettingsSubscriptionsPage />}
            />
          </Routes>
        </PageContainer>
      </FlexContainer>
    </ErrorBoundary>
  )
}
