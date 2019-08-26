import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export interface AppointmentTileProps {
  address: string
  city: string
  country: string
  postalCode: string
  contactPerson: string
}

export const AppointmentTile: React.FC<AppointmentTileProps> = ({
  address,
  city,
  country,
  postalCode,
  contactPerson
}) => {
  return (
    <div className="box appointment-tile">
      <div className="location-marker">
        <FaMapMarkerAlt />
      </div>
      <div>
        <div>
          <b>{address}</b>
        </div>
        <div>{city}</div>
        <div>{country}</div>
        <div>{postalCode}</div>
        <div>{contactPerson}</div>
      </div>
    </div>
  )
}

export default AppointmentTile
