import { styled } from 'linaria/react'

export const MapPanelContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100vw - 416px);
  left: 416px;
  display: flex;
  background-color: #fff;
  padding: 1rem;

  @media screen and (max-width: 768px) {
    justify-content: space-between;
    left: 0;
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    width: calc(100vw - 464px);
    left: 0;
  }
`
