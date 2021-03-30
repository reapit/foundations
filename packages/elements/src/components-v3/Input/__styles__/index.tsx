import { styled } from 'linaria/react'
import { ElIcon } from '../../Icon/__styles__'
import { ElLabel } from '../../Label/__styles__'

export const inputBg = '#ffffff'
export const inputFocusBg = 'var(--color-grey-light)'

export const ElInput = styled.input`
  display: flex;
  color: black;
  background: ${inputBg};
  padding: 0.5rem;
  border: none;
  box-shadow: inset 0px -1px 0px #000000;
  flex-grow: 1;

  &:focus {
    outline: none;
    background: ${inputFocusBg};
  }
`
