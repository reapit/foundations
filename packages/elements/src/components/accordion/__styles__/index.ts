import { styled } from '@linaria/react'
import { elIsActive } from '../../../styles/states'

export const ElAccordionContainer = styled.div`
  background-color: var(--color-white);
  height: auto;
  display: flex;
  flex-direction: column;
`

export const ElAccordionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0.875rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:has(+ .${elIsActive}) {
    border-bottom: none;
  }
`
export const ElAccordionTitle = styled.div`
  color: var(--color-black);
  font-size: var(--font-size-small);
`

export const ElAccordionTitleContentWrapper = styled.div`
  display: flex;
`

export const ElAccordionTitleContent = styled.div`
  font-size: var(--font-size-smallest);
  display: flex;
  align-items: center;
  margin-right: 0.5rem;

  svg {
    font-size: 1rem;
    color: var(--color-grey-300);
  }

  &:last-child {
    margin: 0 0.75rem;
  }
`

export const ElAccordionContent = styled.div`
  height: 0;
  overflow: hidden;
  font-size: var(--font-size-small);

  &.${elIsActive} {
    height: auto;
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--color-grey-100);
  }
`
