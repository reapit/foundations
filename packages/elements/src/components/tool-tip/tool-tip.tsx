import { cx } from '@linaria/core'
import React, { FC, HTMLAttributes, useState } from 'react'
import { ElToolTipChild, elToolTipActive, ElToolTipContainer } from './__styles__'

export interface ToolTipProps extends HTMLAttributes<HTMLDivElement> {
  defaultActive?: boolean
  tip?: string
}

export interface ToolTipChildProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean
  tip?: string
}

export const ToolTip: FC<ToolTipProps> = ({ children, defaultActive = false, tip }) => {
  const [active, setActive] = useState<boolean>(defaultActive)

  return (
    <ElToolTipContainer onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)}>
      {children}
      <ToolTipChild active={active}>{tip}</ToolTipChild>
    </ElToolTipContainer>
  )
}

export const ToolTipChild: FC<ToolTipChildProps> = ({ children, active }) => {
  return <ElToolTipChild className={cx(active && elToolTipActive)}>{children}</ElToolTipChild>
}
