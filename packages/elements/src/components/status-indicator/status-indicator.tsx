import React, { FC, HTMLAttributes } from 'react'
import { cx } from 'linaria'
import { ElStatusIndicator } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
}

export const StatusIndicator: FC<StatusIndicatorProps> = ({ intent, className, ...rest }) => (
  <ElStatusIndicator className={cx(intent && getIntentClassName(intent), className)} {...rest} />
)
