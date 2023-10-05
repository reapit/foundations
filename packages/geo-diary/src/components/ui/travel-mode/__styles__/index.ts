import { styled } from '@linaria/react'
import { isDesktop } from '../../../../core/__styles__/media'

export const ToggleTravelCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`

export const ToggleTravelLabel = styled.label`
  cursor: pointer;
  height: 5rem;
  width: 2.5rem;
  background: var(--intent-primary);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;

  ${isDesktop} {
    height: 2.5rem;
    width: 5rem;
    flex-direction: row;
    position: relative;
    bottom: auto;
    right: auto;
  }
`
