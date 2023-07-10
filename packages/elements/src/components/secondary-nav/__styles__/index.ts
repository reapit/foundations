import { styled } from '@linaria/react'
import { elIsActive } from '../../../styles/states'

export const ElSecondaryNav = styled.div`
  transform: translate3d(-1.5rem, -1.5rem, 0);
  width: 14rem;
`

export const ElSecondaryNavItem = styled.div`
  padding: 0.625rem 1.5rem;
  color: var(--color-grey-medium);
  font-size: var(--font-size-small);
  cursor: pointer;
  position: relative;
  border-left: 3px solid var(--color-white);

  &.${elIsActive} {
    border-left: 3px solid var(--color-brand-dark);
    background-color: var(--color-brand-lightest);
  }

  &:hover {
    border-left: 3px solid var(--color-brand);
    background-color: var(--color-brand-lightest);
  }
`
