import { styled } from '@linaria/react'

export const ProgressBar = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  background-color: var(--intent-primary);
  color: var(--color-white);
  transition: 0.5s linear width;
  font-weight: bold;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
`

export const ProgressMessageText = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 0.4s;
  animation-name: fade-in;
  color: var(--color-grey-dark);

  span {
    margin-left: 0.5rem;
  }
`
