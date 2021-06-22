import { styled } from 'linaria/react'
import { isDesktop } from '../../../../core/__styles__/media'

export const MapPanelItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0rem;

  &:last-child {
    margin-right: 0;
  }

  h2 {
    margin-bottom: 0.25rem;
  }

  button {
    width: 7rem;
    padding: 0.25rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    white-space: normal;
  }

  ${isDesktop} {
    margin-right: 2rem;

    button {
      width: auto;
      height: 2.5rem;
      padding: 0.25rem 2rem;
    }
  }
`
