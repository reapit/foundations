import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import {
  ElGrid,
  ElCol,
  ElColSplit,
  ElColHalf,
  ElColSplitThird,
  ElColSplitTwoThirds,
  ElGridThirds,
  ElColQuarter,
} from './__styles__'

export interface GridProps extends HTMLAttributes<HTMLElement> {}

export interface ColProps extends HTMLAttributes<HTMLElement> {}

export const Grid: FC<GridProps> = ({ className, children, ...rest }: GridProps) => (
  <ElGrid className={cx(className)} {...rest}>
    {children}
  </ElGrid>
)

export const Col: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElCol className={cx(className)} {...rest}>
    {children}
  </ElCol>
)

export const ColHalf: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColHalf className={cx(className)} {...rest}>
    {children}
  </ElColHalf>
)

export const ColQuarter: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColQuarter className={cx(className)} {...rest}>
    {children}
  </ElColQuarter>
)

export const ColSplit: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColSplit className={cx(className)} {...rest}>
    {children}
  </ElColSplit>
)

export const GridThirds: FC<GridProps> = ({ className, children, ...rest }: GridProps) => (
  <ElGridThirds className={cx(className)} {...rest}>
    {children}
  </ElGridThirds>
)

export const ColSplitThird: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColSplitThird className={cx(className)} {...rest}>
    {children}
  </ElColSplitThird>
)

export const ColSplitTwoThirds: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColSplitTwoThirds className={cx(className)} {...rest}>
    {children}
  </ElColSplitTwoThirds>
)
