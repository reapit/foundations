import { cx } from '@linaria/core'
import React, { FC, Fragment, HTMLAttributes, ReactNode } from 'react'
import { useNavState } from '../../hooks/use-nav-state'
import { useMediaQuery } from '../../hooks/use-media-query'
import { elIntentNeutral } from '../../styles/intent'
import { Icon, IconNames } from '../icon'
import { Nav, NavItem, NavSubNav, NavSubNavItem } from './nav'
import {
  elNavIsDesktop,
  elNavItemActive,
  elNavItemExpanded,
  elNavItemHideDesktop,
  elNavItemIcon,
  elNavSubItemActive,
  elNavSubItemExpanded,
} from './__styles__'
import { elMLAuto, elMr2 } from '../../styles/spacing'

export type NavResponsiveItemType = 'ICON' | 'ITEM' | 'SECONDARY'

export interface NavResponsiveOption {
  itemIndex: number
  isSecondary?: boolean
  icon?: ReactNode
  iconId?: IconNames
  callback?: () => void
  text?: string
  href?: string
  subItems?: NavResponsiveOption[]
}

export interface NavResponsiveProps extends HTMLAttributes<HTMLDivElement> {
  options: NavResponsiveOption[]
  defaultNavIndex?: number
  defaultNavSubIndex?: number
}

export const NavResponsive: FC<NavResponsiveProps> = ({
  options,
  className,
  defaultNavIndex,
  defaultNavSubIndex,
  ...rest
}) => {
  const { navState, setNavState } = useNavState(defaultNavIndex, defaultNavSubIndex)
  const { isMobile } = useMediaQuery()
  const { navItemIndex, navMenuOpen, navSubItemIndex, navSubMenuIndex } = navState
  const isDesktop = Boolean(window['__REAPIT_MARKETPLACE_GLOBALS__'])

  return (
    <Nav className={cx(isDesktop && elNavIsDesktop, className && className)} {...rest}>
      {options.map(
        (
          { icon, iconId, href, callback, isSecondary, text, subItems, itemIndex }: NavResponsiveOption,
          index: number,
        ) => {
          if (!index) {
            return (
              <NavItem
                className={cx(navItemIndex === itemIndex && elNavItemActive)}
                key={itemIndex}
                href={href}
                onClick={setNavState({
                  navItemIndex: itemIndex,
                  callback,
                })}
              >
                {icon ? (
                  icon
                ) : iconId ? (
                  <Icon iconSize="medium" className={elNavItemIcon} icon={iconId} />
                ) : (
                  <Icon
                    fontSize={isMobile ? '7rem' : '2.5rem'}
                    className={elNavItemIcon}
                    icon={isMobile ? 'reapitLogoTextMenu' : 'reapitLogoMenu'}
                  />
                )}
                {text}
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
            )
          }

          return (
            <Fragment key={itemIndex}>
              <NavItem
                className={cx(navItemIndex === itemIndex && elNavItemActive, navMenuOpen && elNavItemExpanded)}
                href={href}
                isSecondary={isSecondary}
                onClick={
                  isMobile
                    ? setNavState({
                        navItemIndex: itemIndex,
                        navSubMenuIndex: navMenuOpen && navSubMenuIndex === itemIndex ? null : itemIndex,
                        navSubItemIndex: navMenuOpen && navSubMenuIndex === itemIndex ? null : navSubItemIndex,
                        callback,
                      })
                    : setNavState({ navItemIndex: itemIndex, callback })
                }
              >
                {icon ? icon : iconId ? <Icon iconSize="medium" className={elNavItemIcon} icon={iconId} /> : ''}
                {text}
                {isMobile && subItems && (
                  <Icon
                    className={cx(elIntentNeutral, elMLAuto)}
                    icon={navSubMenuIndex === itemIndex ? 'arrowUpSystem' : 'arrowDownSystem'}
                  />
                )}
              </NavItem>
              {subItems && subItems.length && (
                <NavSubNav key={Math.floor(Math.random() * 1)}>
                  {subItems.map(
                    ({
                      callback: innerCallback,
                      text: innerText,
                      href: innerHref,
                      itemIndex: innerItemIndex,
                    }: NavResponsiveOption) => {
                      return (
                        <NavSubNavItem
                          className={cx(
                            navSubItemIndex === innerItemIndex && elNavSubItemActive,
                            navSubMenuIndex === itemIndex && elNavSubItemExpanded,
                          )}
                          href={innerHref}
                          key={innerItemIndex}
                          onClick={setNavState({ navSubItemIndex: innerItemIndex, callback: innerCallback })}
                        >
                          <span>{innerText}</span>
                        </NavSubNavItem>
                      )
                    },
                  )}
                </NavSubNav>
              )}
            </Fragment>
          )
        },
      )}
    </Nav>
  )
}
