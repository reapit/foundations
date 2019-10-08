import * as React from 'react'

export interface IconListItem {
  icon: React.ReactNode
  text: string
}

export const IconList: React.SFC<{ items: IconListItem[] }> = ({ items }) => (
  <ul className="icon-list">
    {items.map((item: IconListItem, index: number) => (
      <li className="icon-list-item" key={index}>
        {item.icon}
        <span className="icon-list-text">{item.text}</span>
      </li>
    ))}
  </ul>
)
