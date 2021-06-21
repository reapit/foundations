import { styled } from 'linaria/react'

const navAppointmentListWidthDesktop = '28rem'
const mapPanelHeight = '5rem'

export const MapPanelContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100vw - ${navAppointmentListWidthDesktop});
  left: ${navAppointmentListWidthDesktop};
  display: flex;
  background-color: #fff;
  padding: 1rem;
  align-items: center;
  height: ${mapPanelHeight};

  @media screen and (max-width: 768px) {
    justify-content: space-between;
    left: 0;
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    width: calc(100vw - ${navAppointmentListWidthDesktop});
    left: 0;
  }
`

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

  @media screen and (min-width: 768px) {
    margin-right: 2rem;

    button {
      width: auto;
      height: 2.5rem;
      padding: 0.25rem 2rem;
    }
  }
`
