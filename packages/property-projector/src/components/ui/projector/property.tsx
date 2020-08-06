import React from 'react'
import { reactImageCropGlobalStyles } from '@reapit/elements/components/ImageCropperV2/__styles__/styles'

type ProjectorPropertyProps = {
  logo?: string
  address?: string
  price?: number
  bedrooms?: number
  bathroom?: number
  images?: any[]
}

const ProjectorProperty: React.FC<ProjectorPropertyProps> = props => {
  const { logo, address, price, bedrooms, bathroom, images } = props

  return <div className="projector-property">hello world</div>
}

export default ProjectorProperty
