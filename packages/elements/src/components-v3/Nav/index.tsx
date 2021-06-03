import React, { FC } from 'react'
import { cx } from 'linaria'
import { ElNavContainer, ElNavItem, elNavItemSecondary } from './__styles__'

export interface NavItemProps {
  isSecondary?: boolean
}

export const NavItem: FC<NavItemProps> = ({ isSecondary, children }) => {
  const combinedClasses = cx(isSecondary && elNavItemSecondary)

  return <ElNavItem className={combinedClasses}>{children}</ElNavItem>
}

export const Nav: FC = () => {
  return (
    <ElNavContainer>
      <NavItem>Marketplace</NavItem>
      <NavItem>Apps</NavItem>
      <NavItem>Analytics</NavItem>
      <NavItem isSecondary>Logout</NavItem>
    </ElNavContainer>
  )
}
