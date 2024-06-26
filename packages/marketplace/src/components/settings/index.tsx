import React, { FC } from 'react'
import { useNavigate, useLocation, Routes } from 'react-router'
import { Route } from 'react-router-dom'
import { RoutePaths } from '../../constants/routes'
import SettingsInstalled from './settings-installed'
import SettingsProfile from './settings-profile'
import {
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
import { selectIsAdmin, selectIsDeveloper } from '../../utils/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const SettingsPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const { pathname } = location
  const isDevOrAdmin = selectIsAdmin(connectSession) || selectIsDeveloper(connectSession)

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        {isDevOrAdmin && (
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
        {isDevOrAdmin && (
          <SmallText hasGreyText>
            In addition as an admin, you can view details of your app installations and uninstall any live apps for all
            users in your organisation.
          </SmallText>
        )}
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
