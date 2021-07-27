import { styled } from '@linaria/react'

export const SidebarItemDiv = styled.div<{ expanded?: boolean; height?: string }>`
  height: ${(props) => {
    return props.expanded && props.height && props.height !== 'full' ? `${props.height}` : 'auto'
  }};
  flex: ${(props) => {
    return props.expanded && props.height && props.height === 'full' ? '1' : 'unset'
  }};
  color: #545454;
`

export const Chevron = styled.a<{ expanded: boolean }>`
  transform: rotate(
    ${(props) => {
      return props.expanded ? 180 : 0
    }}deg
  );
  svg {
    width: 8px !important;
    height: 8px !important;
  }
`

export const HeaderDiv = styled.div`
  color: #615c5c;
  height: 45px;
  svg {
    fill: #707070;
    width: 16px;
    height: 16px;
  }
`

export const IconContainer = styled.div`
  margin-right: 4px;
  display: inline-block;
`
