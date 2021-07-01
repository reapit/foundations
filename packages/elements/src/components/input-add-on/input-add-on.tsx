import * as React from 'react'
import { cx } from 'linaria'
import { ElInputAddOn } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface InputAddOnProps extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
  className?: string
}

export const InputAddOn: React.FC<InputAddOnProps> = ({ intent, className, children, ...rest }) => {
  const intentClassName = intent && getIntentClassName(intent)
  const combinedClassName = cx(intentClassName, className)

  return (
    <ElInputAddOn className={combinedClassName} {...rest}>
      {children}
    </ElInputAddOn>
  )
}
