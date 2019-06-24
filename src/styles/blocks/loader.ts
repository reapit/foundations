import styled from 'styled-components'
import colors from '../variables/colors'
import layout from '../variables/layout'

export interface StyledLoaderProps {
  body: boolean
}

const StyledLoader = styled.div<StyledLoaderProps>`
  display: ${props => !props.body && 'inline-block'};
  margin: ${props => (props.body ? '100px auto' : 'auto')};
  width: ${layout.triple};
  height: ${layout.twoHalf};

  > div {
    background-color: ${colors.grey};
    height: 100%;
    width: ${layout.third};
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

export default StyledLoader
