import { styled } from '@linaria/react'

export const ElTextArea = styled.textarea`
  display: flex;
  color: black;
  flex-grow: 1;
  background: var(--component-input-bg);
  padding: 0.5rem;
  border: 0;
  border-bottom: var(--component-input-border-bottom);
  min-height: 8rem;
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-default);

  &:focus {
    outline: none;
    background: var(--component-input-focus-bg);
    border-bottom: var(--component-input-border-bottom-focus);
  }

  &::placeholder {
    color: var(--color-grey-dark);
    font-family: var(--font-sans-serif);
    font-size: var(--font-size-default);
  }
`
