import { styled } from 'linaria/react'
import { css } from 'linaria'

export const elToggleItem = css`
  width: 50%;
  height: 100%;
  text-align: center;
  border-radius: 1.2rem;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const elToggleRadioItem = css`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 14px;
  padding: 0 1rem;
  border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const elToggleFullWidth = css`
  width: 100%;
  justify-content: space-evenly;
`

export const ElToggleCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  + label .${elToggleItem} {
    transition: all 0.2s linear;

    :first-child {
      margin-right: 0.375rem;
    }
  }

  &:not(:checked) + label .${elToggleItem} {
    :last-child {
      background: var(--intent-primary);
      color: var(--color-white);
    }
  }

  &:checked + label .${elToggleItem} {
    :first-child {
      background: var(--intent-primary);
      color: var(--color-white);
    }
  }
`

export const ElToggleLabel = styled.label`
  cursor: pointer;
  width: 146px;
  height: 1.5rem;
  background: var(--color-white);
  border-radius: 1.5rem;
  border: 1px solid var(--color-grey-medium);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.25rem;
`

export const ElToggleRadio = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  + label .${elToggleRadioItem} {
    transition: all 0.2s linear;
  }

  &:checked + label .${elToggleRadioItem} {
    background: var(--intent-primary);
    color: var(--color-white);
  }
`

export const ElToggleRadioLabel = styled.label`
  cursor: pointer;
  min-width: 72px;
  background: var(--color-white);
  display: flex;
  align-items: center;
  margin: 0 auto;
  height: 1.5rem;
  border-radius: 1.5rem;
`

export const ElToggleRadioWrap = styled.div`
  display: flex;
  border: 1px solid var(--color-grey-medium);
  background: var(--color-white);
  border-radius: 1rem;
  overflow: hidden;
  padding: 0.25rem;
  width: fit-content;
  align-items: center;

  &.${elToggleFullWidth} {
    width: 100%;
  }
`
