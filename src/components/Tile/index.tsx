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

/* <div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div> */

export default Tile
