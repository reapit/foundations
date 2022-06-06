import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Route } from 'react-router-dom'
import { Routes } from '../../constants/routes'
import SettingsInstalled from './settings-installed'
import SettingsProfile from './settings-profile'
import {
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

export const SettingsPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Settings</Title>
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
        <Icon className={elMb5} icon="reapitConnectInfographic" iconSize="large" />
        <SmallText hasGreyText>Settings controls and filters</SmallText>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Route path={Routes.SETTINGS_PROFILE} component={SettingsProfile} exact />
        <Route path={Routes.SETTINGS_INSTALLED} component={SettingsInstalled} exact />
      </PageContainer>
    </FlexContainer>
  )
}

export default SettingsPage
