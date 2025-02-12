import { styled } from '@linaria/react'

export const DnsContainerElement = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 0.25rem;
  border: var(--color-blue-100) 1px solid;
  background: var(--color-grey-lightest);
  margin-bottom: 1.25rem;
`
export const DnsContainerRow = styled.div`
  display: flex;

  &:not(:last-child) {
    border-bottom: var(--color-blue-100) 1px solid;
  }
`

export const DnsInputElement = styled.div`
  flex-grow: 1;
  padding: 0.5rem 1rem;
`

export const DnsValue = styled.p`
  font-weight: bold;
`
