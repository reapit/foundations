import { cx } from 'linaria'
import React from 'react'
import { elList, elIconList } from './styles'

export interface ListProps<T> {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  items: T[] | ItemProps[]
  loading?: boolean
  renderItem?: (item: T, index: number) => React.ReactNode
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

export const renderItems = (renderItem, data) => {
  return data.map((item, index) => {
    if (renderItem) return renderItem(item, index)
    return <Item key={index} {...item} />
  })
}

export function List<T>({ items, renderItem, loading, className }: ListProps<T>) {
  //TODO: Will update when Loader element completed
  if (loading) return <p>Loading...</p>

  return <ul className={cx(elList, elIconList, className)}>{renderItems(renderItem, items)}</ul>
}

//Icon List
export function IconList<T>({ items, renderItem, loading, className }: ListProps<T>) {
  if (loading) return <p>Loading...</p>

  return <ul className={cx(elList, elIconList, className)}>{renderItems(renderItem, items)}</ul>
}

export function OrderList<T>({ items, renderItem, loading, className }: ListProps<T>) {
  if (loading) return <p>Loading...</p>

  return <ol className={cx(elList, className)}>{renderItems(renderItem, items)}</ol>
}

export function BulletList<T>({ items, renderItem, loading, className }: ListProps<T>) {
  if (loading) return <p>Loading...</p>

  return <ul className={cx(elList, className)}>{renderItems(renderItem, items)}</ul>
}

List.IconList = IconList
List.OrderList = OrderList
List.BulletList = BulletList

export default List
