import { cx } from '@linaria/core'
import {
  elBorderB,
  elFlex,
  elFlex1,
  elFlexAlignCenter,
  elFlexColumn,
  elPx2,
  ElSmallText,
  elWFull,
} from '@reapit/elements'
import React, { FC } from 'react'

import Arrow from '../../icons/arrow'
import { bgWhite, cursorPointer, overflowAuto, uppercase } from '../styles'
import { Chevron, HeaderDiv, IconContainer, SidebarItemDiv } from './styles'

type SidebarItemProps = {
  title: string
  height?: string
  icon: FC
  expanded?: boolean
  onChange?: (bool: boolean) => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({ expanded, icon, title, children, height, onChange }) => {
  return (
    <SidebarItemDiv expanded={expanded} height={height} className={cx(elFlex, elFlexColumn)}>
      <HeaderDiv
        onClick={() => {
          if (onChange) {
            onChange(!expanded)
          }
        }}
        className={cx(cursorPointer, bgWhite, elBorderB, elFlex, elFlexAlignCenter, elPx2)}
      >
        <div className={cx(elFlex, elFlex1, elFlexAlignCenter)}>
          <IconContainer>{icon}</IconContainer>
          <ElSmallText className={cx(uppercase)} style={{ marginBottom: 0 }}>
            {title}
          </ElSmallText>
        </div>
        <Chevron expanded={!!expanded}>
          <Arrow />
        </Chevron>
      </HeaderDiv>
      {expanded && <div className={cx(elWFull, elFlex1, overflowAuto)}>{children}</div>}
    </SidebarItemDiv>
  )
}

export default SidebarItem
