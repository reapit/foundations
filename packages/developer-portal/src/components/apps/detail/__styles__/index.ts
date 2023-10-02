import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const PermissionChip = styled.div`
  background: var(--color-grey-100);
  color: var(--color-grey-500);
  font-size: var(--font-size-small);
  border-radius: 1rem;
  padding: 0.25rem 0.625rem;
  margin: 0.25rem 0.5rem 0.25rem 0;
  display: inline-block;
`

export const LinkChip = styled.div`
  background: var(--color-grey-100);
  color: var(--color-grey-500);
  font-size: var(--font-size-small);
  border-radius: 1rem;
  padding: 0.25rem 0.625rem;
  margin: 0.25rem 0.5rem 0.25rem 0;
  display: inline-block;
  cursor: pointer;

  &:hover {
    color: var(--intent-primary);
  }
`

export const textOverflow = css`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const textOverflowContainer = css`
  width: calc(100% - 3.25rem);
`
