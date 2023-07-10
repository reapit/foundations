import { styled } from '@linaria/react'

export const ElSelect = styled.select`
  display: flex;
  color: black;
  background-color: var(--component-input-bg);
  padding: 0 0.5rem;
  padding-right: 2rem;
  appearance: none;
  border: none;
  border-bottom: var(--component-input-border-bottom);
  position: relative;
  flex-grow: 1;
  border-radius: 0;
  background-image: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0498 3.17368L6.00273 8.55662L0.956931 3.17508C0.738006 2.94162 0.383056 2.94165 0.164132 3.1751C-0.054715 3.40862 -0.0547118 3.78713 0.164149 4.02062L5.60635 9.82494C5.82527 10.0584 6.1802 10.0583 6.39913 9.82493L11.8413 4.02064L11.8426 4.01921C12.0577 3.78166 12.0516 3.40311 11.8288 3.17369C11.6116 2.94991 11.2671 2.94989 11.0498 3.17368Z" fill="currentColor"/></svg>');
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-default);
  height: 2rem;

  &:focus {
    outline: none;
    background-color: var(--component-input-focus-bg);
    border-bottom: var(--component-input-border-bottom-focus);
  }

  &:hover {
    background-image: url('data:image/svg+xml;utf8,<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0498 9.82632L6.00274 4.44338L0.956931 9.82492C0.738006 10.0584 0.383056 10.0584 0.164132 9.82489C-0.0547151 9.59138 -0.0547118 9.21287 0.164149 8.97937L5.60635 3.17506C5.82528 2.94164 6.18021 2.94165 6.39913 3.17507L11.8413 8.97936L11.8426 8.98079C12.0577 9.21834 12.0516 9.59689 11.8288 9.82631C11.6116 10.0501 11.2671 10.0501 11.0498 9.82632Z" fill="currentColor"/></svg>');
  }
`
