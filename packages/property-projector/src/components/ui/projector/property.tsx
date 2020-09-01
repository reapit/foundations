import React from 'react'
import { getAddress, getPrice, getStatus } from '@/util/property-helpers'
import { config } from 'process'

type PropertyImagesProps = {
  images: string[]
  borderColour: string
}

const PropertyImages: React.FC<PropertyImagesProps> = props => {
  const { borderColour, images } = props
  const imageStyles: React.CSSProperties = {
    borderColor: borderColour,
  }

  if (images === undefined) {
    return null
  }

  const imageElements = images.map((image, idx) => <div key={idx} style={{ backgroundImage: `url(${image})` }}></div>)
  const mainImage = imageElements.shift()

  return (
    <div style={imageStyles} className="property-projector-images">
      {mainImage}
      {imageElements.length > 0 ? (
        <div style={imageStyles} className="property-projector-side-images">
          {imageElements}
        </div>
      ) : null}
    </div>
  )
}

type ProjectorPropertyProps = {
  config: any
  property: any
}

const ProjectorProperty: React.FC<ProjectorPropertyProps> = props => {
  const { config, property } = props
  const { logo, primaryColour, secondaryColour, showAddress, showStrapline } = config

  const projectorStyles: React.CSSProperties = {
    color: secondaryColour,
  }

  return (
    <div className="property-projector">
      <PropertyImages images={property.images} borderColour={config.secondaryColour} />
      <div className="property-projector-information">
        <p style={projectorStyles} className="sale-status">
          {getStatus(property)}
        </p>
        {!showAddress || <p className="address">{getAddress(property)}</p>}
        <p className="price">{getPrice(property)}</p>
        <p className="rooms">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bed"
              role="img"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v352c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-48h512v48c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V240c0-61.86-50.14-112-112-112z"
              />
            </svg>
            bedrooms: {property.bedrooms}
          </span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bath"
              role="img"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z"
              />
            </svg>
            bathrooms: {property.bathrooms}
          </span>
        </p>
      </div>
    </div>
  )
}

export default ProjectorProperty
