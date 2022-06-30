import React, { FC, HTMLAttributes } from 'react'
import { ElPlaceholderImage } from './__styles__'
import { placeholderImageSet } from './images'

export type PlaceholderNames = keyof typeof placeholderImageSet

export interface PlacholderImageProps extends HTMLAttributes<HTMLDivElement> {
  placeholder: PlaceholderNames
  size: number
}

export const PlaceholderImage: FC<PlacholderImageProps> = ({ placeholder, size, ...rest }) => {
  const Svg = placeholderImageSet[placeholder]
  const fontSize = `${size / 16}em`

  return (
    <ElPlaceholderImage {...rest} style={{ fontSize }}>
      <Svg />
    </ElPlaceholderImage>
  )
}
