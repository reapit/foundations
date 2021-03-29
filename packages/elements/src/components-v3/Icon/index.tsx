import * as React from 'react'
import { cx } from 'linaria'
import { Intent, getIntentClassName } from '../../helpers/v3/intent'
import { ElIcon } from './__styles__'
import iconSet from './icons'

export type IconNames = keyof typeof iconSet

export interface IIcon extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconNames
  intent?: Intent
  fontSize?: string
  className?: string
}

export const Icon: React.FC<IIcon> = ({ icon, intent, fontSize, className, ...rest }) => {
  const intentClassname = intent && getIntentClassName(intent)
  const combinedClassName = cx(className, intentClassname)

  const Svg = iconSet[icon]

  if (!Svg) return <ElIcon className={combinedClassName} {...rest} />

  return (
    <ElIcon className={combinedClassName} {...rest} style={{ fontSize }}>
      <Svg />
    </ElIcon>
  )
}
