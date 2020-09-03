import * as React from 'react'
import {
  iconBlock,
  mediaBlock,
  iconImage,
  mediaImage,
  container,
  block,
  image,
  arrow,
  red,
  green,
} from './__styles__/pending-revision-comparison'

export interface DiffMediaProps {
  currentMedia?: string
  changedMedia?: string
  type?: string
}

const DiffMedia = ({ currentMedia, changedMedia, type }: DiffMediaProps) => {
  const blockStyle = type === 'icon' ? iconBlock : mediaBlock
  const imageStyle = type === 'icon' ? iconImage : mediaImage
  const isDiff = currentMedia !== changedMedia
  return (
    <div className={container}>
      <div className={`${block} ${blockStyle} ${isDiff ? red : ''}`}>
        <div className={`${image} ${imageStyle}`} style={{ backgroundImage: `url("${currentMedia}")` }} />
      </div>
      <span className={arrow}>&#8594;</span>
      <div className={`${block} ${blockStyle} ${isDiff ? green : ''}`}>
        <div className={`${image} ${imageStyle}`} style={{ backgroundImage: `url("${changedMedia}")` }} />
      </div>
    </div>
  )
}

export default DiffMedia
