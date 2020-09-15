import { cx } from 'linaria'
import React from 'react'
import { elList, elIconList } from './styles'

export interface ListProps {
  className?: string
  style?: React.CSSProperties
  loading?: boolean
  items: any[]
  renderItem?: (item: any, index: number) => React.ReactNode
}

type ItemProps = {
  value: string
  icon?: React.ReactNode
}

export const Item = ({ value, icon }: ItemProps) => {
  return (
    <li>
      {icon} <span>{value}</span>
    </li>
  )
}

export const renderItems = (renderItem, items) => {
  return items.map((item, index) => {
    if (renderItem) return renderItem(item, index)
    return <Item key={index} {...item} />
  })
}

export const List: React.FC<ListProps> = ({ items, renderItem, loading, className }) => {
  if (loading) return <p>Loading...</p>

  return <ul className={cx(elList, elIconList, className)}>{renderItems(renderItem, items)}</ul>
}

export const OrderList: React.FC<ListProps> = ({ items, renderItem, loading, className }) => {
  if (loading) {
    return <p>Loading...</p>
  }
  return <ol className={cx(elList, className)}>{renderItems(renderItem, items)}</ol>
}

export const BulletList: React.FC<ListProps> = ({ items, renderItem, loading, className }) => {
  if (loading) return <p>Loading...</p>

  return <ul className={cx(elList, className)}>{renderItems(renderItem, items)}</ul>
}

export default List
