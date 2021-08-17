import { styled } from '@linaria/react'

export const ElPipelineTask = styled.li`
  display: flex;
  align-items: center;
  margin: 0.25rem 0;
  margin-left: -0.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-grey-medium);

  &:hover,
  &:active,
  &:focus {
    background: var(--color-grey-light);
    cursor: pointer;
  }

  .shape-tag {
    margin-left: 0;
  }
`
