import * as React from 'react'
import { LayoutProps } from '../Layout'
import { cx } from 'linaria'

export const FormHeading: React.FC<LayoutProps> = ({ children, className }) => (
  <div className={cx('form-heading', className)}>{children}</div>
)

export const FormSubHeading: React.FC<LayoutProps> = ({ children, className }) => (
  <div className={cx('form-subheading', className)}>{children}</div>
)

export const FormSection: React.FC<LayoutProps> = ({ children, className }) => (
  <div className={cx('form-section', className)}>{children}</div>
)
