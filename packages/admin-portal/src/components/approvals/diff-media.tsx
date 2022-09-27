import React, { FC } from 'react'
import { cx } from '@linaria/core'
import {
  diffMediaContainer,
  image,
  greenBackground,
  redBackground,
  diffBlock,
  arrow,
  iconBlock,
  iconImage,
  mediaBlock,
  mediaImage,
} from './__styles__'

export interface DiffMediaProps {
  currentMedia?: string
  changedMedia?: string
  type?: string
}

export const DiffMedia: FC<DiffMediaProps> = ({ currentMedia, changedMedia, type }) => {
  const blockStyle = type === 'icon' ? iconBlock : mediaBlock
  const imageStyle = type === 'icon' ? iconImage : mediaImage
  const isDiff = currentMedia !== changedMedia
  return (
    <div className={diffMediaContainer}>
      <div className={cx(diffBlock, type === 'icon' ? iconBlock : mediaBlock, isDiff && redBackground)}>
        <div className={cx(image, imageStyle)} style={{ backgroundImage: `url("${currentMedia}")` }} />
      </div>
      <span className={arrow}>&#8594;</span>
      <div className={cx(diffBlock, blockStyle, isDiff && greenBackground)}>
        <div className={cx(image, imageStyle)} style={{ backgroundImage: `url("${changedMedia}")` }} />
      </div>
    </div>
  )
}
