import { css } from 'linaria'
import { styled } from 'linaria/react'

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
  width: 100%;
  padding: 0.5rem;
`

export const ElProgressBarLabel = styled.div`
  margin-right: 0.75rem;
`

export const ElProgressBarInner = styled.div`
  display: flex;
  flex-grow: 1;
`

export const ElProgressBarItem = styled.div`
  width: 0;
  height: 3px;
  transition-property: width;
  transition-timing-function: linear;
`

export const elProgressBarLabelRight = css`
  margin-right: 0.75rem;
`
