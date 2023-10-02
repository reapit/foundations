import { styled } from '@linaria/react'
import { elIsActive } from '../../../styles/states'

export const ElSecondaryNav = styled.div`
  transform: translate3d(-1.5rem, -1.5rem, 0);
  width: 14rem;
`

export const ElSecondaryNavItem = styled.div`
  padding: 0.625rem 1.5rem;
  color: var(--color-grey-400);
  font-size: var(--font-size-small);
  cursor: pointer;
  position: relative;
  border-left: 3px solid var(--color-white);

  &.${elIsActive} {
    border-left: 3px solid var(--color-purple-700);
    background-color: var(--color-purple-50);
  }

  &:hover {
    border-left: 3px solid var(--color-purple-500);
    background-color: var(--color-purple-50);
  }
`
