import * as React from 'react'

export interface IcomListProps {
  items: IconListItem[]
  textClassName?: string
  listClassName?: string
  iconClassName?: string
}

export interface IconListItem {
  icon: React.ReactNode
  text: React.ReactNode | string
}

export const IconList: React.SFC<IcomListProps> = ({
  items,
  iconClassName = '',
  listClassName = '',
  textClassName = ''
}) => (
  <ul className={`icon-list ${iconClassName}`}>
    {items.map((item: IconListItem, index: number) => (
      <li className={`icon-list-item ${listClassName}`} key={index}>
        {item.icon}
        <span className={`icon-list-text ${textClassName}`}>{item.text}</span>
      </li>
    ))}
  </ul>
)
