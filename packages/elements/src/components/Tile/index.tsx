import React from 'react'
import { H4, SubTitleH6 } from '../Typography/index'

export interface TileProps {
  heading: React.ReactNode
  subHeading?: React.ReactNode
  hightlight?: boolean
  icon?: React.ReactNode
  image?: React.ReactNode
  menu?: React.ReactNode
  footerItems?: React.ReactNode[]
  onClick?: () => void
  dataTest?: string
}

export const Tile: React.FC<TileProps> = ({
  heading,
  icon,
  image,
  menu,
  children,
  hightlight,
  subHeading,
  footerItems,
  onClick,
  dataTest,
}) => {
  return (
    <div
      className={`card ${hightlight ? 'hightlight' : ''} ${onClick ? 'is-clickable' : ''}`}
      onClick={onClick}
      data-test={dataTest || ''}
    >
      <div className="card-content">
        <div className="media">
          {icon ? (
            <div className="media-left">
              <div className="media-icon">{icon}</div>
            </div>
          ) : image ? (
            <div className="media-left">
              <div className="media-image">{image}</div>
            </div>
          ) : null}
          <div className="media-content">
            <H4 className="text-ellipisis">{heading}</H4>
            <SubTitleH6 className="text-ellipisis mb-3">{subHeading}</SubTitleH6>
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
