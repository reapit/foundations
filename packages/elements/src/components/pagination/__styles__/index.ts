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
  font-size: 0.875rem;
`

export const ElPaginationButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background: var(--color-grey-light);
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: var(--color-grey-dark);
    font-size: 0.75rem;
  }

  &:first-of-type {
    margin-right: 0.5rem;
  }
`

export const elPaginationPrimary = css`
  svg {
    color: var(--intent-primary);
  }
`
