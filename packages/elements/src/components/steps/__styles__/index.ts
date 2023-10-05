import { styled } from '@linaria/react'
import { isDesktop } from '../../../styles/media'
import { elIsActive, elIsUsed } from '../../../styles/states'

export const ElSteps = styled.div`
  display: flex;
`
export const ElStep = styled.div`
  background-color: var(--color-grey-100);
  color: var(--color-grey-500);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-default);
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 var(--component-steps-gutter-width);
  margin-top: 0.25rem;
  transition: 0.3s;
  transform-origin: top;
  cursor: pointer;

  &.${elIsUsed} {
    &:before,
    &:after {
      background: var(--color-grey-100);
    }
  }

  &.${elIsActive} {
    margin-top: 0rem;
    font-size: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-white);
    background-color: var(--intent-primary);
  }

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    width: var(--component-steps-gutter-width);
    height: 1.5px;
    background: var(--color-grey-100);
  }

  &:before {
    left: calc(var(--component-steps-gutter-width) * -1);
  }

  &:after {
    right: calc(var(--component-steps-gutter-width) * -1);
  }

  &:first-child {
    margin-left: 0;

    &:before {
      display: none;
    }
  }

  &:last-child {
    margin-right: 0;

    &:after {
      display: none;
    }
  }
`

export const ElStepsVertical = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const ElStepVertical = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.25rem;

  ${isDesktop} {
    flex-direction: row;
  }
`

export const ElStepVerticalItem = styled.div`
  display: flex;
  width: 100%;
  margin: 2.5rem 0 1.25rem 0;

  ${isDesktop} {
    width: 6.5rem;
    justify-content: center;
    margin: 0;
  }
`

export const ElStepVerticalContent = styled.div`
  width: 100%;
`
