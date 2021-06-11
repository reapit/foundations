import { styled } from 'linaria/react'
import { css } from 'linaria'

export const elToggleItem = css`
  width: 50%;
  height: 100%;
  text-align: center;
  border-radius: 0.75rem;
  font-size: 14px;
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
  display: block;
  border-radius: 1rem;
  border: 1px solid var(--color-grey-light);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.2rem;
`
