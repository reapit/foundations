import React from 'react'
import { useNavState } from '../../hooks/use-nav-state'
import { elNavItemActive } from './__styles__/index'
import { Nav, NavItem } from './index'
import { Icon } from '../Icon'
import { cx } from 'linaria'

export const UseNavStory = () => {
  const { navState, setNavState } = useNavState()
  const { navItemId } = navState
  const navigate = () => console.log('Navigating - dispatch to React router or similar')
  const logOut = () => console.log('Logging the user out')

  return (
    <Nav>
      <NavItem className={cx(navItemId === 'ICON' && elNavItemActive)} onClick={setNavState('ICON', navigate)}>
        <Icon icon="reapitHouse" />
      </NavItem>
      <NavItem className={cx(navItemId === 'APPS' && elNavItemActive)} onClick={setNavState('APPS', navigate)}>
        <Icon icon="apps" />
        Apps
      </NavItem>
      <NavItem
        className={cx(navItemId === 'ANALYTICS' && elNavItemActive)}
        onClick={setNavState('ANALYTICS', navigate)}
      >
        <Icon icon="analytics" />
        Analytics
      </NavItem>
      <NavItem href="https://marketplace.reapit.cloud">
        <Icon icon="marketplace" />
        Marketplace
      </NavItem>
      <NavItem onClick={setNavState('LOGOUT', logOut)} isSecondary>
        <Icon icon="logout" />
        Logout
      </NavItem>
    </Nav>
  )
}
