import { styled } from 'linaria/react'
import { elIsActive } from '../../../styles-v3/base/states'
import { colorBlueLight } from '../../../styles-v3/base/variables'

const chevronRight = (fill: string) =>
  `data:image/svg+xml;utf8,<svg width="18" height="40" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0L8.8012 0C10.5501 0 13.0962 2.1362 12.6186 2.80527L17.6261 18.8053C17.8695 19.5832 17.8695 20.4168 17.6261 21.1947L12.6186 37.1947C12.0962 38.8638 10.5501 40 8.8012 40H0V0Z" fill="${encodeURIComponent(
    fill,
  )}"/></svg>`

export const ElSecondaryNav = styled.div`
  background: var(--color-blue-dark2);
  padding: 0.75rem;
  border-radius: var(--default-border-radius);
`
export const ElSecondaryNavItem = styled.div`
  padding: 0.75rem;
  color: var(--color-white);
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  border-radius: var(--default-border-radius) 0 0 var(--default-border-radius);

  &${elIsActive} {
    background-repeat: no-repeat;
    background-image: linear-gradient(to right, var(--color-blue-light), var(--color-blue-light));
    outline-color: var(--color-blue-dark);
    background-size: calc(100% - 1rem);
    background-position-x: left;
    padding-right: 1.25rem;

    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      right: 0;
      background-image: url('${chevronRight(colorBlueLight)}');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: right;
    }
  }
`
