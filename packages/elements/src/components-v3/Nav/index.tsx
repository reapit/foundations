import React, { AnchorHTMLAttributes, HTMLAttributes, FC } from 'react'
import { cx } from 'linaria'
import { ElNavContainer, ElNavItem, elNavItemSecondary } from './__styles__'

export interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  isSecondary?: boolean
}

export interface NavProps extends HTMLAttributes<HTMLDivElement> {}

export const NavItem: FC<NavItemProps> = ({ isSecondary, children, className, ...rest }) => {
  const combinedClasses = cx(isSecondary && elNavItemSecondary, className)

  return (
    <ElNavItem className={combinedClasses} {...rest}>
      {children}
    </ElNavItem>
  )
}

export const Nav: FC<NavProps> = ({ children, ...rest }) => <ElNavContainer {...rest}>{children}</ElNavContainer>
