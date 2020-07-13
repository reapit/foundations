import React from 'react'
import { cx } from 'linaria'
import { breadcrumbSeparator } from './__styles__/styles'

export interface BreadcrumbSeparatorProps {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children,
  className,
  style,
}: BreadcrumbSeparatorProps) => {
  return (
    <span style={style} className={cx(breadcrumbSeparator, className)}>
      {children || '/'}
    </span>
  )
}

export default BreadcrumbSeparator
