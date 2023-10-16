import { styled } from '@linaria/react'
import { isTablet } from '../../../styles/media'

export const ElKeyValueIconWrap = styled.div`
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 1rem;

  svg,
  img {
    max-width: 1.25rem;
  }
`

export const ElKeyValueListWrap = styled.div`
  display: flex;
  margin-bottom: 1rem;

  ${isTablet} {
    margin-bottom: 1.25rem;
  }
`
