import { styled } from 'linaria/react'
import { css } from 'linaria'

export const elToggleItem = css`
  width: 50%;
  height: 100%;
  text-align: center;
  border-radius: 0.75rem;
  font-size: 14px;
`

export const elToggleRadioItem = css`
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 0.75rem;
  font-size: 14px;
  padding: 0 1rem;
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
  height: 30px;
  background: var(--color-white);
  border-radius: 1rem;
  border: 1px solid var(--color-grey-light);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.2rem;
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

  &:not(:last-child) {
    margin-right: 0.375rem;
  }
`

export const ElToggleRadioWrap = styled.div`
  display: flex;
  border: 1px solid var(--color-grey-light);
  background: var(--color-white);
  border-radius: 1rem;
  overflow: hidden;
  height: 30px;
  padding: 0.2rem;
  width: fit-content;
`
