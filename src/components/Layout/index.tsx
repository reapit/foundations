import * as React from 'react'

export interface LayoutProps {
  className?: string
}

export interface FlexContainerProps extends LayoutProps {
  flexColumn: boolean
  centerContent: boolean
  hasPadding: boolean
}

export const FlexContainer: React.SFC<FlexContainerProps> = ({
  children,
  flexColumn,
  centerContent,
  hasPadding,
  className
}) => (
  <div
    className={`container ${flexColumn ? 'is-column' : ''} ${centerContent ? 'is-centered' : ''} ${
      hasPadding ? 'has-padding' : ''
    } ${className || ''}`}
  >
    {children}
  </div>
)

export const Grid: React.SFC<LayoutProps> = ({ children, className }) => (
  <div className={`columns is-multiline ${className || ''}`}>{children}</div>
)

export const GridColumn: React.SFC<LayoutProps> = ({ children, className }) => (
  <div
    className={`column is-multiline is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-fifth-fullhd ${className ||
      ''}`}
  >
    {children}
  </div>
)

export const Level: React.SFC<LayoutProps> = ({ children, className }) => (
  <div className={`level ${className || ''}`}>{children}</div>
)

export const LevelLeft: React.SFC<LayoutProps> = ({ children, className }) => (
  <div className={`level-left ${className || ''}`}>{children}</div>
)

export const LevelRight: React.SFC<LayoutProps> = ({ children, className }) => (
  <div className={`level-right ${className || ''}`}>{children}</div>
)

export const LevelItem: React.SFC<LayoutProps> = ({ children, className }) => (
  <div className={`level-item ${className || ''}`}>{children}</div>
)

export const Section: React.SFC<LayoutProps> = ({ children, className }) => (
  <div className={`section ${className || ''}`}>{children}</div>
)
