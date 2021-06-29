import { cx } from 'linaria'
import React from 'react'
import { ElStatusIndicator } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface IStatusIndicator extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
}

export const StatusIndicator: React.FC<IStatusIndicator> = ({ intent, className, ...rest }) => (
  <ElStatusIndicator className={cx(intent && getIntentClassName(intent), className)} {...rest} />
)
