import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElGrid, ElCol, ElColSplit } from './__styles__'

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

export const ColSplit: FC<ColProps> = ({ className, children, ...rest }: ColProps) => (
  <ElColSplit className={cx(className)} {...rest}>
    {children}
  </ElColSplit>
)
