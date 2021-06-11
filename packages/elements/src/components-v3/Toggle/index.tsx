import React, { FC, HTMLAttributes } from 'react'
import { cx } from 'linaria'
import { ElToggleCheckbox, ElToggleLabel } from './__styles__/index'

export interface ToggleProps extends HTMLAttributes<HTMLInputElement> {}

export const Toggle: FC<ToggleProps> = ({ className, children, id, ...rest }) => (
  <>
    <ElToggleCheckbox id={id} type="checkbox" {...rest} />
    <ElToggleLabel htmlFor={id} className={cx(className && className)}>
      {children}
    </ElToggleLabel>
  </>
)
