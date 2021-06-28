import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElMultiSelectCheckbox, ElMultiSelect, ElMultiSelectLabel } from './__styles__/index'

export interface MultiSelectProps extends HTMLAttributes<HTMLDivElement> {}

export interface MultiSelectChipProps extends HTMLAttributes<HTMLInputElement> {}

export const MultiSelectChip: FC<MultiSelectChipProps> = ({ className, children, id, ...rest }) => (
  <>
    <ElMultiSelectCheckbox id={id} type="checkbox" {...rest} />
    <ElMultiSelectLabel htmlFor={id} className={cx(className && className)}>
      {children}
    </ElMultiSelectLabel>
  </>
)

export const MultiSelect: FC<MultiSelectProps> = ({ className, children, ...rest }) => (
  <ElMultiSelect className={cx(className && className)} {...rest}>
    {children}
  </ElMultiSelect>
)
