import { styled } from 'linaria/react'

export const ElTextArea = styled.textarea`
  display: flex;
  color: black;
  background: var(--component-input-bg);
  padding: 0.5rem;
  border: 0;
  border-bottom: var(--component-input-border-bottom);

  &:focus {
    outline: none;
    background: var(--component-input-focus-bg);
  }

  &::placeholder {
    color: var(--color-black);
  }
`
