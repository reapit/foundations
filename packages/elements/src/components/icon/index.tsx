import * as React from 'react'
import { cx } from 'linaria'
import { Intent, getIntentClassName } from '../../helpers/intent'
import {
  ElIcon,
  elIconSizeLarge,
  elIconSizeLargest,
  elIconSizeMedium,
  elIconSizeSmall,
  elIconSizeSmallest,
} from './__styles__'
import { iconSet } from './icons'

export type IconNames = keyof typeof iconSet

export type IconSize = 'SMALLEST' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'LARGEST'

export interface IIcon extends React.HTMLAttributes<HTMLSpanElement> {
  icon: IconNames
  intent?: Intent
  fontSize?: string
  className?: string
  iconSize?: IconSize
}

export const getIconSize = (iconSize?: IconSize): string | null => {
  switch (iconSize) {
    case 'SMALLEST':
      return elIconSizeSmallest
    case 'SMALL':
      return elIconSizeSmall
    case 'MEDIUM':
      return elIconSizeMedium
    case 'LARGE':
      return elIconSizeLarge
    case 'LARGEST':
      return elIconSizeLargest
    default:
      return null
  }
}

export const Icon: React.FC<IIcon> = ({ icon, intent, fontSize, iconSize, className, ...rest }) => {
  const intentClassname = intent && getIntentClassName(intent)
  const sizeClassname = getIconSize(iconSize)
  const combinedClassName = cx(className, intentClassname, sizeClassname)

  const Svg = iconSet[icon]

  if (!Svg) return <ElIcon className={combinedClassName} {...rest} />

  return (
    <ElIcon className={combinedClassName} {...rest} style={{ fontSize }}>
      <Svg />
    </ElIcon>
  )
}
