import React, { FC, HTMLAttributes, memo } from 'react'
import { cx } from '@linaria/core'
import { Intent, getIntentClassName } from '../../helpers/intent'
import {
  ElIcon,
  elIconNew,
  elIconSizeLarge,
  elIconSizeLargest,
  elIconSizeMedium,
  elIconSizeSmall,
  elIconSizeSmallest,
} from './__styles__'
import { iconSet, iconSetLegacy } from '../../icons'
import { useDeprecateIcon, useDeprecateVar } from '../../storybook/deprecate-var'
export type IconNames = keyof typeof iconSet | keyof typeof iconSetLegacy

export type IconSize = 'smallest' | 'small' | 'medium' | 'large' | 'largest'

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  icon: IconNames
  intent?: Intent
  fontSize?: string
  className?: string
  height?: string
  width?: string
  /** Deprecated, will be removed at v5 */
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

export const Icon: FC<IconProps> = memo(({ icon, intent, fontSize, iconSize, className, height, width, ...rest }) => {
  const newIcon = iconSet[icon]
  const legacyIcon = iconSetLegacy[icon]
  const intentClassname = intent && getIntentClassName(intent)
  const sizeClassname = getIconSize(iconSize)
  const combinedClassName = cx(className, intentClassname, newIcon && elIconNew, sizeClassname)

  const Svg = newIcon || legacyIcon

  useDeprecateIcon(icon)
  useDeprecateVar({ iconSize }, 'Icon')

  if (!Svg) return <ElIcon className={combinedClassName} {...rest} />

  return (
    <ElIcon className={combinedClassName} {...rest} style={{ fontSize, height, width }}>
      <Svg style={{ fontSize, height, width }} />
    </ElIcon>
  )
})
