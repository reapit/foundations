import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElGrid, ElCol } from './__styles__'
import { MediaType, useMediaQuery } from '../../hooks/use-media-query'
import * as units from './__styles__/units'

export type GridUnitType = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12
export type ColUnitType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20

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
    return cx(colGapMobile && units[`elColGap${colGapMobile}`], rowGapMobile && units[`elRowGap${rowGapMobile}`])
  }

  if (isTablet) {
    return cx(colGapTablet && units[`elColGap${colGapTablet}`], rowGapTablet && units[`elRowGap${rowGapTablet}`])
  }

  if (isDesktop) {
    return cx(colGapDesktop && units[`elColGap${colGapDesktop}`], rowGapDesktop && units[`elRowGap${rowGapDesktop}`])
  }

  if (isWideScreen) {
    return cx(
      colGapWideScreen && units[`elColGap${colGapWideScreen}`],
      rowGapWideScreen && units[`elRowGap${rowGapWideScreen}`],
    )
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
    return cx(spanMobile && units[`elSpan${spanMobile}`], offsetMobile && units[`elOffset${offsetMobile}`])
  }

  if (isTablet) {
    return cx(spanTablet && units[`elSpan${spanTablet}`], offsetTablet && units[`elOffset${offsetTablet}`])
  }

  if (isDesktop) {
    return cx(spanDesktop && units[`elSpan${spanDesktop}`], offsetDesktop && units[`elOffset${offsetDesktop}`])
  }

  if (isWideScreen) {
    return cx(
      spanWideScreen && units[`elSpan${spanWideScreen}`],
      offsetWideScreen && units[`elOffset${offsetWideScreen}`],
    )
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
