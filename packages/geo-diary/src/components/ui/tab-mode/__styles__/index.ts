import { styled } from '@linaria/react'
import { isTablet } from '../../../../core/__styles__/media'

export const TabModeButtonContainer = styled.div`
  button {
    height: 2rem;
    width: 4.8rem;
    display: flex;
    padding: 0;
    align-items: center;
    background-image: none;
    background: var(--color-blue-dark2);
  }
  ${isTablet} {
    display: none;
  }
`
