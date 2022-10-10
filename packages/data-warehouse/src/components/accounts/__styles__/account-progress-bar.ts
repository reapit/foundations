import { styled } from '@linaria/react'

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
