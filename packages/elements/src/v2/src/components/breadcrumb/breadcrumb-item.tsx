import React from 'react'
import { cx } from 'linaria'
import { breadcrumItem, bold } from './__styles__/styles'

export const renderLinks = (
  children: React.ReactNode,
  href?: string,
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>,
  isCurrent?: boolean,
) => {
  if (href) {
    return (
      <a href={href} className={cx(breadcrumItem, isCurrent && bold)} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <span className={cx(breadcrumItem, isCurrent && bold)} onClick={onClick}>
      {children}
    </span>
  )
}

export interface BreadcrumbItemProps {
  separator?: React.ReactNode
  href?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>
  children?: React.ReactNode
  isLast?: boolean
  isCurrent?: boolean
  style?: React.CSSProperties
  className?: string
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  separator = '/',
  href,
  children,
  onClick,
  isLast = false,
  isCurrent = false,
  className,
  style,
}: BreadcrumbItemProps) => {
  const links = React.useMemo(() => {
    return renderLinks(children, href, onClick)
  }, [])
  if (children && !isLast) {
    return (
      <span style={style} className={cx(breadcrumItem, isCurrent && bold, className)}>
        {links}
        {separator && separator !== '' && <span>{separator}</span>}
      </span>
    )
  }
  if (children && isLast) {
    return (
      <span style={style} className={cx(breadcrumItem, isCurrent && bold, className)}>
        {links}
      </span>
    )
  }
  return null
}

export default React.memo(BreadcrumbItem)
