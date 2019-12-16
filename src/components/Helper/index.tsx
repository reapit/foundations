import * as React from 'react'

export type Variant = 'info' | 'warning'

export interface HelperProps {
  variant?: Variant
  children?: React.ReactNode
  closeButton?: boolean
  onCloseClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Helper: React.FC<HelperProps> = ({
  variant = 'info',
  children = '',
  closeButton = false,
  onCloseClick
}) => {
  const helperColor = variant === 'warning' ? 'helper-warning' : 'helper-info'
  return (
    <div className={`notification helper-wrap ${helperColor}`}>
      {closeButton && <button className="delete" onClick={onCloseClick}></button>}
      {children}
    </div>
  )
}
