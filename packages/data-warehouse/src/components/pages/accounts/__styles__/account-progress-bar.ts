import { styled } from 'linaria/react'
import { grey, reapitDarkblueDarkened, reapitLightestblue } from '../../../../styles/colors'

export const ProgressBar = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  background-color: ${reapitDarkblueDarkened};
  color: ${reapitLightestblue};
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
  text-align: center;
  font-weight: bold;
  color: ${grey};

  span {
    margin-left: 0.5rem;
  }
`
