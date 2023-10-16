import { styled } from '@linaria/react'
import { elIsActive } from '../../../styles/states'
import { isTablet } from '../../../styles/media'

export const ElDrawerBg = styled.div`
  display: none;
  z-index: 98;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--color-grey-500);
  opacity: 0.2;

  &.${elIsActive} {
    display: block;
    position: fixed;
  }
`

export const ElDrawer = styled.div`
  display: none;
  top: 0;
  box-shadow: 0px 4px 16px 0px rgba(34, 43, 51, 0.16);
  background: white;
  z-index: 99;
  width: 100%;
  height: 100%;

  &.${elIsActive} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
  }

  ${isTablet} {
    right: -480px;
    width: 480px;

    &.${elIsActive} {
      transform: translate(-480px, 0);
    }
  }
`

export const ElDrawerHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--color-grey-100);
`

export const ElDrawerSubtitle = styled.div`
  color: var(--color-grey-500);
  font-size: var(--font-size-default);
`

export const ElDrawerTitle = styled.div`
  color: var(--color-black);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-small-subheading);

  &:has(~ ${ElDrawerSubtitle}) {
    margin-bottom: 0.25rem;
  }
`

export const ElDrawerBody = styled.div`
  padding: 1.5rem 2rem;
  height: 100%;
`

export const ElDrawerFooter = styled.div`
  border-top: 1px solid var(--color-grey-100);
  padding: 0.875rem 2rem;
`
