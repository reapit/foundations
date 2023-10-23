import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElPaginationWrap = styled.div`
  width: fit-content;
  margin: 0 auto;
  display: flex;
  align-items: center;
`

export const ElPaginationText = styled.div`
  margin-right: 1rem;
  font-size: var(--font-size-small);
`

export const ElPaginationInput = styled.input`
  font-size: var(--font-size-small);
  text-align: center;
  font-weight: var(--font-weight-bold);
  padding: 0 0.5rem;
  margin: 0;
  font-family: var(--font-sans-serif);
  border-radius: 0.2rem;
  width: 2rem;
  height: 2rem;
  border: none;

  &:focus {
    outline: none;
  }
`

export const ElPaginationButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background: var(--color-white);
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;

  svg {
    color: var(--color-grey-500);
    font-size: 0.75rem;
  }

  &:last-of-type {
    margin-right: 0;
  }
`

export const elPaginationPrimary = css`
  cursor: pointer;
  svg {
    color: var(--intent-primary);
  }
`
