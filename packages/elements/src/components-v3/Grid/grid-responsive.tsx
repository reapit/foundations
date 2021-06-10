import React, { FC, HTMLAttributes } from 'react'
import { cx } from 'linaria'
import { ElGrid, ElCol } from './__styles__'
import { MediaType, useMediaQuery } from '../../hooks/use-media-query'

export type GridUnitType = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12
export type ColUnitType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface GridResponsiveProps extends HTMLAttributes<HTMLElement> {
  colGapMobile?: GridUnitType
  colGapTablet?: GridUnitType
  colGapDesktop?: GridUnitType
  colGapWideScreen?: GridUnitType
  rowGapMobile?: GridUnitType
  rowGapTablet?: GridUnitType
  rowGapDesktop?: GridUnitType
  rowGapWideScreen?: GridUnitType
}

export interface ColResponsiveProps extends HTMLAttributes<HTMLElement> {
  spanMobile?: ColUnitType
  spanTablet?: ColUnitType
  spanDesktop?: ColUnitType
  spanWideScreen?: ColUnitType
  offsetMobile?: ColUnitType
  offsetTablet?: ColUnitType
  offsetDesktop?: ColUnitType
  offsetWideScreen?: ColUnitType
}

export const getGridClasses = (props: GridResponsiveProps, mediaType: MediaType): string | null => {
  const {
    colGapMobile,
    colGapTablet,
    colGapDesktop,
    colGapWideScreen,
    rowGapMobile,
    rowGapTablet,
    rowGapDesktop,
    rowGapWideScreen,
  } = props

  const { isMobile, isTablet, isDesktop, isWideScreen } = mediaType

  if (isMobile) {
    return cx(colGapMobile && `elColGap${colGapMobile}`, rowGapMobile && `elRowGap${rowGapMobile}`)
  }

  if (isTablet) {
    return cx(colGapTablet && `elColGap${colGapTablet}`, rowGapTablet && `elRowGap${rowGapTablet}`)
  }

  if (isDesktop) {
    return cx(colGapDesktop && `elColGap${colGapDesktop}`, rowGapDesktop && `elRowGap${rowGapDesktop}`)
  }

  if (isWideScreen) {
    return cx(colGapWideScreen && `elColGap${colGapWideScreen}`, rowGapWideScreen && `elRowGap${rowGapWideScreen}`)
  }

  return null
}

export const getColClasses = (props: ColResponsiveProps, mediaType: MediaType): string | null => {
  const {
    spanMobile,
    spanTablet,
    spanDesktop,
    spanWideScreen,
    offsetMobile,
    offsetTablet,
    offsetDesktop,
    offsetWideScreen,
  } = props

  const { isMobile, isTablet, isDesktop, isWideScreen } = mediaType

  if (isMobile) {
    return cx(spanMobile && `elSpan${spanMobile}`, offsetMobile && `elOffset${offsetMobile}`)
  }

  if (isTablet) {
    return cx(spanTablet && `elSpan${spanTablet}`, offsetTablet && `elOffset${offsetTablet}`)
  }

  if (isDesktop) {
    return cx(spanDesktop && `elSpan${spanDesktop}`, offsetDesktop && `elOffset${offsetDesktop}`)
  }

  if (isWideScreen) {
    return cx(spanWideScreen && `elSpan${spanWideScreen}`, offsetWideScreen && `elOffset${offsetWideScreen}`)
  }

  return null
}

export const GridResponsive: FC<GridResponsiveProps> = (props: GridResponsiveProps) => {
  const { className, children, ...rest } = props
  const mediaType = useMediaQuery()
  const gridClasses = getGridClasses(props, mediaType)
  return (
    <ElGrid className={cx(gridClasses && gridClasses, className && className)} {...rest}>
      {children}
    </ElGrid>
  )
}

export const ColResponsive: FC<ColResponsiveProps> = (props: ColResponsiveProps) => {
  const { className, children, ...rest } = props
  const mediaType = useMediaQuery()
  const colClasses = getColClasses(props, mediaType)
  return (
    <ElCol className={cx(colClasses && colClasses, className && className)} {...rest}>
      {children}
    </ElCol>
  )
}
