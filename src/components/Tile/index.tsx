import React from 'react'
import { H4, SubTitleH6 } from '../Typography/index'

export interface TileProps {
  heading: string
  subHeading?: string
  hightlight?: boolean
  icon?: React.ReactNode
  menu?: React.ReactNode
  footerItems?: React.ReactNode[]
}

export const Tile: React.FC<TileProps> = ({ heading, icon, menu, children, hightlight, subHeading, footerItems }) => {
  return (
    <div className={`card ${hightlight ? 'hightlight' : ''}`}>
      <div className="card-content">
        <div className="media">
          {icon && <div className="media-left">{icon}</div>}
          <div className="media-content">
            <H4>{heading}</H4>
            <SubTitleH6>{subHeading}</SubTitleH6>
            {children}
          </div>
          {menu && <div className="media-right">{menu}</div>}
        </div>
      </div>
      {footerItems && footerItems.length ? (
        <div className="card-footer">
          {footerItems.map((item: React.ReactNode, index: number) => (
            <span className="card-footer-item" key={index}>
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}
