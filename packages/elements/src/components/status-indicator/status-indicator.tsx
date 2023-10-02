import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { elShapeTag, ElStatusIndicator } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
  shape?: 'circle' | 'tag'
}

export const StatusIndicator: FC<StatusIndicatorProps> = ({ intent = 'primary', shape, className, ...rest }) => (
  <ElStatusIndicator
    className={cx(intent && getIntentClassName(intent), shape && shape === 'tag' && elShapeTag, className)}
    {...rest}
  />
)
