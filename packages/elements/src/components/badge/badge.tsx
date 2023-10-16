import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElBadge, ElBadgeGroup, ElBadgeGroupInner } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
}

export const Badge: FC<BadgeProps> = ({ children, intent, className, ...rest }) => (
  <ElBadge className={cx(className, intent && getIntentClassName(intent))} {...rest}>
    {children}
  </ElBadge>
)

export const BadgeGroup: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElBadgeGroup className={cx(className)} {...rest}>
    <ElBadgeGroupInner>{children}</ElBadgeGroupInner>
  </ElBadgeGroup>
)
