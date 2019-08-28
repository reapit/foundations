import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export interface AppointmentTileProps {
  heading: string
}

export const AppointmentTile: React.FC<AppointmentTileProps> = ({ heading, children }) => {
  return (
    <div className="box appointment-tile">
      <div className="location-marker">
        <FaMapMarkerAlt />
      </div>
      <div>
        <h4>
          <b>{heading}</b>
        </h4>
        {children}
      </div>
    </div>
  )
}

export default AppointmentTile
