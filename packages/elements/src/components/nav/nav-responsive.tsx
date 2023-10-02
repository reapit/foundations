import { cx } from '@linaria/core'
import React, { Dispatch, FC, Fragment, HTMLAttributes, ReactNode, SetStateAction } from 'react'
import { useNavState } from '../../hooks/use-nav-state'
import { useMediaQuery } from '../../hooks/use-media-query'
import { Icon, IconNames } from '../icon'
import { Nav, NavItem, NavSubNav, NavSubNavItem } from './nav'
import {
  elNavItemActive,
  elNavItemExpanded,
  elNavItemHideDesktop,
  elNavSubItemActive,
  elNavSubItemExpanded,
} from './__styles__'
import { elMlAuto, elMr2 } from '../../styles/spacing'
import { generateRandomId } from '../../storybook/random-id'

export type NavResponsiveItemType = 'ICON' | 'ITEM' | 'SECONDARY'

export interface NavResponsiveOption {
  itemIndex: number
  isSecondary?: boolean
  callback?: () => void
  text?: string
  href?: string
  subItems?: NavResponsiveOption[]
  /* Deprecated unless the isSecondary boolean is set - to be removed in v5 */
  icon?: ReactNode
  /* Deprecated unless the isSecondary boolean is set - to be removed in v5 */
  iconId?: IconNames
}

export interface NavResponsiveProps extends HTMLAttributes<HTMLDivElement> {
  options: NavResponsiveOption[]
  defaultNavIndex?: number
  defaultNavSubIndex?: number // deprecated
}

export type LogoIcon = 'reapitLogoSelectedMenu' | 'reapitLogoMenu'

export const handleToggleLogo = (logoState: LogoIcon, setLogoState: Dispatch<SetStateAction<LogoIcon>>) => () => {
  const newState = logoState === 'reapitLogoSelectedMenu' ? 'reapitLogoMenu' : 'reapitLogoSelectedMenu'
  setLogoState(newState)
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
  const { navItemIndex, navSubItemIndex, navMenuOpen } = navState

  return (
    <Nav className={cx(className)} {...rest}>
      {options.map(
        (
          { icon, iconId, href, callback, isSecondary, text, subItems, itemIndex }: NavResponsiveOption,
          index: number,
        ) => {
          const hasSubItems = subItems && subItems.length > 0
          if (!index) {
            return (
              <NavItem className={cx(navItemIndex === itemIndex && elNavItemActive)} key={itemIndex} href={href}>
                <Icon
                  className={cx(elMr2)}
                  icon="appLauncherMenu"
                  fontSize="1.5rem"
                  onClick={() => (window.location.href = 'https://marketplace.reapit.cloud/installed')}
                />
                {icon ? (
                  icon
                ) : iconId ? (
                  <Icon iconSize="medium" icon={iconId} />
                ) : (
                  <Icon height="24px" width="100px" icon="reapitLogoInfographic" />
                )}
                <Icon
                  className={cx(elMlAuto, elMr2, elNavItemHideDesktop)}
                  icon="moreSolidSystem"
                  fontSize="1.2rem"
                  intent={navMenuOpen ? 'primary' : 'default'}
                  onClick={setNavState({
                    navMenuOpen: !navMenuOpen,
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
                  hasSubItems
                    ? setNavState({
                        navItemIndex: itemIndex,
                        navSubItemIndex: navItemIndex === itemIndex && navSubItemIndex ? navSubItemIndex : 0,
                        callback,
                      })
                    : setNavState({ navItemIndex: itemIndex, callback, navMenuOpen: !navMenuOpen })
                }
              >
                {(!isSecondary || isMobile) && text}
                {isSecondary && !isMobile && icon ? (
                  icon
                ) : isSecondary && !isMobile && iconId ? (
                  <Icon fontSize="32px" icon={iconId} />
                ) : null}
                {hasSubItems && isMobile && (
                  <Icon
                    className={elMlAuto}
                    icon={navMenuOpen && navItemIndex === itemIndex ? 'upSystem' : 'downSystem'}
                    height="16px"
                    width="16px"
                  />
                )}
              </NavItem>
              {hasSubItems && (
                <NavSubNav key={generateRandomId()}>
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
                            navMenuOpen && navItemIndex === itemIndex && elNavSubItemExpanded,
                          )}
                          href={innerHref}
                          key={innerItemIndex}
                          onClick={setNavState({
                            navSubItemIndex: innerItemIndex,
                            callback: innerCallback,
                            navMenuOpen: !navMenuOpen,
                          })}
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
