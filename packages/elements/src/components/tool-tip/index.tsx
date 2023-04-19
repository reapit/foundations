import { cx } from '@linaria/core'
import React, { FC, PropsWithChildren, useState } from 'react'
import { ElToolTipChild, elToolTipActive, ElToolTipContainer } from './__styles__'

interface ToolTipChildProps extends PropsWithChildren {
  active?: boolean
}

export const ToolTip: FC<{ tip: string } & PropsWithChildren> = ({ children, tip }) => {
  const [active, setActive] = useState<boolean>(false)

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
