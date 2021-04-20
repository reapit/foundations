import * as React from 'react'
import { cx } from 'linaria'
import { ElSecondaryNav, ElSecondaryNavItem } from './__styles__'
import { elIsActive } from '../../styles-v3/base/states'

export interface ISecondaryNav extends React.HTMLAttributes<HTMLDivElement> {}

export const SecondaryNav: React.FC<ISecondaryNav> = ({ children, ...rest }) => {
  return <ElSecondaryNav {...rest}>{children}</ElSecondaryNav>
}

export interface ISecondaryNavItem extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  className?: string
}

export const SecondaryNavItem: React.FC<ISecondaryNavItem> = ({ active, className, children, ...rest }) => {
  const combinedClassName = cx(className, active && elIsActive)

  return (
    <ElSecondaryNavItem className={combinedClassName} {...rest}>
      {children}
    </ElSecondaryNavItem>
  )
}
