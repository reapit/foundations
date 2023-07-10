import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elProgressBarItemDarkBlue = css`
  background-color: var(--color-blue-dark);
`
export const elProgressBarItemMediumBlue = css`
  background-color: var(--intent-primary);
`
export const elProgressBarItemLightBlue = css`
  background-color: var(--intent-secondary);
`
export const elProgressBarItemLightestBlue = css`
  background-color: var(--color-blue-light2);
`
export const elProgressBarItemOrange = css`
  background-color: var(--color-accent-orange);
`

export const ElProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.25rem 0.5rem;
  background-color: var(--color-grey-light);
`

export const ElProgressBarLabel = styled.div`
  font-size: var(--font-size-small);
  flex-shrink: 0;
`

export const ElProgressBarInner = styled.div`
  width: 0;
  display: flex;
  transition: width 0.5s linear;
  margin-right: 0.75rem;
`

export const ElProgressBarItem = styled.div`
  width: 20%;
  height: 3px;
`

export const elProgressBarLabelRight = css`
  margin-right: auto;
`

export const elProgressBarLabelLeft = css`
  margin-left: auto;
`
