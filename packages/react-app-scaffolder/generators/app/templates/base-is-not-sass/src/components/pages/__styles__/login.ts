import styled from 'styled-components'

export const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
  }
`

export const Wrapper = styled.div<{ disabled?: boolean }>`
  background-color: #fff;
  width: 33.33%;
  padding: 1rem;
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};

  h1,
  p {
    text-align: center;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    padding: 0 3rem;
  }
`

export const ImageContainer = styled.div`
  background-color: #fff;
  width: 66.66%;
  height: 100vh;
  font-size: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    height: 300px;
  }
`
