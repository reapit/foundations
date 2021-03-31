import { styled } from 'linaria/react'
import { inputBg, inputFocusBg, inputShadow } from '../../Input/__styles__'

export const ElSelect = styled.select`
  display: flex;
  color: black;
  background-color: ${inputBg};
  padding: 0.5rem;
  padding-right: 2rem;
  appearance: none;
  border: none;
  position: relative;
  box-shadow: ${inputShadow};
  flex-grow: 1;

  background-image: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0498 3.17368L6.00273 8.55662L0.956931 3.17508C0.738006 2.94162 0.383056 2.94165 0.164132 3.1751C-0.054715 3.40862 -0.0547118 3.78713 0.164149 4.02062L5.60635 9.82494C5.82527 10.0584 6.1802 10.0583 6.39913 9.82493L11.8413 4.02064L11.8426 4.01921C12.0577 3.78166 12.0516 3.40311 11.8288 3.17369C11.6116 2.94991 11.2671 2.94989 11.0498 3.17368Z" fill="currentColor"/>
  </svg>');
  background-position: right 0.5rem center;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
    background-color: ${inputFocusBg};
  }
`
