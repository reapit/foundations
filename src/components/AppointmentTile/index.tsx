import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export interface AppointmentTileProps {
  heading: string
  hightlight?: boolean
  footerItems?: React.ReactNode[]
}

export const AppointmentTile: React.FC<AppointmentTileProps> = ({ heading, children, hightlight, footerItems }) => {
  return (
    <div className={`card appointment-tile ${hightlight ? 'hightlight' : ''}`}>
      <div className="card-content">
        <div className="location-marker">
          <FaMapMarkerAlt />
          <h5 className="title is-5">
            <b>{heading}</b>
          </h5>
        </div>
        <div>{children}</div>
        {footerItems &&
          footerItems.length &&
          footerItems.map(item => (
            <div className="card-footer">
              <p className="card-footer-item">{item}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default AppointmentTile
