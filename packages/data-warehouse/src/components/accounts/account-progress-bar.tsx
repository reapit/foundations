import { elMb11, elMb7, ProgressBarSteps } from '@reapit/elements'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { ProgressMessageText } from './__styles__/account-progress-bar'

export interface AccountProgressBarProps {
  percentageComplete: number
  setPercentageComplete: Dispatch<SetStateAction<number>>
}

const ProgressMessage: React.FC<{ percentageComplete: number }> = ({ percentageComplete }) => {
  if (percentageComplete < 20) return <ProgressMessageText key={1}>Initializing...</ProgressMessageText>
  if (percentageComplete < 40) return <ProgressMessageText key={2}>Creating account...</ProgressMessageText>
  if (percentageComplete < 60) return <ProgressMessageText key={3}>Provisioning compute...</ProgressMessageText>
  if (percentageComplete < 80) return <ProgressMessageText key={4}>Preparing permissions...</ProgressMessageText>
  if (percentageComplete < 95) return <ProgressMessageText key={5}>Setting up defaults...</ProgressMessageText>
  if (percentageComplete < 100)
    return (
      <ProgressMessageText key={6}>
        Nearly there, final checks... please note, on the first user account provision, this can take a few minutes...
      </ProgressMessageText>
    )
  return (
    <ProgressMessageText key={7}>
      Your account is ready! <span role="img">🚀</span>
    </ProgressMessageText>
  )
}

const AccountProgressBar: React.FC<AccountProgressBarProps> = ({ percentageComplete, setPercentageComplete }) => {
  useEffect(() => {
    const interval = window.setInterval(() => {
      setPercentageComplete((prev) => {
        if (prev < 95) {
          return prev + 0.5
        }

        return prev
      })
    }, 420)

    return () => window.clearInterval(interval)
  }, [percentageComplete])

  return (
    <div className={elMb11}>
      <ProgressBarSteps className={elMb7} currentStep={percentageComplete} showLabel={false} numberSteps={100} />
      <ProgressMessage percentageComplete={percentageComplete} />
    </div>
  )
}

export default AccountProgressBar
