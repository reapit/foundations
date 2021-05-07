import { css } from 'linaria'
import { styled } from 'linaria/react'

export const ContextMenuWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const ContextMenuItems = styled.div`
  position: absolute;
  box-shadow: 2px 4px 14px rgba(0, 0, 0, 0.07);
  background: #fff;
  right: -0.75rem;
  top: -0.75rem;
`

export const ContextMenuItem = styled.div`
  padding: 0.75rem;
  cursor: pointer;
`

export const ContextMenuToggle = styled.div`
  position: absolute;
  padding-right: 0.25rem;
  font-weight: bold;
  cursor: pointer;
`

export const isHidden = css`
  display: none;
`
