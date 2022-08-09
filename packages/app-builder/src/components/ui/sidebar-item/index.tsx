import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import { elBorderGreyB, elFlex, elFlex1, elFlexAlignCenter, elFlexColumn, elPx3, elWFull } from '@reapit/elements'
import React from 'react'

import Arrow from '../../icons/arrow'
import { bgWhite, cursorPointer, overflowAuto } from '../styles'
import { Chevron, HeaderDiv, SidebarItemDiv } from './styles'

type SidebarItemProps = {
  title: string
  height?: string
  expanded?: boolean
  onChange?: (bool: boolean) => void
}

export const SubtitleBold = styled.h2`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: black;
  font-feature-settings: 'liga' off;
`

const SidebarItem: React.FC<SidebarItemProps> = ({ expanded, title, children, height, onChange }) => {
  return (
    <SidebarItemDiv expanded={expanded} height={height} className={cx(elFlex, elFlexColumn)}>
      <HeaderDiv
        onClick={() => {
          if (onChange) {
            onChange(!expanded)
          }
        }}
        className={cx(cursorPointer, bgWhite, elBorderGreyB, elFlex, elFlexAlignCenter, elPx3)}
      >
        <div className={cx(elFlex, elFlex1, elFlexAlignCenter)}>
          <SubtitleBold style={{ marginBottom: 0 }}>{title}</SubtitleBold>
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
