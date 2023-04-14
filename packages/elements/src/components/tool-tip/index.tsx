import { cx } from '@linaria/core'
import React, { useState } from 'react'
import { ElToolTipChild, elToolTipActive, ElToolTipContainer } from './__styles__'

interface ToolTipChildProps {
  active?: boolean
}

export const ToolTip: React.FC<{ tip: string }> = ({ children, tip }) => {
  const [active, setActive] = useState<boolean>(false)

  return (
    <ElToolTipContainer onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)}>
      {children}
      <ToolTipChild active={active}>{tip}</ToolTipChild>
    </ElToolTipContainer>
  )
}

export const ToolTipChild: React.FC<ToolTipChildProps> = ({ children, active }) => {
  return <ElToolTipChild className={cx(active && elToolTipActive)}>{children}</ElToolTipChild>
}
