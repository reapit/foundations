import { styled } from 'linaria/react'

export const ElInput = styled.input`
  display: flex;
  color: black;
  background: var(--component-input-bg);
  padding: 0.5rem;
  border: none;

  &:not([type='checkbox']):not([type='radio']) {
    flex-grow: 1;
    border-radius: 0;
    border-bottom: var(--component-input-border-bottom);
  }

  &:focus {
    outline: none;
    background: var(--component-input-focus-bg);
  }

  &[type='checkbox'] {
    appearance: none;
    border: 1px solid var(--color-black);
    width: 1.5rem;
    height: 1.5rem;

    &:checked {
      background-image: url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7072 2.94916C19.3166 2.55861 18.6835 2.55861 18.2929 2.94916L6.31229 14.9299L1.70713 10.3247C1.31662 9.9342 0.683497 9.93424 0.292911 10.3247C-0.0976369 10.7153 -0.0976369 11.3484 0.292911 11.7389L5.60518 17.0511C5.99558 17.4416 6.62917 17.4413 7.0194 17.0511L19.7072 4.36338C20.0977 3.97287 20.0977 3.33971 19.7072 2.94916Z" fill="currentColor"/></svg>');
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 1rem;
      background-color: var(--component-input-focus-bg);
    }
  }

  &[type='radio'] {
    appearance: none;
    border: 1px solid var(--color-black);
    border-radius: 100%;
    width: 1.5rem;
    height: 1.5rem;
    position: relative;

    &:checked {
      &:after {
        content: '';
        display: block;
        position: absolute;
        border-radius: 100%;
        background-color: var(--color-black);
        width: 0.75rem;
        height: 0.75rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`
