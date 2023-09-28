import { styled } from '@linaria/react'

export const ElInput = styled.input`
  display: flex;
  color: var(--color-black);
  background: var(--component-input-bg);
  padding: 0.5rem 0.6875rem;
  margin: 0;
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-small);

  &:not([type='checkbox']):not([type='radio']) {
    flex-grow: 1;
    border-radius: 0.125rem;
    border: var(--component-input-border);
    height: 2rem;

    &:focus {
      border: var(--component-input-border-focus);
    }
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: var(--color-grey-400);
    font-family: var(--font-sans-serif);
    font-size: var(--font-size-small);
  }

  &:disabled {
    color: rgba(100, 100, 100, 0.35);

    ::placeholder {
      color: rgba(100, 100, 100, 0.35);
    }
  }

  &[type='search']::-webkit-search-decoration {
    display: none;
  }

  &[type='checkbox'] {
    appearance: none;
    border: var(--component-input-border);
    background-color: var(--color-white);
    border-radius: 0.125rem;
    width: 1.5rem;
    height: 1.5rem;

    &:checked {
      background-image: url('data:image/svg+xml;utf8,<svg width="1em" height="1em" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.2529 2.25459C10.9205 1.91513 10.3795 1.91515 10.0471 2.25457L4.03736 8.41347L1.45291 5.77405C1.12054 5.43458 0.579492 5.43467 0.247127 5.77403C-0.0823813 6.11051 -0.0823676 6.65391 0.24712 6.99041L3.43448 10.2455C3.76682 10.585 4.30815 10.5847 4.64026 10.2455L11.2529 3.47098C11.5824 3.13448 11.5823 2.59107 11.2529 2.25459Z" fill="white"/></svg>');
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 0.75rem;
      border: 1px solid var(--color-grey-400);
      background-color: var(--intent-primary);
      border: 1px solid var(--intent-primary);
    }
  }

  &[type='radio'] {
    appearance: none;
    border: var(--component-input-border);
    background-color: var(--color-white);
    border-radius: 100%;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    display: inline-block;
    margin-right: 0.375rem;

    &:checked {
      &:after {
        content: '';
        display: block;
        position: absolute;
        border-radius: 100%;
        border: 1px solid var(--intent-primary);
        background-color: var(--intent-primary);
        width: 0.75rem;
        height: 0.75rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  &[type='file'] {
    font-family: var(--font-sans-serif);
    &::file-selector-button {
      visibility: hidden;
      width: 0;
    }
  }
`
