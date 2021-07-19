import React, { FC } from 'react'
import styled from 'styled-components'

import Arrow from '../icons/arrow'

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
    <SidebarItemDiv visible={visible} height={height} className="flex flex-col">
      <HeaderDiv
        onClick={() => {
          if (onChange){
            onChange(!visible)
          }
        }}
        className={`cursor-pointer bg-white border-b last:border-b-0 flex items-center px-2 ${
          visible ? 'shadow-sm' : ''
        }`}
      >
        <div className="flex-1 flex items-center">
          <IconContainer>{React.createElement(icon)}</IconContainer>
          <h2 className="text-xs uppercase">{title}</h2>
        </div>
        <Chevron visible={visible}>
          <Arrow />
        </Chevron>
      </HeaderDiv>
      {visible && <div className="w-full flex-1 overflow-auto">{children}</div>}
    </SidebarItemDiv>
  )
}

export default SidebarItem
