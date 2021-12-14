import { render } from '@testing-library/react'
import React from 'react'
import { StepOptionsContent } from '../step-options-content'
import { AppNewStepId } from '../config'
import { useAppWizard } from '../use-app-wizard'

const mockUseAppWizard = useAppWizard as jest.Mock

jest.mock('../use-app-wizard', () => ({
  setAppWizardState: jest.fn(),
  useAppWizard: jest.fn(() => ({
    appWizardState: {
      currentStep: 'agencyCloudStep',
    },
  })),
}))

const steps = [
  AppNewStepId.whatUserStep,
  AppNewStepId.existingCustomerStep,
  AppNewStepId.thirdPartyDevStep,
  AppNewStepId.webServicesStep,
  AppNewStepId.reapitConnectStep,
  AppNewStepId.otherAppStep,
  AppNewStepId.agencyCloudStep,
  AppNewStepId.agencyCloudReplacementStep,
  AppNewStepId.dataFeedStep,
  AppNewStepId.reportingStep,
  AppNewStepId.serverSideStep,
  AppNewStepId.clientSideStep,
  AppNewStepId.websiteFeedStep,
  AppNewStepId.permissionsStep,
]

describe('StepOptionsContent', () => {
  steps.forEach((step) => {
    it('should match a snapshot', () => {
      mockUseAppWizard.mockReturnValue({
        appWizardState: {
          currentStep: step,
        },
      })
      expect(render(<StepOptionsContent />)).toMatchSnapshot()
    })
  })
})
