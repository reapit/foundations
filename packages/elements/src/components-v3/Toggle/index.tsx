import React, { FC, Fragment, HTMLAttributes } from 'react'
import { cx } from 'linaria'
import {
  ElToggleCheckbox,
  ElToggleLabel,
  ElToggleRadio,
  elToggleRadioItem,
  ElToggleRadioLabel,
  ElToggleRadioWrap,
} from './__styles__/index'

export interface ToggleProps extends HTMLAttributes<HTMLInputElement> {}

export interface ToggleRadioOption {
  id: string
  value: string
  text: string
  isChecked: boolean
}

export interface ToggleRadioProps extends HTMLAttributes<HTMLInputElement> {
  options: ToggleRadioOption[]
  name: string
}

export const Toggle: FC<ToggleProps> = ({ className, children, id, ...rest }) => (
  <>
    <ElToggleCheckbox id={id} type="checkbox" {...rest} />
    <ElToggleLabel htmlFor={id} className={cx(className && className)}>
      {children}
    </ElToggleLabel>
  </>
)

export const ToggleRadio: FC<ToggleRadioProps> = ({ className, name, options, ...rest }) => (
  <ElToggleRadioWrap>
    {options.map(({ id, value, text, isChecked }) => (
      <Fragment key={id}>
        <ElToggleRadio id={id} name={name} value={value} type="radio" {...rest} defaultChecked={isChecked} />
        <ElToggleRadioLabel htmlFor={id} className={cx(className && className)}>
          <span className={elToggleRadioItem}>{text}</span>
        </ElToggleRadioLabel>
      </Fragment>
    ))}
  </ElToggleRadioWrap>
)
