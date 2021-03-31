import * as React from 'react'
import { cx } from 'linaria'
import { ElAfterInputText } from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/v3/intent'

export interface IAfterInputText extends React.HTMLAttributes<HTMLSpanElement> {
  intent?: Intent
  className?: string
}

export const AfterInputText: React.FC<IAfterInputText> = ({ intent, className, children, ...rest }) => {
  const intentClassName = intent && getIntentClassName(intent)
  const combinedClassName = cx(intentClassName, className)

  return (
    <ElAfterInputText className={combinedClassName} {...rest}>
      {children}
    </ElAfterInputText>
  )
}
