import React from 'react'
import { useNavState } from '../../hooks/use-nav-state'
import { useMediaQuery } from '../../hooks/use-media-query'
import {
  elNavSubItemExpanded,
  elNavItemActive,
  elNavSubItemActive,
  elNavItemExpanded,
  elNavItemHideDesktop,
  elNavItemIcon,
} from './__styles__/index'
import { Nav, NavItem, NavSubNavItem, NavSubNav } from './nav'
import { Icon } from '../icon'
import { cx } from 'linaria'
import { elIntentNeutral } from '../../styles/intent'
import { elMLAuto, elMr2 } from '../../styles/spacing'

export const UseNavStory = () => {
  const { navState, setNavState } = useNavState(1)
  const { navItemIndex, navMenuOpen } = navState
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
        <Icon iconSize="medium" className={elNavItemIcon} icon="reapitLogoMenu" />
        <Icon
          className={cx(elIntentNeutral, elMLAuto, elMr2, elNavItemHideDesktop)}
          icon={navMenuOpen ? 'hamburgerOpenMenu' : 'hamburgerMenu'}
          fontSize="2rem"
          onClick={setNavState({
            navMenuOpen: !navMenuOpen,
          })}
        />
      </NavItem>
      <NavItem
        className={cx(navItemIndex === 1 && elNavItemActive, navMenuOpen && elNavItemExpanded)}
        onClick={setNavState({ navItemIndex: 1, callback: navigate })}
      >
        <Icon iconSize="medium" icon="appsMenu" />
        Apps
      </NavItem>
      <NavItem
        className={cx(navItemIndex === 2 && elNavItemActive, navMenuOpen && elNavItemExpanded)}
        onClick={setNavState({ navItemIndex: 2, callback: navigate })}
      >
        <Icon iconSize="medium" icon="analyticsMenu" />
        Analytics
      </NavItem>
      <NavItem className={cx(navMenuOpen && elNavItemExpanded)} href="https://marketplace.reapit.cloud">
        <Icon iconSize="medium" icon="marketplaceMenu" />
        Marketplace
      </NavItem>
      <NavItem
        className={cx(navMenuOpen && elNavItemExpanded)}
        onClick={setNavState({ navItemIndex: 4, callback: logOut })}
        isSecondary
      >
        <Icon iconSize="medium" icon="logoutMenu" />
        Logout
      </NavItem>
    </Nav>
  )
}

export const UseNavMobileSubMenuStory = () => {
  const { navState, setNavState } = useNavState(1)
  const { isMobile } = useMediaQuery()
  const { navItemIndex, navMenuOpen, navSubItemIndex, navSubMenuIndex } = navState
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
        <Icon
          className={elNavItemIcon}
          icon={isMobile ? 'reapitLogoTextMenu' : 'reapitLogoMenu'}
          fontSize={isMobile ? '7rem' : '2.5rem'}
        />
        <Icon
          className={cx(elIntentNeutral, elMLAuto, elMr2, elNavItemHideDesktop)}
          icon={navMenuOpen ? 'hamburgerOpenMenu' : 'hamburgerMenu'}
          fontSize="2rem"
          onClick={setNavState({
            navMenuOpen: !navMenuOpen,
            navSubMenuIndex: null,
          })}
        />
      </NavItem>
      <NavItem
        className={cx(navItemIndex === 1 && elNavItemActive, navMenuOpen && elNavItemExpanded)}
        onClick={
          isMobile
            ? setNavState({
                navItemIndex: 1,
                navSubMenuIndex: navMenuOpen && navSubMenuIndex === 0 ? null : 0,
              })
            : setNavState({ navItemIndex: 1, callback: navigate })
        }
      >
        <Icon iconSize="medium" icon="appsMenu" />
        Apps
        {isMobile && (
          <Icon
            className={cx(elIntentNeutral, elMLAuto)}
            icon={navSubMenuIndex === 0 ? 'arrowUpSystem' : 'arrowDownSystem'}
          />
        )}
      </NavItem>
      <NavSubNav>
        <NavSubNavItem
          className={cx(navSubItemIndex === 0 && elNavSubItemActive, navSubMenuIndex === 0 && elNavSubItemExpanded)}
          onClick={setNavState({ navSubItemIndex: 0, callback: navigate })}
        >
          <span>App List</span>
        </NavSubNavItem>
        <NavSubNavItem
          className={cx(navSubItemIndex === 1 && elNavSubItemActive, navSubMenuIndex === 0 && elNavSubItemExpanded)}
          onClick={setNavState({ navSubItemIndex: 1, callback: navigate })}
        >
          <span>Create App</span>
        </NavSubNavItem>
      </NavSubNav>
      <NavItem
        className={cx(navItemIndex === 2 && elNavItemActive, navMenuOpen && elNavItemExpanded)}
        onClick={
          isMobile
            ? setNavState({
                navItemIndex: 2,
                navSubMenuIndex: navMenuOpen && navSubMenuIndex === 1 ? null : 1,
              })
            : setNavState({ navItemIndex: 2, callback: navigate })
        }
      >
        <Icon iconSize="medium" icon="analyticsMenu" />
        Analytics
        {isMobile && (
          <Icon
            className={cx(elIntentNeutral, elMLAuto)}
            icon={navSubMenuIndex === 1 ? 'arrowUpSystem' : 'arrowDownSystem'}
          />
        )}
      </NavItem>
      <NavSubNav>
        <NavSubNavItem
          className={cx(navSubItemIndex === 2 && elNavSubItemActive, navSubMenuIndex === 1 && elNavSubItemExpanded)}
          onClick={setNavState({ navSubItemIndex: 2, callback: navigate })}
        >
          <span>Hits Per Day</span>
        </NavSubNavItem>
        <NavSubNavItem
          className={cx(navSubItemIndex === 3 && elNavSubItemActive, navSubMenuIndex === 1 && elNavSubItemExpanded)}
          onClick={setNavState({ navSubItemIndex: 3, callback: navigate })}
        >
          <span>Weekly Hits</span>
        </NavSubNavItem>
      </NavSubNav>
      <NavItem className={cx(navMenuOpen && elNavItemExpanded)} href="https://marketplace.reapit.cloud">
        <Icon iconSize="medium" icon="marketplaceMenu" />
        Marketplace
      </NavItem>
      <NavItem
        className={cx(navMenuOpen && elNavItemExpanded)}
        onClick={setNavState({ navItemIndex: 4, callback: logOut })}
        isSecondary
      >
        <Icon iconSize="medium" icon="logoutMenu" />
        Logout
      </NavItem>
    </Nav>
  )
}
