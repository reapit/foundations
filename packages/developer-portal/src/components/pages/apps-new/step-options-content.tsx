import { cx } from '@linaria/core'
import { elFadeIn, elWFull, FlexContainer } from '@reapit/elements'
import React, { FC } from 'react'
import { AppNewStepId } from './config'
import { useAppWizard } from './use-app-wizard'
import { UserOptionsContent } from './user-options-content'

export const StepOptionsContent: FC = () => {
  const { appWizardState } = useAppWizard()
  const { currentStep } = appWizardState

  return (
    <FlexContainer className={cx(elWFull, elFadeIn)} isFlexColumn>
      {currentStep === AppNewStepId.whatUserStep && <UserOptionsContent />}
    </FlexContainer>
  )
}
