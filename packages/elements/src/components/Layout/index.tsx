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
  isPageContainer?: boolean
}

export interface GridProps extends LayoutProps {
  isMultiLine?: boolean
  isVerticalCentered?: boolean
  isMobile?: boolean
  onClick?: () => void
}

export interface GridItemProps extends LayoutProps {
  isMultiLine?: boolean
  onClick?: () => void
}

export interface SectionProps extends LayoutProps {
  isFlex?: boolean
  isCentered?: boolean
  isAlignedEnd?: boolean
  isAlignedStart?: boolean
  isFlexColumn?: boolean
  hasPadding?: boolean
  hasMargin?: boolean
  hasBackground?: boolean
  isFullHeight?: boolean
}

export const FlexContainerResponsive: React.FC<FlexContainerProps> = ({
  children,
  flexColumn = false,
  centerContent = false,
  hasPadding = false,
  isScrollable = false,
  hasBackground = false,
  isPageContainer = false,
  className,
}) => (
  <div
    className={cx(
      'container',
      flexColumn && 'is-column',
      centerContent && 'is-centered',
      hasBackground && 'has-background',
      hasPadding && 'has-padding',
      isScrollable && 'is-scrollable',
      isPageContainer && 'is-page-container',
      className,
    )}
  >
    {children}
  </div>
)

export const FlexContainerBasic: React.FC<FlexContainerProps> = ({
  children,
  flexColumn = false,
  centerContent = false,
  hasPadding = false,
  isScrollable = false,
  hasBackground = false,
  isFullHeight = false,
  className,
}) => (
  <div
    className={cx(
      'container-flex',
      isFullHeight && 'is-full-height',
      flexColumn && 'is-column',
      centerContent && 'is-centered',
      hasBackground && 'has-background',
      hasPadding && 'has-padding',
      isScrollable && 'is-scrollable',
      className,
    )}
  >
    {children}
  </div>
)

export const AppNavContainer: React.FC<LayoutProps> = ({ children, className, dataTest = '' }) => (
  <div className={cx('app-nav-container', className)} data-test={dataTest}>
    {children}
  </div>
)

export const GridFourCol: React.FC<LayoutProps> = ({ children, className, dataTest = '' }) => (
  <div className={cx('columns is-multiline', className)} data-test={dataTest}>
    {children}
  </div>
)

export const GridFourColItem: React.FC<LayoutProps> = ({ children, className, dataTest = '' }) => (
  <div
    className={cx(
      'column is-multiline is-full-mobile is-half-tablet is-one-third-widescreen is-one-quarter-fullhd',
      className,
    )}
    data-test={dataTest}
  >
    {children}
  </div>
)

export const GridThreeColItem: React.FC<LayoutProps> = ({ children, className, dataTest = '' }) => (
  <div className={cx('column is-multiline is-half-tablet is-one-third-widescreen', className)} data-test={dataTest}>
    {children}
  </div>
)

export const Grid: React.FC<GridProps> = ({
  children,
  isMultiLine = false,
  isVerticalCentered = false,
  isMobile = false,
  className,
  dataTest = '',
  onClick,
}) => (
  <div
    className={cx(
      'columns',
      isMultiLine && 'is-multiline',
      isVerticalCentered && 'is-vcentered',
      isMobile && 'is-mobile',
      className,
    )}
    data-test={dataTest}
    onClick={onClick}
  >
    {children}
  </div>
)

export const GridItem: React.FC<GridItemProps> = ({
  children,
  isMultiLine = false,
  className,
  dataTest = '',
  onClick,
}) => (
  <div className={cx('column', isMultiLine && 'is-multiline', className)} data-test={dataTest} onClick={onClick}>
    {children}
  </div>
)

export const Level: React.FC<LayoutProps> = ({ children, className, dataTest = '' }) => (
  <div className={cx('level', className)} data-test={dataTest}>
    {children}
  </div>
)

export const LevelLeft: React.FC<LayoutProps> = ({ children, className, dataTest = '' }) => (
  <div className={cx('level-left', className)} data-test={dataTest}>
    {children}
  </div>
)

export const LevelRight: React.FC<LayoutProps> = ({ children, className, dataTest = '' }) => (
  <div className={cx('level-right', className)} data-test={dataTest}>
    {children}
  </div>
)

export const LevelItem: React.FC<LayoutProps> = ({ children, className, dataTest = '' }) => (
  <div className={cx('level-item', className)} data-test={dataTest}>
    {children}
  </div>
)

export const Section: React.FC<SectionProps> = ({
  isFlex,
  isCentered,
  isAlignedEnd,
  isAlignedStart,
  isFlexColumn,
  children,
  dataTest = '',
  hasPadding = true,
  hasMargin = true,
  hasBackground = true,
  isFullHeight,
  className,
}) => (
  <section
    className={cx(
      'section',
      isFlex && 'is-flex',
      isCentered && 'is-centered',
      isAlignedEnd && 'is-aligned-end',
      isAlignedStart && 'is-aligned-start',
      isFlexColumn && 'is-flex-column',
      hasPadding && 'has-padding',
      hasMargin && 'has-margin',
      hasBackground && 'has-background',
      isFullHeight && 'is-full-height',
      className,
    )}
    data-test={dataTest}
  >
    {children}
  </section>
)

export const Content: React.FC<LayoutProps> = ({ children, className, dataTest = '' }) => (
  <div className={cx('content', className)} data-test={dataTest}>
    {children}
  </div>
)
