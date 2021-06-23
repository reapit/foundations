import React from 'react'
import { cx } from 'linaria'
import { breadcrumbItem, breadcrumbBold, breadcrumbLastItem } from './__styles__/styles'

export type RenderLinksParams = {
  children: React.ReactNode
  href?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>
  style?: React.CSSProperties
  isCurrent?: boolean
  className?: string
  isLast?: boolean
}

export const renderLinks = ({ children, href, onClick, style, isCurrent, className, isLast }: RenderLinksParams) => {
  if (href) {
    return (
      <a
        href={href}
        style={style}
        className={cx(className, isCurrent && breadcrumbBold, isLast && breadcrumbLastItem)}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
  return (
    <span
      style={style}
      className={cx(className, isCurrent && breadcrumbBold, isLast && breadcrumbLastItem)}
      onClick={onClick}
    >
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
    return renderLinks({ children, href, onClick, style, isCurrent, isLast, className })
  }, [])
  if (children && !isLast) {
    return (
      <span className={breadcrumbItem}>
        {links}
        {separator && separator !== '' && <span>{separator}</span>}
      </span>
    )
  }
  if (children && isLast) {
    return <span className={breadcrumbItem}>{links}</span>
  }
  return null
}

export default React.memo(BreadcrumbItem)
