import React, { FC, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Route } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import SettingsInstalled from './settings-installed'
import SettingsProfile from './settings-profile'
import {
  Button,
  elHFull,
  elMb5,
  elMb9,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  SmallText,
  Title,
} from '@reapit/elements'
import { navigate } from '../../utils/navigation'
import { selectIsAdmin } from '../../utils/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { trackEvent, TrackingEvent } from '../../core/analytics'

export const handleLogout = (connectLogoutRedirect: () => void) => () => {
  trackEvent(TrackingEvent.ClickLogoutButton, true)
  connectLogoutRedirect()
}

export const SettingsPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { connectSession, connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const { pathname } = location
  const isAdmin = selectIsAdmin(connectSession)

  const logoutUser = useCallback(handleLogout(connectLogoutRedirect), [connectLogoutRedirect])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Settings</Title>
        {isAdmin && (
          <SecondaryNav className={elMb9}>
            <SecondaryNavItem
              onClick={navigate(history, Routes.SETTINGS_PROFILE)}
              active={pathname === Routes.SETTINGS_PROFILE}
            >
              Profile
            </SecondaryNavItem>
            <SecondaryNavItem
              onClick={navigate(history, Routes.SETTINGS_INSTALLED)}
              active={pathname.includes(Routes.SETTINGS_INSTALLED)}
            >
              Installations
            </SecondaryNavItem>
          </SecondaryNav>
        )}
        <Icon className={elMb5} icon="reapitConnectInfographic" iconSize="large" />
        <SmallText hasGreyText>
          Here you can change your password and find out your current logged in profile. This can be useful if you are
          experiencing any permission related issues with your account.
        </SmallText>
        {isAdmin && (
          <SmallText hasGreyText>
            In addition as an admin, you can view details of your app installations and uninstall any live apps for all
            users in your organisation.
          </SmallText>
        )}
        <Button onClick={logoutUser} intent="critical" chevronRight>
          Logout
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Route path={Routes.SETTINGS_PROFILE} component={SettingsProfile} exact />
        <Route path={Routes.SETTINGS_INSTALLED} component={SettingsInstalled} exact />
      </PageContainer>
    </FlexContainer>
  )
}

export default SettingsPage
