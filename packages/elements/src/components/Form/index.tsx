import * as React from 'react'
import { LayoutProps } from '../Layout'
import { cx } from 'linaria'

export const FormHeading: React.SFC<LayoutProps> = ({ children, className }) => (
  <div className={cx('form-heading mb-1', className)}>{children}</div>
)

export const FormSubHeading: React.SFC<LayoutProps> = ({ children, className }) => (
  <div className={cx('form-subheading mb-4', className)}>{children}</div>
)

export const FormSection: React.SFC<LayoutProps> = ({ children, className }) => (
  <div className={cx('form-section', className)}>{children}</div>
)
