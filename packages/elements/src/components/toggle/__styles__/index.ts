import { styled } from '@linaria/react'
import { css } from '@linaria/core'

export const elHasGreyBg = css``

export const ElToggleItem = styled.span`
  width: 50%;
  height: 100%;
  text-align: center;
  border-radius: 1.2rem;
  font-size: var(--font-size-small);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.75rem;
`

export const ElToggleRadioItem = styled.span`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: var(--font-size-small);
  padding: 0 0.75rem;
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
  position: absolute;

  + label ${ElToggleItem} {
    transition: all 0.2s linear;

    :first-child {
      margin-right: 0.375rem;
    }
  }

  &:not(:checked) + label ${ElToggleItem} {
    :last-child {
      background: var(--intent-primary);
      color: var(--color-white);
    }
  }

  &:checked + label ${ElToggleItem} {
    :first-child {
      background: var(--intent-primary);
      color: var(--color-white);
    }
  }
`

export const ElToggleLabel = styled.label`
  cursor: pointer;
  width: fit-content;
  height: 2rem;
  background: var(--color-white);
  border-radius: 1.5rem;
  border: 1px solid var(--color-grey-medium);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.25rem;

  &.${elHasGreyBg} {
    background: var(--color-grey-light);
    border: 1px solid var(--color-grey-light);
  }

  &.${elToggleFullWidth} {
    width: 100%;
  }
`

export const ElToggleRadio = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;

  + label ${ElToggleRadioItem} {
    transition: all 0.2s linear;
  }

  &:checked + label ${ElToggleRadioItem} {
    background: var(--intent-primary);
    color: var(--color-white);
  }

  &:disabled + label ${ElToggleRadioItem} {
    opacity: 0.35;
  }
`

export const ElToggleRadioLabel = styled.label`
  cursor: pointer;
  width: fit-content;
  background: var(--color-white);
  display: flex;
  align-items: center;
  height: 100%;
  border-radius: 1.5rem;
  margin-right: 0.375rem;

  &.${elHasGreyBg} {
    background: var(--color-grey-light);
  }
`

export const ElToggleRadioWrap = styled.div`
  display: flex;
  border: 1px solid var(--color-grey-medium);
  background: var(--color-white);
  border-radius: 1rem;
  overflow: hidden;
  padding: 0.25rem 0 0.25rem 0.25rem;
  width: fit-content;
  align-items: center;
  height: 2rem;
  position: relative;

  &.${elToggleFullWidth} {
    width: 100%;
  }

  &.${elHasGreyBg} {
    background: var(--color-grey-light);
    border: 1px solid var(--color-grey-light);
  }
`
