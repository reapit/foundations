import React from 'react'
import { render } from '../../../tests/react-testing'
import { StepWizard } from '../step-wizard'
import { useStepWizardContext } from '../use-step-wizard'

describe('StepWizard', () => {
  it('Will match snapshot', () => {
    const Component = () => {
      const stepContext = useStepWizardContext()

      return (
        <StepWizard activeStep={stepContext.currentStep} gotToStep={stepContext.goToStep}>
          <div>First Element</div>
          <div>Second Element</div>
          <div>Third Element</div>
        </StepWizard>
      )
    }
    expect(render(<Component />)).toMatchSnapshot()
  })
})
