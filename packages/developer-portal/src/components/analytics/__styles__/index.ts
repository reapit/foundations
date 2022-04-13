import { styled } from '@linaria/react'

export const ChartWrapper = styled.div`
  padding: 1rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 3.75rem;
  width: 100%;

  @media screen and (min-width: 1440px) {
    width: calc(50% - 0.625rem);

    &:first-child,
    &:nth-child(3) {
      margin-right: 1.25rem;
    }
  }
`
