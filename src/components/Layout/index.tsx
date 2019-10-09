import * as React from 'react'

export interface LayoutProps {
  className?: string
}

export interface FlexContainerProps extends LayoutProps {
  flexColumn?: boolean
  centerContent?: boolean
  hasPadding?: boolean
  isScrollable?: boolean
}

export interface GridProps extends LayoutProps {
  isMultiLine?: boolean
}

export const FlexContainerResponsive: React.SFC<FlexContainerProps> = ({
  children,
  flexColumn = false,
  centerContent = false,
  hasPadding = false,
  isScrollable = false,
  className = ''
}) => (
  <div
    className={`container ${flexColumn ? 'is-column' : ''} ${centerContent ? 'is-centered' : ''} ${
      hasPadding ? 'has-padding' : ''
    } ${isScrollable ? 'is-scrollable' : ''} ${className}`}
  >
    {children}
  </div>
)

export const FlexContainerBasic: React.SFC<FlexContainerProps> = ({
  children,
  flexColumn = false,
  centerContent = false,
  hasPadding = false,
  isScrollable = false,
  className = ''
}) => (
  <div
    className={`container-flex ${flexColumn ? 'is-column' : ''} ${centerContent ? 'is-centered' : ''} ${
      hasPadding ? 'has-padding' : ''
    } ${isScrollable ? 'is-scrollable' : ''} ${className}`}
  >
    {children}
  </div>
)

export const AppNavContainer: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`app-nav-container ${className}`}>{children}</div>
)

export const GridFiveCol: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`columns is-multiline ${className}`}>{children}</div>
)

export const GridFiveColItem: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div
    className={`column is-multiline is-half-tablet is-one-third-desktop is-one-quarter-widescreen is-one-fifth-fullhd ${className}`}
  >
    {children}
  </div>
)

export const Grid: React.SFC<GridProps> = ({ children, isMultiLine = false, className = '' }) => (
  <div className={`columns ${isMultiLine ? 'is-multiline' : ''} ${className}`}>{children}</div>
)

export const GridItem: React.SFC<GridProps> = ({ children, isMultiLine = false, className = '' }) => (
  <div className={`column ${isMultiLine ? 'is-multiline' : ''} ${className}`}>{children}</div>
)

export const Level: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`level ${className}`}>{children}</div>
)

export const LevelLeft: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`level-left ${className}`}>{children}</div>
)

export const LevelRight: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`level-right ${className}`}>{children}</div>
)

export const LevelItem: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`level-item ${className}`}>{children}</div>
)

export const Section: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`section ${className}`}>{children}</div>
)

export const Content: React.SFC<LayoutProps> = ({ children, className = '' }) => (
  <div className={`content ${className}`}>{children}</div>
)
