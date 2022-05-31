import { styled } from '@linaria/react'
import { css } from '@linaria/core'

export const elTabsItem = css`
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 0.25rem 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  border-bottom: 2px solid var(--color-white);
`

export const elTabsFullWidth = css`
  width: 100%;
  justify-content: space-evenly;
`

export const ElTabs = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  margin: 0;
  position: absolute;

  + label .${elTabsItem} {
    transition: all 0.1s linear;
  }

  &:not(:checked) + label .${elTabsItem} {
    &:hover {
      color: var(--intent-secondary);
    }
  }

  &:checked + label .${elTabsItem} {
    text-shadow: 0px 0px 1px black;
    border-bottom: 2px solid var(--intent-secondary);
  }
`

export const ElTabsLabel = styled.label`
  cursor: pointer;
  background: var(--color-white);
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  border-radius: 1.5rem;

  &:last-child {
    margin-right: 0;
  }
`

export const ElTabsWrap = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border-radius: 1rem;
  overflow: hidden;
  padding: 0.25rem 0;
  width: fit-content;
  align-items: flex-start;
  height: auto;
  overflow-x: auto;

  &.${elTabsFullWidth} {
    width: 100%;
  }
`

export const ElTabsOptionsWrap = styled.div`
  display: flex;
`

export const ElTabsFooter = styled.div`
  width: 100%;
  height: 1.125rem;
  background: linear-gradient(180deg, #f7f7f7 0%, rgba(242, 242, 242, 0) 50%);
  border-top: 1px solid var(--color-grey-medium);
`
