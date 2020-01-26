import * as React from 'react'
import { LayoutProps } from '../Layout'

export const FormHeading: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`form-heading mb-1 ${className}`}>{children}</div>
)

export const FormSubHeading: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`form-subheading mb-6 ${className}`}>{children}</div>
)

export const FormSection: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`form-section mb-4 ${className}`}>{children}</div>
)
