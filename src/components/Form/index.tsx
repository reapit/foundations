import * as React from 'react'

export interface LayoutProps {
  className?: string
}

export interface FlexContainerProps extends LayoutProps {
  flexColumn?: boolean
  centerContent?: boolean
  hasPadding?: boolean
  isScrollable?: boolean
  hasBackground?: boolean
}

export interface GridProps extends LayoutProps {
  isMultiLine?: boolean
}

export const FormHeading: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`form-heading mb-1 ${className}`}>{children}</div>
)

export const FormSubHeading: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`form-subheading mb-6 ${className}`}>{children}</div>
)

export const FormSection: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`form-section mb-4 ${className}`}>{children}</div>
)
