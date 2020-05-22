import React from 'react'
import { css } from 'linaria'
import classNames from 'classnames'

export interface BreadcrumbSeparatorProps {
  children?: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export const breadcrumbSeparator = css`
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children,
  className,
  style,
}: BreadcrumbSeparatorProps) => {
  return (
    <span style={style} className={classNames([breadcrumbSeparator], className)}>
      {children || '/'}
    </span>
  )
}

export default BreadcrumbSeparator
