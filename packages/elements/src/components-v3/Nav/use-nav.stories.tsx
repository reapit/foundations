import React from 'react'
import { useNavState } from '../../hooks/use-nav-state'
import { useMediaQuery } from '../../hooks/use-media-query'
import { elNavSubItemExpanded, elNavItemActive, elNavSubItemActive, elNavItemExpanded } from './__styles__/index'
import { Nav, NavItem, NavSubItem, NavSubNav } from './index'
import { Icon } from '../Icon'
import { cx } from 'linaria'
import { elIntentNeutral } from '../../styles-v3/base/intent'
import { elMLAuto, elMr2 } from '../../styles-v3/base/spacing'

export const UseNavStory = () => {
  const { navState, setNavState } = useNavState(1)
  const { navItemIndex } = navState
  const navigate = () => console.log('Navigating - dispatch to React router or similar')
  const logOut = () => console.log('Logging the user out')

  return (
    <Nav>
      <NavItem
        className={cx(navItemIndex === 0 && elNavItemActive)}
        onClick={setNavState({
          navItemIndex: 0,
          callback: navigate,
        })}
      >
        <Icon icon="reapitHouse" />
      </NavItem>
      <NavItem
        className={cx(navItemIndex === 1 && elNavItemActive)}
        onClick={setNavState({
          navItemIndex: 1,
          callback: navigate,
        })}
      >
        <Icon icon="apps" />
        Apps
      </NavItem>
      <NavItem
        className={cx(navItemIndex === 2 && elNavItemActive)}
        onClick={setNavState({
          navItemIndex: 2,
          callback: navigate,
        })}
      >
        <Icon icon="analytics" />
        Analytics
      </NavItem>
      <NavItem href="https://marketplace.reapit.cloud">
        <Icon icon="marketplace" />
        Marketplace
      </NavItem>
      <NavItem
        onClick={setNavState({
          navItemIndex: 4,
          callback: logOut,
        })}
        isSecondary
      >
        <Icon icon="logout" />
        Logout
      </NavItem>
    </Nav>
  )
}

export const UseNavMobileSubMenuStory = () => {
  const { navState, setNavState } = useNavState(1)
  const { isMobile } = useMediaQuery()
  const { navItemIndex, navMenuOpen, navSubMenuOpen, navSubItemIndex } = navState
  const navigate = () => console.log('Navigating - dispatch to React router or similar')
  const logOut = () => console.log('Logging the user out')

  return (
    <Nav>
      <NavItem
        className={cx(navItemIndex === 0 && elNavItemActive)}
        onClick={setNavState({
          navItemIndex: 0,
          callback: navigate,
        })}
      >
        <Icon icon={isMobile ? 'reapitLogo' : 'reapitHouse'} />
        {isMobile && (
          <Icon
            className={cx(elIntentNeutral, elMLAuto, elMr2)}
            icon={navMenuOpen ? 'hamburgerOpen' : 'hamburger'}
            onClick={setNavState({
              navMenuOpen: !navMenuOpen,
              navSubMenuOpen: false,
            })}
          />
        )}
      </NavItem>
      <NavItem
        className={cx(navItemIndex === 1 && elNavItemActive, navMenuOpen && elNavItemExpanded)}
        onClick={
          isMobile
            ? setNavState({ navItemIndex: 1, navSubMenuOpen: !navSubMenuOpen })
            : setNavState({ navItemIndex: 1, callback: navigate })
        }
      >
        <Icon icon="apps" />
        Apps
        {isMobile && <Icon className={cx(elIntentNeutral, elMLAuto)} icon={navSubMenuOpen ? 'arrowUp' : 'arrowDown'} />}
      </NavItem>
      <NavSubNav>
        <NavSubItem
          className={cx(navSubItemIndex === 0 && elNavSubItemActive, navSubMenuOpen && elNavSubItemExpanded)}
          onClick={setNavState({ navSubItemIndex: 0, callback: navigate })}
        >
          <span>App List</span>
        </NavSubItem>
        <NavSubItem
          className={cx(navSubItemIndex === 1 && elNavSubItemActive, navSubMenuOpen && elNavSubItemExpanded)}
          onClick={setNavState({ navSubItemIndex: 1, callback: navigate })}
        >
          <span>Create App</span>
        </NavSubItem>
      </NavSubNav>
      <NavItem
        className={cx(navItemIndex === 2 && elNavItemActive, navMenuOpen && elNavItemExpanded)}
        onClick={setNavState({ navItemIndex: 2, callback: navigate })}
      >
        <Icon icon="analytics" />
        Analytics
      </NavItem>
      <NavItem className={cx(navMenuOpen && elNavItemExpanded)} href="https://marketplace.reapit.cloud">
        <Icon icon="marketplace" />
        Marketplace
      </NavItem>
      <NavItem
        className={cx(navMenuOpen && elNavItemExpanded)}
        onClick={setNavState({ navItemIndex: 4, callback: logOut })}
        isSecondary
      >
        <Icon icon="logout" />
        Logout
      </NavItem>
    </Nav>
  )
}
