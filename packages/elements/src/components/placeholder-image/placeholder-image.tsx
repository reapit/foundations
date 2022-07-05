import React, { FC, HTMLAttributes } from 'react'
import { ElPlaceholderImage, ElPlaceholderImageWrapper } from './__styles__'
import { placeholderImageSet } from './images'

export type PlaceholderNames = keyof typeof placeholderImageSet

export interface PlacholderImageProps extends HTMLAttributes<HTMLDivElement> {
  placeholder: PlaceholderNames
  size: number
  fillAvailable?: boolean
}

export const PlaceholderImage: FC<PlacholderImageProps> = ({ placeholder, size, fillAvailable, ...rest }) => {
  const Svg = placeholderImageSet[placeholder]
  const fontSize = `${(size * 0.625) / 16}em`
  const width = `${size}px`
  const height = `${size}px`

  if (fillAvailable) {
    return (
      <ElPlaceholderImageWrapper>
        <ElPlaceholderImage {...rest} style={{ fontSize }}>
          <Svg />
        </ElPlaceholderImage>
      </ElPlaceholderImageWrapper>
    )
  }

  return (
    <ElPlaceholderImage {...rest} style={{ fontSize, width, height }}>
      <Svg />
    </ElPlaceholderImage>
  )
}
