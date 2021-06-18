import { cx } from 'linaria'
import React, { FC, HTMLAttributes } from 'react'
import {
  ElProgressBarContainer,
  ElProgressBarLabel,
  ElProgressBarInner,
  ElProgressBarItem,
  elProgressBarLabelRight,
  elProgressBarItemDarkBlue,
  elProgressBarItemLightBlue,
  elProgressBarItemLightestBlue,
  elProgressBarItemMediumBlue,
  elProgressBarItemOrange,
} from './__styles__'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  duration: number
}

export interface ProgressBarBaseProps extends HTMLAttributes<HTMLDivElement> {}

export const ProgressBarContainer: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarContainer {...rest}>{children}</ElProgressBarContainer>
)

export const ProgressBarInner: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarInner {...rest}>{children}</ElProgressBarInner>
)

export const ProgressBarItem: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarItem {...rest}>{children}</ElProgressBarItem>
)

export const ProgressBarLabel: FC<ProgressBarBaseProps> = ({ children, ...rest }) => (
  <ElProgressBarLabel {...rest}>{children}</ElProgressBarLabel>
)

export const ProgressBar: FC<ProgressBarProps> = ({ duration, ...rest }) => {
  const transitionDuration = duration / 100
  const percentageComplete = Math.ceil(rThe)
  const itemWidth = percentComplete / 5
  return (
    <ProgressBarContainer {...rest}>
      <ProgressBarInner>
        <ProgressBarItem
          className={elProgressBarItemDarkBlue}
          style={{ width: `${itemWidth}%`, transitionDuration: `${transitionDuration}s` }}
        />
        <ProgressBarItem
          className={elProgressBarItemMediumBlue}
          style={{ width: `${itemWidth}%`, transitionDuration: `${transitionDuration}s` }}
        />
        <ProgressBarItem
          className={elProgressBarItemLightBlue}
          style={{ width: `${itemWidth}%`, transitionDuration: `${transitionDuration}s` }}
        />
        <ProgressBarItem
          className={elProgressBarItemLightestBlue}
          style={{ width: `${itemWidth}%`, transitionDuration: `${transitionDuration}s` }}
        />
        <ProgressBarItem
          className={elProgressBarItemOrange}
          style={{ width: `${itemWidth}%`, transitionDuration: `${transitionDuration}s` }}
        />
      </ProgressBarInner>
      <ProgressBarLabel className={elProgressBarLabelRight}>{percentComplete}%</ProgressBarLabel>
    </ProgressBarContainer>
  )
}
