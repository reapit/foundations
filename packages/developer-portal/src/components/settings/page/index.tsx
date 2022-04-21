import React, { FC } from 'react'
import { useHistory } from 'react-router'
import ErrorBoundary from '../../../core/error-boundary'
import Routes from '../../../constants/routes'
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
import { navigate } from '../../../utils/navigation'
import { Route, Switch, useLocation } from 'react-router-dom'
import SettingsPasswordPage from '../password'
import SettingsCompanyPage from '../company'
import SettingsMembersPage from '../members'
import SettingsProfilePage from '../profile'
import SettingsSubscriptionsPage from '../subscriptions'
import { Controls } from './controls'
import { cx } from '@linaria/core'
import { useGlobalState } from '../../../core/use-global-state'

export const SettingsPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { globalDataState } = useGlobalState()
  const { currentMember } = globalDataState

  const { pathname } = location

  return (
    <ErrorBoundary>
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <Title>Settings</Title>
          <SecondaryNav className={cx(elMb8, elFadeIn)}>
            <SecondaryNavItem
              onClick={navigate(history, Routes.SETTINGS_PROFILE)}
              active={pathname === Routes.SETTINGS_PROFILE}
            >
              Profile
            </SecondaryNavItem>
            <SecondaryNavItem
              onClick={navigate(history, Routes.SETTINGS_PASSWORD)}
              active={pathname === Routes.SETTINGS_PASSWORD}
            >
              Password
            </SecondaryNavItem>
            {currentMember?.role === 'admin' && (
              <>
                <SecondaryNavItem
                  onClick={navigate(history, Routes.SETTINGS_MEMBERS)}
                  active={pathname === Routes.SETTINGS_MEMBERS}
                >
                  Members
                </SecondaryNavItem>
                <SecondaryNavItem
                  onClick={navigate(history, Routes.SETTINGS_COMPANY)}
                  active={pathname === Routes.SETTINGS_COMPANY}
                >
                  Company
                </SecondaryNavItem>
                <SecondaryNavItem
                  onClick={navigate(history, Routes.SETTINGS_SUBSCRIPTIONS)}
                  active={pathname === Routes.SETTINGS_SUBSCRIPTIONS}
                >
                  Subscriptions
                </SecondaryNavItem>
              </>
            )}
          </SecondaryNav>
          <Controls />
        </SecondaryNavContainer>
        <PageContainer className={elHFull}>
          <Switch>
            <Route path={Routes.SETTINGS_PROFILE} exact component={SettingsProfilePage} />
            <Route path={Routes.SETTINGS_PASSWORD} exact component={SettingsPasswordPage} />
            <Route path={Routes.SETTINGS_MEMBERS} exact component={SettingsMembersPage} />
            <Route path={Routes.SETTINGS_COMPANY} exact component={SettingsCompanyPage} />
            <Route path={Routes.SETTINGS_SUBSCRIPTIONS} exact component={SettingsSubscriptionsPage} />
          </Switch>
        </PageContainer>
      </FlexContainer>
    </ErrorBoundary>
  )
}
