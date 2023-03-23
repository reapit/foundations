import React, { FC, Fragment, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import {
  elTabsFullWidth,
  ElTabs,
  elTabsItem,
  ElTabsLabel,
  ElTabsWrap,
  ElTabsFooter,
  ElTabsOptionsWrap,
} from './__styles__/index'

export interface TabsOption {
  id: string
  value: string
  text: string
  isChecked: boolean
}

export interface TabsProps extends HTMLAttributes<HTMLInputElement> {
  options: TabsOption[]
  name: string
  isFullWidth?: boolean
}

export const Tabs: FC<TabsProps> = ({ className, isFullWidth, name, options, ...rest }) => {
  return (
    <ElTabsWrap className={cx(className, isFullWidth && elTabsFullWidth)}>
      <ElTabsOptionsWrap>
        {options.map(({ id, value, text, isChecked }) => (
          <Fragment key={id}>
            <ElTabs id={id} name={name} value={value} type="radio" {...rest} defaultChecked={isChecked} />
            <ElTabsLabel htmlFor={id}>
              <span className={elTabsItem}>{text}</span>
            </ElTabsLabel>
          </Fragment>
        ))}
      </ElTabsOptionsWrap>
      <ElTabsFooter className={cx(isFullWidth && elTabsFullWidth)} />
    </ElTabsWrap>
  )
}
