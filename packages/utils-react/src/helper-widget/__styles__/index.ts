import { styled } from '@linaria/react'
import { css } from '@linaria/core'

export const slideOutIsActive = css``
export const widgetIsActive = css``
export const widgetButtonIsActive = css``

export const WidgetButton = styled.button`
  border: none;
  border-radius: 1.5rem;
  width: 5rem;
  height: 2.5rem;
  margin-left: 0.25rem;
  background-color: var(--color-blue-dark);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &.${widgetButtonIsActive} {
    background-color: var(--intent-secondary);
  }

  &:last-child {
    height: 3rem;
    width: 3rem;
    margin-left: 1.5rem;
    text-transform: uppercase;
    font-weight: bold;
    opacity: 1;
  }

  &:hover:not(.${widgetButtonIsActive}) {
    background-color: var(--color-blue-dark2);
  }

  svg {
    margin-right: 0.25rem;
  }
`

export const WidgetContainer = styled.div`
  background-color: var(--color-blue-dark);
  position: absolute;
  display: flex;
  bottom: 1.25rem;
  right: 1.25rem;
  z-index: 12;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: flex-end;
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.5s ease-in-out;

  &.${widgetIsActive} {
    width: 20.25rem;

    ${WidgetButton} {
      opacity: 1;
    }
  }
`

export const SlideOutContainer = styled.div`
  background-color: var(--color-white);
  width: 22.5rem;
  height: 100%;
  position: absolute;
  right: -22.5rem;
  top: 0;
  transition: right 0.5s ease-in-out;
  z-index: 11;
  box-shadow: -4px -6px 32px rgba(0, 0, 0, 0.04);
  border-radius: 4px;

  &.${slideOutIsActive} {
    right: 0;
  }
`

export const HelperWidgetHeadingContainer = styled.div`
  height: 3.75rem;
  display: flex;
  align-items: center;
  box-shadow: -4px -6px 32px rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid #f2f2f2;
  border-radius: 4px;

  h2 {
    margin: 0 1.25rem;
  }
`

export const HelperWidgetContentContainer = styled.div`
  padding: 1.25rem;

  svg {
    width: auto;
    margin: 1.25rem auto;
    display: block;
    height: 10rem;
  }
`

export const HelperWidgetLink = styled.a`
  font-size: 14px;
  background-color: var(--color-grey-light);
  color: var(--intent-primary);
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
`
