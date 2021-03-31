import { styled } from 'linaria/react'

export const inputBg = '#ffffff'
export const inputFocusBg = 'var(--color-grey-light)'
export const inputShadow = 'inset 0px -1px 0px #000000'

export const ElInput = styled.input`
  display: flex;
  color: black;
  background: ${inputBg};
  padding: 0.5rem;
  border: none;
  box-shadow: ${inputShadow};
  flex-grow: 1;

  &:focus {
    outline: none;
    background: ${inputFocusBg};
  }
`
