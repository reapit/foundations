import React, { FC, useCallback } from 'react'
import { useNavigate, useLocation, Routes } from 'react-router'
import { Route } from 'react-router-dom'
import { RoutePaths } from '../../constants/routes'
import SettingsInstalled from './settings-installed'
import SettingsProfile from './settings-profile'
import {
  Button,
  elHFull,
  elMb5,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  SmallText,
} from '@reapit/elements'
import { navigateRoute } from '../../utils/navigation'
import { selectIsAdmin } from '../../utils/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { trackEvent } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'

export const handleLogout = (connectLogoutRedirect: () => void) => () => {
  trackEvent(TrackingEvent.ClickLogoutButton, true)
  connectLogoutRedirect()
}

export const SettingsPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { connectSession, connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const { pathname } = location
  const isAdmin = selectIsAdmin(connectSession)

  const logoutUser = useCallback(handleLogout(connectLogoutRedirect), [connectLogoutRedirect])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        {isAdmin && (
          <SecondaryNav>
            <SecondaryNavItem
              onClick={navigateRoute(navigate, RoutePaths.SETTINGS_PROFILE)}
              active={pathname === RoutePaths.SETTINGS_PROFILE}
            >
              Profile
            </SecondaryNavItem>
            <SecondaryNavItem
              onClick={navigateRoute(navigate, RoutePaths.SETTINGS_INSTALLED)}
              active={pathname.includes(RoutePaths.SETTINGS_INSTALLED)}
            >
              Installations
            </SecondaryNavItem>
          </SecondaryNav>
        )}
        <Icon className={elMb5} icon="reapitConnectInfographic" iconSize="large" />
        <SmallText hasGreyText>
          Here you can {!connectIsDesktop && 'change your password and '}find out about your current logged in profile.
          This can be useful if you are experiencing any permission related issues with your account.
        </SmallText>
        {isAdmin && (
          <SmallText hasGreyText>
            In addition as an admin, you can view details of your app installations and uninstall any live apps for all
            users in your organisation.
          </SmallText>
        )}
        <Button onClick={logoutUser} intent="primary" chevronRight>
          Logout
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Routes>
          <Route path={RoutePaths.SETTINGS_PROFILE.replace('/settings/', '')} element={<SettingsProfile />} />
          <Route path={RoutePaths.SETTINGS_INSTALLED.replace('/settings/', '')} element={<SettingsInstalled />} />
        </Routes>
      </PageContainer>
    </FlexContainer>
  )
}

export default SettingsPage
