import * as React from 'react'
import styled from 'styled-components'

export interface LoaderProps {
  body?: boolean
  dataTest?: string
}

const LoaderContainer = styled.div`
  display: block;
  margin: auto;

  display: flex;
  align-items: center;

  width: calc(1rem * 3);
  height: calc(1rem * 2.5);

  > div {
    background-color: ${props => props.theme.colors.loading};
    height: 100%;
    width: calc(1rem / 3);
    margin: 2px;
    display: inline-block;
    border-radius: 15%;

    animation: loader-animation 1.2s infinite ease-in-out;

    &:nth-of-type(1) {
      animation-delay: -1.1s;
    }

    &:nth-of-type(2) {
      animation-delay: -1s;
    }

    &:nth-of-type(3) {
      animation-delay: -0.9s;
    }

    &:nth-of-type(4) {
      animation-delay: -0.8s;
    }
  }

  @keyframes loader-animation {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
`

export const Loader: React.FunctionComponent<LoaderProps> = () => (
  <LoaderContainer>
    <div />
    <div />
    <div />
    <div />
  </LoaderContainer>
)

export default Loader
