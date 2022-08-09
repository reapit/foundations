import { styled } from '@linaria/react'
import { elIsActive } from '../../../styles/states'
import { ElIcon } from '../../icon/__styles__'

export const ElModalBg = styled.div`
  display: none;
  z-index: 98;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: var(--color-grey-dark);
  opacity: 0.2;

  &.${elIsActive} {
    display: block;
    position: fixed;
  }
`

export const ElModal = styled.div`
  display: none;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.12);
  border-radius: var(--default-border-radius);
  background: white;
  z-index: 99;
  width: 65%;
  min-width: 300px;
  max-width: 800px;

  &.${elIsActive} {
    display: block;
    position: fixed;
  }
`

export const ElModalHeader = styled.div`
  background: var(--color-grey-light);
  color: var(--color-black);
  border-radius: var(--default-border-radius) var(--default-border-radius) 0 0;
  font-family: var(--font-sans-serif);
  font-weight: normal;
  font-size: var(--font-size-subheading);
  padding: 0.5rem 0;
  text-align: center;

  ${ElIcon} {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.5rem;
    cursor: pointer;
  }
`

export const ElModalBody = styled.div`
  padding: 2rem;
`
