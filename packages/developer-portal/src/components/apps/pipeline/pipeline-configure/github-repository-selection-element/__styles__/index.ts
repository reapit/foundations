import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const InstallationSelectionEl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.25rem;
  padding: 0.25rem;
  cursor: pointer;
  &:hover {
    background: var(--color-grey-50);
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  img {
    width: 50px;
    height: auto;
    margin-right: 1rem;
  }
`

export const RepositorySelectionEl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 0.25rem;
  cursor: pointer;
  &:hover {
    background: var(--color-grey-50);
  }

  img {
    width: 50px;
    height: auto;
    margin-right: 1rem;
  }
`

export const RepositorySelectionActive = css`
  background: var(--color-grey-100);
`

export const RepositoryEl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0rem;

  .repository-name {
    font-weight: bold;
  }

  img {
    width: 100px;
    height: auto;
  }
`

export const LevelEl = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-right: 1rem;
  }
`

export const SelectedRepositoryEl = styled.div`
  border-radius: 0.125rem;
  border: var(--component-input-border);
  height: 2.25rem;
  min-width: 0;
  flex-grow: 1;
  order: 3;
  width: 100%;
  padding: 0.5rem 0.6875rem;
  margin: 0;
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-small);
  display: flex;
`
