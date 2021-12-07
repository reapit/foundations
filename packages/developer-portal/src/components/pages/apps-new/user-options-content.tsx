import { cx } from '@linaria/core'
import { elMr8, elWFull, Icon } from '@reapit/elements'
import React, { FC } from 'react'
import { AppNewStepId } from './config'
import { useAppWizard } from './use-app-wizard'
import { StepOptionItem, stepOptionItemSelected } from './__styles__'

export const UserOptionsContent: FC = () => {
  const { appWizardState } = useAppWizard()
  const { nextStep } = appWizardState

  return (
    <>
      <StepOptionItem>
        <Icon
          className={cx(elMr8, nextStep === AppNewStepId.whatAppTypeStep && stepOptionItemSelected)}
          fontSize="2rem"
          icon="logoKeyInfographic"
        />
        <div className={elWFull}>Existing Reapit Customer</div>
        {nextStep === AppNewStepId.whatAppTypeStep && <Icon icon="tickSolidSystem" intent="primary" />}
      </StepOptionItem>
      <StepOptionItem>
        <Icon className={elMr8} fontSize="2rem" icon="htmlInfographic" />
        <div className={elWFull}>3rd Party Web Developer</div>
      </StepOptionItem>
      <StepOptionItem>
        <Icon className={elMr8} fontSize="2rem" icon="globeInfographic" />
        <div className={elWFull}>WebService to Foundations</div>
      </StepOptionItem>
      <StepOptionItem>
        <Icon className={elMr8} fontSize="2rem" icon="doorLockInfographic" />
        <div className={elWFull}>Reapit Connect as ID Provider</div>
      </StepOptionItem>
      <StepOptionItem>
        <Icon className={elMr8} fontSize="2rem" icon="userHouseInfographic" />
        <div className={elWFull}>Other</div>
      </StepOptionItem>
    </>
  )
}
