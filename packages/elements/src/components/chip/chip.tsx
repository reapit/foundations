import React, { FC, HTMLAttributes, InputHTMLAttributes, useMemo } from 'react'
import { cx } from '@linaria/core'
import { ElChipCheckbox, ElChipLabel, ElChipGroup, ElChipGroupInner } from './__styles__'
import { generateRandomId } from '../../storybook/random-id'

export interface ChipProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Chip: FC<ChipProps> = ({ children, className, id, ...rest }) => {
  const chipId = useMemo(() => {
    if (id) return id
    return generateRandomId()
  }, [id])

  return (
    <>
      <ElChipCheckbox id={id ?? chipId} type="checkbox" {...rest} />
      <ElChipLabel htmlFor={id ?? chipId} className={cx(className)}>
        {children}
      </ElChipLabel>
    </>
  )
}

export const ChipGroup: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
  <ElChipGroup className={cx(className)} {...rest}>
    <ElChipGroupInner>{children}</ElChipGroupInner>
  </ElChipGroup>
)
