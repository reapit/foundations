import React from 'react'
import { CardBodyWrap, CardHeading, CardImageWrap, CardSubHeading, CardSubHeadingAdditional } from './__styles__/index'

export interface TileProps {
  heading: React.ReactNode
  subHeading?: React.ReactNode
  subHeadingAdditional?: React.ReactNode
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
  subHeadingAdditional,
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
          <CardImageWrap>
            {icon ? (
              <div className="media-left">
                <div className="media-icon">{icon}</div>
              </div>
            ) : image ? (
              <div className="media-left">
                <div className="media-image">{image}</div>
              </div>
            ) : null}
          </CardImageWrap>
          <div className="media-content">
            <CardHeading>{heading}</CardHeading>
            <CardSubHeading className="text-ellipsis-5">{subHeading}</CardSubHeading>
            <CardSubHeadingAdditional>{subHeadingAdditional}</CardSubHeadingAdditional>
          </div>
          {menu && <div className="media-right">{menu}</div>}
        </div>
        {children && <CardBodyWrap>{children}</CardBodyWrap>}
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
