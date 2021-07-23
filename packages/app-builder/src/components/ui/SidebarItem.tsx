import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
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

import Arrow from '../icons/arrow'
import { bgWhite, cursorPointer, overflowAuto, uppercase } from './styles'

const SidebarItemDiv = styled.div<{ visible?: boolean; height?: string }>`
  height: ${(props) => {
    return props.visible && props.height && props.height !== 'full' ? `${props.height}` : 'auto'
  }};
  flex: ${(props) => {
    return props.visible && props.height && props.height === 'full' ? '1' : 'unset'
  }};
  color: #545454;
`

const Chevron = styled.a<{ visible: boolean }>`
  transform: rotate(
    ${(props) => {
      return props.visible ? 180 : 0
    }}deg
  );
  svg {
    width: 8px !important;
    height: 8px !important;
  }
`

export type SidebarItemProps = {
  title: string
  height?: string
  icon: FC
  visible?: boolean
  onChange?: (bool: boolean) => void
}

const HeaderDiv = styled.div`
  color: #615c5c;
  height: 45px;
  svg {
    fill: #707070;
    width: 16px;
    height: 16px;
  }
`

const IconContainer = styled.div`
  margin-right: 4px;
  display: inline-block;
`

const SidebarItem: React.FC<SidebarItemProps> = ({ visible, icon, title, children, height, onChange }) => {
  return (
    <SidebarItemDiv visible={visible} height={height} className={cx(elFlex, elFlexColumn)}>
      <HeaderDiv
        onClick={() => {
          if (onChange) {
            onChange(!visible)
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
        <Chevron visible={!!visible}>
          <Arrow />
        </Chevron>
      </HeaderDiv>
      {visible && <div className={cx(elWFull, elFlex1, overflowAuto)}>{children}</div>}
    </SidebarItemDiv>
  )
}

export default SidebarItem
