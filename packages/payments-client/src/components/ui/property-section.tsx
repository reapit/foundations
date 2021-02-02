import React from 'react'
import { combineAddress, FadeIn, GridItem, H5, IconList } from '@reapit/elements'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { FaHome, FaStickyNote } from 'react-icons/fa'

const PropertySection: React.FC<{ property: PropertyModel }> = ({ property }) => {
  if (!property) {
    return <GridItem />
  }

  const address = combineAddress(property.address)
  return (
    <GridItem>
      <FadeIn>
        <H5>Property</H5>
        <IconList
          items={[
            {
              icon: <FaHome className="icon-list-icon" />,
              text: address,
            },
            {
              icon: <FaStickyNote className="icon-list-icon" />,
              text: `Property ref: ${property.id}`,
            },
          ]}
        />
      </FadeIn>
    </GridItem>
  )
}
export default PropertySection
