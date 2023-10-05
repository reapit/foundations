import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elTextAreaHasError = css``

export const ElTextArea = styled.textarea`
  display: flex;
  color: var(--color-black);
  flex-grow: 1;
  background: var(--component-input-bg);
  padding: 0.5rem 0.6875rem;
  border: var(--component-input-border);
  min-height: 8rem;
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-small);
  border-radius: 0.125rem;

  &:focus {
    outline: none;
    border: var(--component-input-border-focus);
  }

  &.${elTextAreaHasError} {
    border: 1px solid var(--intent-danger);
    background-color: var(--color-red-100);
  }

  &::placeholder {
    color: var(--color-grey-400);
    font-family: var(--font-sans-serif);
    font-size: var(--font-size-small);
  }
`
