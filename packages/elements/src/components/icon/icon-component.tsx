import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
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
import { deprecatedIconSet } from './deprecated'
export type IconNames = keyof typeof iconSet

export type IconSize = 'smallest' | 'small' | 'medium' | 'large' | 'largest'

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  icon: IconNames
  intent?: Intent
  fontSize?: string
  className?: string
  iconSize?: IconSize
}

export const getIconSize = (iconSize?: IconSize): string | null => {
  switch (iconSize) {
    case 'smallest':
      return elIconSizeSmallest
    case 'small':
      return elIconSizeSmall
    case 'medium':
      return elIconSizeMedium
    case 'large':
      return elIconSizeLarge
    case 'largest':
      return elIconSizeLargest
    default:
      return null
  }
}

export const Icon: FC<IconProps> = ({ icon, intent, fontSize, iconSize, className, ...rest }) => {
  const intentClassname = intent && getIntentClassName(intent)
  const sizeClassname = getIconSize(iconSize)
  const combinedClassName = cx(className, intentClassname, sizeClassname)

  if (deprecatedIconSet.includes(icon)) {
    console.warn(
      `The icon "${icon}" is deprecated and will be removed in the next major release. We suggest strongly finding an alterative from the Elements doucmentation`,
    )
  }

  const Svg = iconSet[icon]

  if (!Svg) return <ElIcon className={combinedClassName} {...rest} />

  return (
    <ElIcon className={combinedClassName} {...rest} style={{ fontSize }}>
      <Svg />
    </ElIcon>
  )
}
