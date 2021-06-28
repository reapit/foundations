import { styled } from '@linaria/react'

export const ElMultiSelectCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;

  :checked + label {
    background: var(--color-grey-light);
    padding: 0.2rem 2rem 0.2rem 1rem;

    &:before {
      content: '';
      position: absolute;
      background-image: url('./tick.svg');
      background-position: center center;
      background-repeat: no-repeat;
      height: 1rem;
      width: 1rem;
      right: 0.5rem;
      margin-top: 2px;
    }

    &:hover {
      &:before {
        background-image: url('./cross.svg');
      }
    }
  }
`

export const ElMultiSelectLabel = styled.label`
  cursor: pointer;
  min-width: 75px;
  width: auto;
  margin-right: 0.75rem;
  margin: 0.375rem;
  height: 28px;
  background: var(--color-white);
  border-radius: 1rem;
  border: 1px solid var(--color-grey-light);
  padding: 0.2rem 1rem;
  position: relative;
  font-size: 14px;
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ElMultiSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: var(--color-white);
  padding: 0.375rem;
`
