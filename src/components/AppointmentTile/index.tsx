import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export interface AppointmentTileProps {
  heading: string
  hightlight?: boolean
}

export const AppointmentTile: React.FC<AppointmentTileProps> = ({ heading, children, hightlight }) => {
  return (
    <div className={`box appointment-tile ${hightlight ? 'hightlight' : ''}`}>
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
