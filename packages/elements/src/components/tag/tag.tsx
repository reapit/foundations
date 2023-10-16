import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElTag, ElTagGroup, ElTagGroupInner } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
}

export const Tag: FC<TagProps> = ({ intent = 'primary', children, className, ...rest }) => (
  <ElTag className={cx(intent && getIntentClassName(intent), className)} {...rest}>
    {children}
  </ElTag>
)

export const TagGroup: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElTagGroup className={cx(className)} {...rest}>
    <ElTagGroupInner>{children}</ElTagGroupInner>
  </ElTagGroup>
)
