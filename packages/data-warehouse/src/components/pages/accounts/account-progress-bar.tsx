import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { styled } from 'linaria/react'
import { grey, reapitDarkblueDarkened, reapitLightestblue } from '../../../styles/colors'
import { Section } from '@reapit/elements'

export interface AccountProgressBarProps {
  percentageComplete: number
  setPercentageComplete: Dispatch<SetStateAction<number>>
}

const ProgressBar = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  background-color: ${reapitDarkblueDarkened};
  color: ${reapitLightestblue};
  transition: 0.5s linear width;
  font-weight: bold;
  padding: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
`

const ProgressMessageText = styled.div`
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

const ProgressMessage: React.FC<{ percentageComplete: number }> = ({ percentageComplete }) => {
  if (percentageComplete < 20) return <ProgressMessageText key={1}>Initializing...</ProgressMessageText>
  if (percentageComplete < 40) return <ProgressMessageText key={2}>Creating account...</ProgressMessageText>
  if (percentageComplete < 60) return <ProgressMessageText key={3}>Provisioning compute...</ProgressMessageText>
  if (percentageComplete < 80) return <ProgressMessageText key={4}>Preparing permissions...</ProgressMessageText>
  if (percentageComplete < 95) return <ProgressMessageText key={5}>Setting up defaults...</ProgressMessageText>
  if (percentageComplete < 100) return <ProgressMessageText key={6}>Nearly there, final checks...</ProgressMessageText>
  return (
    <ProgressMessageText key={7}>
      Your data is ready! <span role="img">🚀</span>
    </ProgressMessageText>
  )
}

const AccountProgressBar: React.FC<AccountProgressBarProps> = ({ percentageComplete, setPercentageComplete }) => {
  useEffect(() => {
    const interval = window.setInterval(() => {
      setPercentageComplete(prev => {
        if (prev < 95) {
          return prev + 0.5
        }

        return prev
      })
    }, 300)

    return () => window.clearInterval(interval)
  }, [percentageComplete])

  return (
    <Section>
      <ProgressBar width={percentageComplete}>{percentageComplete.toFixed(0)}%</ProgressBar>
      <ProgressMessage percentageComplete={percentageComplete} />
    </Section>
  )
}

export default AccountProgressBar
