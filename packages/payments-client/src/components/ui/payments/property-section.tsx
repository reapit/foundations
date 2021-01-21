import React from 'react'
import useSWR from 'swr'
import { Loader, GridItem } from '@reapit/elements'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { URLS } from '../../../constants/api'

const PropertySection: React.FC<{ propertyId?: string; property?: PropertyModel }> = ({ propertyId, property }) => {
  const { data: fetchData } = useSWR<PropertyModel>(propertyId && !property ? `${URLS.PROPERTIES}/${propertyId}` : null)

  const data = property || fetchData

  if (!data) {
    return <Loader />
  }

  const { line1, line2, line3, postcode } = data.address || {}
  return (
    <GridItem>
      <div>Property Ref: {propertyId}</div>
      <div>{name}</div>
      <div>{line1}</div>
      <div>{line2}</div>
      <div>{line3}</div>
      <div>{postcode}</div>
    </GridItem>
  )
}
export default PropertySection
