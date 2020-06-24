import * as React from 'react'
import { cx } from 'linaria'

export interface LayoutProps {
  className?: string
  dataTest?: string
}

export interface FlexContainerProps extends LayoutProps {
  flexColumn?: boolean
  centerContent?: boolean
  hasPadding?: boolean
  isScrollable?: boolean
  hasBackground?: boolean
  isFullHeight?: boolean
}

export interface GridProps extends LayoutProps {
  isMultiLine?: boolean
}

export interface SectionProps extends LayoutProps {
  isFlex?: boolean
  isCentered?: boolean
  isAlignedEnd?: boolean
  isAlignedStart?: boolean
  isFlexColumn?: boolean
}

export const FlexContainerResponsive: React.SFC<FlexContainerProps> = ({
  children,
  flexColumn = false,
  centerContent = false,
  hasPadding = false,
  isScrollable = false,
  hasBackground = false,
  className = '',
}) => (
  <div
    className={`container ${flexColumn ? 'is-column' : ''} ${centerContent ? 'is-centered' : ''} ${
      hasBackground ? 'has-background' : ''
    } ${hasPadding ? 'has-padding' : ''} ${isScrollable ? 'is-scrollable' : ''} ${className}`}
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
  hasBackground = false,
  className = '',
  isFullHeight = false,
}) => (
  <div
    className={`${isFullHeight ? 'is-full-height' : ''} container-flex ${flexColumn ? 'is-column' : ''} ${
      centerContent ? 'is-centered' : ''
    } ${hasBackground ? 'has-background' : ''} ${hasPadding ? 'has-padding' : ''} ${
      isScrollable ? 'is-scrollable' : ''
    } ${className}`}
  >
    {children}
  </div>
)

export const AppNavContainer: React.SFC<LayoutProps> = ({ children, className = '', dataTest = '' }) => (
  <div className={`app-nav-container ${className}`} data-test={dataTest}>
    {children}
  </div>
)

export const GridFourCol: React.SFC<LayoutProps> = ({ children, className = '', dataTest = '' }) => (
  <div className={`columns is-multiline ${className}`} data-test={dataTest}>
    {children}
  </div>
)

export const GridFourColItem: React.SFC<LayoutProps> = ({ children, className = '', dataTest = '' }) => (
  <div
    className={
      'column is-multiline is-full-mobile is-half-tablet is-one-third-widescreen is-one-quarter-fullhd' +
      ` ${className}`
    }
    data-test={dataTest}
  >
    {children}
  </div>
)

export const GridThreeColItem: React.SFC<LayoutProps> = ({ children, className = '', dataTest = '' }) => (
  <div className={`column is-multiline is-half-tablet is-one-third-widescreen ${className}`} data-test={dataTest}>
    {children}
  </div>
)

export const Grid: React.SFC<GridProps> = ({ children, isMultiLine = false, className = '', dataTest = '' }) => (
  <div className={`columns ${isMultiLine ? 'is-multiline' : ''} ${className}`} data-test={dataTest}>
    {children}
  </div>
)

export const GridItem: React.SFC<GridProps> = ({ children, isMultiLine = false, className = '', dataTest = '' }) => (
  <div className={`column ${isMultiLine ? 'is-multiline' : ''} ${className}`} data-test={dataTest}>
    {children}
  </div>
)

export const Level: React.SFC<LayoutProps> = ({ children, className = '', dataTest = '' }) => (
  <div className={`level ${className}`} data-test={dataTest}>
    {children}
  </div>
)

export const LevelLeft: React.SFC<LayoutProps> = ({ children, className = '', dataTest = '' }) => (
  <div className={`level-left ${className}`} data-test={dataTest}>
    {children}
  </div>
)

export const LevelRight: React.SFC<LayoutProps> = ({ children, className = '', dataTest = '' }) => (
  <div className={`level-right ${className}`} data-test={dataTest}>
    {children}
  </div>
)

export const LevelItem: React.SFC<LayoutProps> = ({ children, className = '', dataTest = '' }) => (
  <div className={`level-item ${className}`} data-test={dataTest}>
    {children}
  </div>
)

export const Section: React.SFC<SectionProps> = ({
  isFlex,
  isCentered,
  isAlignedEnd,
  isAlignedStart,
  isFlexColumn,
  children,
  className = '',
  dataTest = '',
}) => (
  <section
    className={cx(
      'section',
      className,
      isFlex && 'is-flex',
      isCentered && 'is-centered',
      isAlignedEnd && 'is-aligned-end',
      isAlignedStart && 'is-aligned-start',
      isFlexColumn && 'is-flex-column',
    )}
    data-test={dataTest}
  >
    {children}
  </section>
)

export const Content: React.SFC<LayoutProps> = ({ children, className = '', dataTest = '' }) => (
  <div className={`content ${className}`} data-test={dataTest}>
    {children}
  </div>
)
