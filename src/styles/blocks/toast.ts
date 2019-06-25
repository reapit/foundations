import styled from 'styled-components'

export interface StyledToastProps {
  isVisible: boolean
}

export const StyledToast = styled.div<StyledToastProps>`
  width: 100%;
  padding: 0 1rem;
  position: fixed;
  z-index: 1;
  bottom: ${props => (props.isVisible ? '1rem' : '-2rem')};
  transition: bottom 0.2s ease-in-out;
`
