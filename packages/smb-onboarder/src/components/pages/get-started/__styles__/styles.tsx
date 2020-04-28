import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  @media (min-width: 769px) {
    width: unset;
  }
`

export const WrapperStep = styled.div`
  @media (min-width: 769px) {
    max-width: 500px;
  }
`
