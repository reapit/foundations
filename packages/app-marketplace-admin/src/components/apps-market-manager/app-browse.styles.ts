import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const reactPickerStyles = css`
  order: 3;
`

export const colorSquare = css`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  display: inline-block;
  margin: 0 0.25rem;
  line-height: 1.5rem;
  margin-top: 0.25rem;
`

export const ElTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 0.25rem 0;
`

export const ElTag = styled.span`
  background: var(--color-grey-light);
  border-radius: 1rem;
  margin: 0 0.5rem 0.5rem 0;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
`

export const ImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
export const iconButton = css`
  padding: 0.25rem;
`
